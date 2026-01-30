import { BatchProcessingConfig, CreditRequest, SMSRequest } from '@/types/crediting';

class PaymentProcessor {
    private config: BatchProcessingConfig;

    constructor(config: BatchProcessingConfig) {
        this.config = config;
    }

    async creditUser(data: CreditRequest) {
        try {
            const headers = {
                Authorization: `Bearer ${this.config.api_key}`,
                'Content-Type': 'application/json',
            };

            console.log('Credit API Request:', {
                url: this.config.api_url,
                data: data,
            });

            const response = await fetch(this.config.api_url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });

            // Check if response is JSON
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Credit API returned non-JSON response:', {
                    status: response.status,
                    contentType,
                    body: text.substring(0, 200), // First 200 chars
                });
                throw new Error(
                    `Credit API returned ${response.status}: Expected JSON but got ${contentType}`
                );
            }

            const result = await response.json();

            if (!response.ok && response.status !== 200) {
                console.error('Credit API error response:', {
                    status: response.status,
                    result: JSON.stringify(result),
                    apiCode: result?.status?.code,
                    apiDesc: result?.status?.desc,
                    errors: JSON.stringify(result?.errors),
                });
            }

            return result;
        } catch (error) {
            console.error('Error crediting user:', JSON.stringify(error, null, 2));
            throw new Error(`Failed to credit user: ${error}`);
        }
    }

    async sendSMS(data: SMSRequest) {
        // Message format matching the original Python script
        const message = `Congratulations ${data.name}! You have been awarded Ksh ${data.amount} from ${data.promo}. Cash iko kwa account.\nPlay and win BIG with Tucheze.com`;

        // Remove + prefix from phone number if present
        const phoneNumber = data.phone.replace(/^\+/, '');

        const smsData = {
            "MessageParameters":[
                {
                    "Text":message,
                    "Number":phoneNumber,
                }
            ],
            "ApiKey": this.config.sms_config.apikey,
            "SenderId": this.config.sms_config.shortcode,
            "ClientId": this.config.sms_config.clientId,
        };

        console.log('SMS API Request:', {
            url: this.config.sms_api_url,
            mobile: data.phone,
            shortcode: this.config.sms_config.shortcode,
        });

        try {
            const response = await fetch(this.config.sms_api_url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(smsData),
            });

            // Check if response is JSON
            const contentType = response.headers.get('content-type');

            if (response.ok) {
                if (contentType && contentType.includes('application/json')) {
                    const result = await response.json();
                    console.log('SMS API Success Response:', result);
                    return (
                        result.responses?.[0]?.['response-description'] ||
                        'SMS sent'
                    );
                } else {
                    const text = await response.text();
                    console.log('SMS API returned non-JSON success:', text);
                    return 'SMS sent';
                }
            } else {
                // Get error details
                let errorBody = '';
                if (contentType && contentType.includes('application/json')) {
                    const errorJson = await response.json();
                    errorBody = JSON.stringify(errorJson);
                } else {
                    errorBody = await response.text();
                }

                console.error('SMS API Error Response:', {
                    status: response.status,
                    statusText: response.statusText,
                    contentType,
                    body: errorBody.substring(0, 500), // First 500 chars
                });

                throw new Error(
                    `SMS API responded with status ${
                        response.status
                    }: ${errorBody.substring(0, 100)}`
                );
            }
        } catch (error) {
            console.error('Error sending SMS:', error);
            throw new Error(`Failed to send SMS: ${error}`);
        }
    }
    // Wire up batch processing
    async processBatchPayment(
        customer: CreditRequest[],
        smsData: SMSRequest[]
    ) {
        // Process each customer
        for (const [index, cust] of customer.entries()) {
            try {
                // Credit user
                const creditResponse = await this.creditUser(cust);

                // Send SMS
                const smsResponse = await this.sendSMS(smsData[index]);

                // Handle responses
                console.log('Credit Response:', creditResponse);
                console.log('SMS Response:', smsResponse);
            } catch (error) {
                console.error('Error processing batch:', error);
            }
        }
    }
}

export const paymentProcessor = new PaymentProcessor({
    api_key: process.env.PAYMENT_API_KEY || '',
    api_url: process.env.PAYMENT_API_URL || '',
    sms_api_url: process.env.SMS_API_URL || '',
    sms_config: {
        apikey: process.env.SMS_API_KEY || '',
        clientId: process.env.SMS_CLIENT_ID || '',
        shortcode: process.env.SMS_SHORTCODE || '',
    },
});
