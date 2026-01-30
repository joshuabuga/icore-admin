



export default class SMS {
  private smsBaseUrl;
  constructor() {
      this.smsBaseUrl = process.env.SMS_BASE_URL;
  }

  async sendSMS(phone:string, message:string) {
      const smsData = {
          "MessageParameters":[
              {
                  "Text":message,
                  "Number":phone,
              }
          ],
          "ApiKey": process.env.SMS_API_KEY,
          "SenderId": process.env.SMS_SENDER_ID,
          "ClientId": process.env.SMS_CLIENT_ID,
      };

      console.log('SMS API Request:', {
          url: this.smsBaseUrl,
          mobile: phone,
          shortcode: process.env.SMS_SENDER_ID,
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
        const smsData = {
          "MessageParameters": [{ "Text": message, "Number": phone }],
          "ApiKey": process.env.SMS_API_KEY,
          "SenderId": process.env.SMS_SENDER_ID,
          "ClientId": process.env.SMS_CLIENT_ID,
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