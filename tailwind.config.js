/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        indigo: {
          50: '#f8faff',
          100: '#f0f4ff',
          200: '#e1e9ff',
          300: '#c2d1ff',
          400: '#9cb1ff',
          500: '#758eff',
          600: '#4f69df',
          700: '#3a4eb3',
          800: '#2a3882',
          900: '#1d275e',
          950: '#111738',
        },
        slate: {
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}