const rawApiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();

const normalizedApiBaseUrl = rawApiBaseUrl.replace(/\/+$/, '');

export const API_ROOT = normalizedApiBaseUrl
  ? `${normalizedApiBaseUrl}/api`
  : '/api';

export const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_ROOT}${normalizedPath}`;
};