/**
 * Helpers for using the global theme (src/styles/theme.css) from JavaScript —
 * e.g. chart libraries or inline styles that can't use Tailwind classes.
 *
 *   themeVar('primary-600')     -> "rgb(var(--color-primary-600))"   (for style={{}})
 *   themeColor('primary-600')   -> "rgb(48 66 141)"                  (resolved value, for SVG/canvas)
 */
export type ThemeToken =
  | `${
      | 'primary'
      | 'secondary'
      | 'accent'
      | 'neutral'
      | 'success'
      | 'warning'
      | 'danger'}-${50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950}`
  | 'highlight';

export const themeVar = (token: ThemeToken, alpha?: number) =>
  alpha === undefined ? `rgb(var(--color-${token}))` : `rgb(var(--color-${token}) / ${alpha})`;

export const themeColor = (token: ThemeToken): string => {
  if (typeof window === 'undefined') return themeVar(token);
  const channels = getComputedStyle(document.documentElement).getPropertyValue(`--color-${token}`).trim();
  return channels ? `rgb(${channels})` : themeVar(token);
};

/** Ordered palette for charts (pie slices, series, etc.). */
export const CHART_TOKENS: ThemeToken[] = ['secondary-500', 'accent-500', 'danger-400', 'warning-500', 'success-500'];
