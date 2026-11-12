/** @type {import('tailwindcss').Config} */

// All colors come from CSS variables defined in src/styles/theme.css.
// To change a color site-wide, edit that file — not this one.
const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const scale = (name) =>
  Object.fromEntries(
    SHADES.map((s) => [s, `rgb(var(--color-${name}-${s}) / <alpha-value>)`])
  );

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        primary: scale('primary'),
        secondary: scale('secondary'),
        accent: scale('accent'),
        neutral: scale('neutral'),
        success: scale('success'),
        warning: scale('warning'),
        danger: scale('danger'),
        highlight: 'rgb(var(--color-highlight) / <alpha-value>)',
        page: {
          bg: 'rgb(var(--color-page-bg) / <alpha-value>)',
          text: 'rgb(var(--color-page-text) / <alpha-value>)',
        },
      },
      screens: {
        xs: '375px',
        ms: '475px',
        fhd: '1440px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
