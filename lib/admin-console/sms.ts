interface SmsConfig {
    apiUrl: string;
    apiKey: string;
    senderId: string;
    clientId: string;
}

class SMS {
    private config: SmsConfig;

    constructor(config: SmsConfig) {
        this.config = config;
    }

    private normalizePhoneNumber(phone: string): string {
        const cleanPhone = phone.replace(/\D/g, '');

        if (cleanPhone.startsWith('254')) {
            return cleanPhone;
        } else if (cleanPhone.startsWith('0')) {
            return '254' + cleanPhone.substring(1);
        } else if (cleanPhone.length === 9) {
            return '254' + cleanPhone;
        } else {
            return cleanPhone;
        }
    }

    async sendSMS(phone: string, message: string) {
        const phoneNumber = this.normalizePhoneNumber(phone);
        const smsData = {
            MessageParameters: [
                {
                    Text: message,
                    Number: phoneNumber,
                },
            ],
            ApiKey: this.config.apiKey,
            SenderId: this.config.senderId,
            ClientId: this.config.clientId,
        };

        console.log('SMS API Request:', {
            url: this.config.apiUrl,
            original: phone,
            normalized: phoneNumber,
            shortcode: this.config.senderId,
        });

        try {
            const response = await fetch(this.config.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(smsData),
            });

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
                    console.log('SMS API returned non-JSON success:', text.substring(0, 10));
                    return 'SMS sent';
                }
            } else {
                let errorBody;
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
                    `SMS API responded with status ${response.status}: ${errorBody.substring(0, 100)}`
                );
            }
        } catch (error) {
            console.error('Error sending SMS:', error);
            throw new Error(`Failed to send SMS: ${error}`);
        }
    }

    async sendBulkSMS(
        phoneNumbers: string[],
        message: string,
        options: { concurrency?: number; delayMs?: number } = {}
    ): Promise<{ successful: string[]; failed: Array<{ phone: string; error: string }> }> {
        const { concurrency = 5, delayMs = 100 } = options;
        const successful: string[] = [];
        const failed: Array<{ phone: string; error: string }> = [];

        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        const sendOne = async (phone: string): Promise<{ phone: string; status: number; error?: string }> => {
            try {
                await this.sendSMS(phone, message);
                return { phone, status: 200 };
            } catch (error) {
                return { phone, status: 500, error: String(error) };
            }
        };

        for (let i = 0; i < phoneNumbers.length; i += concurrency) {
            const batch = phoneNumbers.slice(i, i + concurrency);

            const results = await Promise.all(batch.map(phone => sendOne(phone)));

            results.forEach(result => {
                if (result.status === 200) {
                    successful.push(result.phone);
                } else {
                    failed.push({
                        phone: result.phone,
                        error: result.error || `Status ${result.status}`,
                    });
                }
            });

            if (i + concurrency < phoneNumbers.length) {
                await delay(delayMs);
            }
        }

        console.log(`Bulk SMS completed: ${successful.length} successful, ${failed.length} failed`);
        return { successful, failed };
    }
}

export const sms = new SMS({
    apiUrl: process.env.SMS_API_URL || '',
    apiKey: process.env.SMS_API_KEY || '',
    senderId: process.env.SMS_SHORTCODE || '',
    clientId: process.env.SMS_CLIENT_ID || '',
});