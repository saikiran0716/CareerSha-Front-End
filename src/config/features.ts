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
