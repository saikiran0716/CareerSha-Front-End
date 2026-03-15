const rawApiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();

const normalizedApiBaseUrl = rawApiBaseUrl.replace(/\/+$/, '');

export const SERVER_ROOT = normalizedApiBaseUrl || '';

export const API_ROOT = SERVER_ROOT
  ? `${SERVER_ROOT}/api`
  : '/api';

export const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_ROOT}${normalizedPath}`;
};