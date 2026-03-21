import { create } from 'zustand';

export type Environment = 'production' | 'staging';

interface EnvironmentState {
  environment: Environment;
  setEnvironment: (env: Environment) => void;
}

function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2];
}

function setCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=${value};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
}

export const useEnvironmentStore = create<EnvironmentState>((set) => ({
  environment: (getCookie('tucheze-env') as Environment) || 'production',
  setEnvironment: (env: Environment) => {
    setCookie('tucheze-env', env);
    set({ environment: env });
  },
}));