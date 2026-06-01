import { CreditRequest, DebitRequest, SMSRequest, BonusCreditRequest, BonusDebitRequest, BonusBulkCreditRequest, BonusBulkCreditResponse } from '@/types/crediting';
import { adminConsole } from './console';

class PaymentProcessor {
    private smsApiUrl: string;
    private smsConfig: { apikey: string; clientId: string; shortcode: string };

    constructor() {
        this.smsApiUrl = process.env.SMS_API_URL || '';
        this.smsConfig = {
            apikey: process.env.SMS_API_KEY || '',
            clientId: process.env.SMS_CLIENT_ID || '',
            shortcode: process.env.SMS_SHORTCODE || '',
        };
    }

    async creditUser(data: CreditRequest) {
        try {
            const { access, baseURL } = await adminConsole.getAuth();
            const creditUrl = `${baseURL}/api/v1/console/wallets/credit/`;

            const headers = {
                Authorization: `Bearer ${access}`,
                'Content-Type': 'application/json',
            };

            console.log('Credit API Request:', {
                url: creditUrl,
                data: data,
            });

            const response = await fetch(creditUrl, {
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
                    body: text.substring(0, 200),
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

    async debitUser(data: DebitRequest) {
        try {
            const { access, baseURL } = await adminConsole.getAuth();
            const debitUrl = `${baseURL}/api/v1/console/wallets/debit/`;

            const headers = {
                Authorization: `Bearer ${access}`,
                'Content-Type': 'application/json',
            };

            console.log('Debit API Request:', {
                url: debitUrl,
                data: data,
            });

            const response = await fetch(debitUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });

            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                console.error('Debit API returned non-JSON response:', {
                    status: response.status,
                    contentType,
                    body: text.substring(0, 200),
                });
                throw new Error(
                    `Debit API returned ${response.status}: Expected JSON but got ${contentType}`
                );
            }

            const result = await response.json();

            return { ok: response.ok, status: response.status, data: result };
        } catch (error) {
            console.error('Error debiting user:', JSON.stringify(error, null, 2));
            throw new Error(`Failed to debit user: ${error}`);
        }
    }

    async bonusCreditUser(data: BonusCreditRequest) {
        try {
            const { access, baseURL } = await adminConsole.getAuth();
            const url = `${baseURL}/api/v1/console/wallets/bonus-credit/`;
            const headers = {
                Authorization: `Bearer ${access}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Bonus credit API returned ${response.status}: Expected JSON but got ${contentType}. Body: ${text.substring(0, 200)}`);
            }
            const result = await response.json();
            return { data: result };
        } catch (error) {
            console.error('Error bonus-crediting user:', error);
            throw new Error(`Failed to bonus-credit user: ${error}`);
        }
    }

    async bonusDebitUser(data: BonusDebitRequest) {
        try {
            const { access, baseURL } = await adminConsole.getAuth();
            const url = `${baseURL}/api/v1/console/wallets/bonus-debit/`;
            const headers = {
                Authorization: `Bearer ${access}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Bonus debit API returned ${response.status}: Expected JSON but got ${contentType}. Body: ${text.substring(0, 200)}`);
            }
            const result = await response.json();
            return { ok: response.ok, status: response.status, data: result };
        } catch (error) {
            console.error('Error bonus-debiting user:', error);
            throw new Error(`Failed to bonus-debit user: ${error}`);
        }
    }

    async bonusBulkCredit(data: BonusBulkCreditRequest): Promise<{ ok: boolean; status: number; data: BonusBulkCreditResponse }> {
        try {
            const { access, baseURL } = await adminConsole.getAuth();
            const url = `${baseURL}/api/v1/console/wallets/bonus-bulk-credit/`;
            const headers = {
                Authorization: `Bearer ${access}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(url, {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                const text = await response.text();
                throw new Error(`Bonus bulk credit API returned ${response.status}: Expected JSON but got ${contentType}. Body: ${text.substring(0, 200)}`);
            }
            const result = await response.json();
            return { ok: response.ok, status: response.status, data: result };
        } catch (error) {
            console.error('Error bulk bonus-crediting users:', error);
            throw new Error(`Failed to bulk bonus-credit users: ${error}`);
        }
    }

    async sendSMS(data: SMSRequest) {
        // Message format matching the original Python script
        const message = `Congratulations ${data.name}! You have been awarded Ksh ${data.amount} from ${data.promo}. Cash iko kwa account.\nPlay and win BIG with Tucheze.com`;

        // Strip spaces, then normalize to 254 format
        const phoneNumber = data.phone.replace(/\s/g, '').replace(/^\+/, '').replace(/^0/, '254');

        const smsData = {
            "MessageParameters":[
                {
                    "Text":message,
                    "Number":phoneNumber,
                }
            ],
            "ApiKey": this.smsConfig.apikey,
            "SenderId": this.smsConfig.shortcode,
            "ClientId": this.smsConfig.clientId,
        };

        console.log('SMS API Request:', {
            url: this.smsApiUrl,
            mobile: data.phone,
            shortcode: this.smsConfig.shortcode,
        });

        try {
            const response = await fetch(this.smsApiUrl, {
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
                    body: errorBody.substring(0, 500),
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
        for (const [index, cust] of customer.entries()) {
            try {
                const creditResponse = await this.creditUser(cust);
                const smsResponse = await this.sendSMS(smsData[index]);

                console.log('Credit Response:', creditResponse);
                console.log('SMS Response:', smsResponse);
            } catch (error) {
                console.error('Error processing batch:', error);
            }
        }
    }
}

export const paymentProcessor = new PaymentProcessor();
