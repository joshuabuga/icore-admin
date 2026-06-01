import { getEnvConfig } from './env-config';

class WhatsApp {
    async sendMessage(msisdn: string, message: string): Promise<void> {
        const config = await getEnvConfig();

        const authRes = await fetch(`${config.baseURL}/api/v1/console/auth/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: config.username, password: config.password }),
        });

        if (!authRes.ok) {
            throw new Error(`WhatsApp auth failed: ${authRes.statusText}`);
        }

        const { data } = await authRes.json();
        const token: string = data.access;

        const res = await fetch(`${config.baseURL}/api/v1/console/communications/whatsapp/send/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ msisdn, message }),
        });

        if (!res.ok) {
            const body = await res.text().catch(() => res.statusText);
            throw new Error(`WhatsApp send failed (${res.status}): ${body.substring(0, 200)}`);
        }
    }
}

export const whatsapp = new WhatsApp();
