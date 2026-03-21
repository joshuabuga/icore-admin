import { cookies } from 'next/headers';
import type { Environment } from '@/lib/stores/environment-store';

export interface EnvConfig {
  baseURL: string;
  username: string;
  password: string;
}

export async function getEnvironment(): Promise<Environment> {
  const cookieStore = await cookies();
  return (cookieStore.get('tucheze-env')?.value as Environment) || 'production';
}

export async function getEnvConfig(): Promise<EnvConfig> {
  const env = await getEnvironment();

  if (env === 'staging') {
    return {
      baseURL: process.env.TUCHEZE_STG_ADMIN_API || '',
      username: process.env.TUCHEZE_STG_ADMIN_USERNAME || '',
      password: process.env.TUCHEZE_STG_ADMIN_PASSWORD || '',
    };
  }

  return {
    baseURL: process.env.TUCHEZE_ADMIN_API || '',
    username: process.env.TUCHEZE_ADMIN_USERNAME || '',
    password: process.env.TUCHEZE_ADMIN_PASSWORD || '',
  };
}
