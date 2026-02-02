class SMS {
  private smsBaseUrl;
  constructor() {
      this.smsBaseUrl = process.env.NEXT_PUBLIC_SMS_API_URL!;
  }

  private normalizePhoneNumber(phone: string): string {
    // Remove any non-digit characters
    const cleanPhone = phone.replace(/\D/g, '');

    // Handle different formats
    if (cleanPhone.startsWith('254')) {
      // Already in correct format
      return cleanPhone;
    } else if (cleanPhone.startsWith('0')) {
      // Remove leading 0 and add 254
      return '254' + cleanPhone.substring(1);
    } else if (cleanPhone.length === 9) {
      // Just the 9 digits, add 254
      return '254' + cleanPhone;
    } else {
      // Return as is if we can't determine the format
      return cleanPhone;
    }
  }

  async sendSMS(phone:string, message:string) {
      // Normalize phone number to 254xxxxxxxxx format
      const phoneNumber = this.normalizePhoneNumber(phone);
      const smsData = {
          "MessageParameters":[
              {
                  "Text":message,
                  "Number":phoneNumber,
              }
          ],
          "ApiKey": process.env.NEXT_PUBLIC_SMS_API_KEY!,
          "SenderId": process.env.NEXT_PUBLIC_SMS_SHORTCODE!,
          "ClientId": process.env.NEXT_PUBLIC_SMS_CLIENT_ID!,
      };

      console.log('SMS API Request:', {
          url: this.smsBaseUrl,
          original: phone,
          normalized: phoneNumber,
          shortcode: process.env.NEXT_PUBLIC_SMS_SHORTCODE!,
      });

      try {
          const response = await fetch(this.smsBaseUrl!, {
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
                  console.log('SMS API returned non-JSON success:',text.substring(0,10));
                  return 'SMS sent';
              }
          } else {
              // Get error details
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
        const normalizedPhone = this.normalizePhoneNumber(phone);
        const smsData = {
          "MessageParameters": [{ "Text": message, "Number": normalizedPhone }],
          "ApiKey": process.env.SMS_API_KEY!,
          "SenderId": process.env.SMS_SHORTCODE!,
          "ClientId": process.env.SMS_CLIENT_ID!,
        };

        const response = await fetch(this.smsBaseUrl!, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(smsData),
        });

        return { phone, status: response.status };
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

export const sms = new SMS();