const rawApiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();

const normalizedApiBaseUrl = rawApiBaseUrl.replace(/\/+$/, '');

export const SERVER_ROOT = normalizedApiBaseUrl || '';
export const isLocalhost = SERVER_ROOT.includes('localhost') || SERVER_ROOT.includes('127.0.0.1');

if (import.meta.env.PROD && isLocalhost) {
  console.warn(
    "%c[CareerSha] PRODUCTION WARNING: App is connecting to LOCALHOST in production. Auth will fail.",
    "color: white; background: red; font-weight: bold; padding: 4px; border-radius: 4px;"
  );
}

export const API_ROOT = SERVER_ROOT
  ? `${SERVER_ROOT}/api`
  : '/api';

export const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_ROOT}${normalizedPath}`;
};