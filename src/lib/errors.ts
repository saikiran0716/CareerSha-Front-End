/** Message from an unknown thrown value (Error, `{ message }` object, or string). */
export const getErrorMessage = (err: unknown, fallback = 'Something went wrong. Please try again.'): string => {
  if (err instanceof Error && err.message) return err.message;
  if (typeof err === 'object' && err && 'message' in err && typeof err.message === 'string') return err.message;
  if (typeof err === 'string' && err) return err;
  return fallback;
};

/** `code` from errors thrown by authService (`{ code, message }`). */
export const getErrorCode = (err: unknown): string =>
  typeof err === 'object' && err && 'code' in err && typeof err.code === 'string' ? err.code : '';
