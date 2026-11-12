/**
 * Feature switches.
 *
 * ACCOUNT_REQUIRES_SIGN_IN
 *   false (now): account features (profile, reports, predictions, saved colleges) work
 *         without signing in; data is kept in this browser as "Guest".
 *   true:  those pages ask the visitor to sign in first, and the header menu only
 *         appears for signed-in users. Anything saved as Guest moves into the account
 *         when the user signs in.
 */
export const ACCOUNT_REQUIRES_SIGN_IN = false;

/**
 * SHOW_SAMPLE_DATA_NOTICE
 *   true (now): college detail, compare, exam cutoff/result and review/Q&A sections use SAMPLE
 *   data (src/data/catalog). A notice tells visitors the numbers are illustrative.
 *   Set to false once the catalog is served from the backend with real data.
 */
export const SHOW_SAMPLE_DATA_NOTICE = true;
