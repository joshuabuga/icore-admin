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
            let message = res.statusText || 'Failed to send message';
            try {
                const body = await res.json();
                const detail = body.errors?.detail || body.detail || body.message;
                if (detail) message = String(detail);
            } catch { /* ignore parse error, use statusText */ }
            throw new Error(message);
        }
    }
}

export const whatsapp = new WhatsApp();
