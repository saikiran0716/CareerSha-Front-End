import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

/**
 * Dark mode is switched off until every page has dark styles.
 * Set to true to bring back the toggle (Header) and the saved preference.
 */
export const DARK_MODE_ENABLED = false;

const readStored = () => {
  if (!DARK_MODE_ENABLED) return false;
  try {
    return localStorage.getItem(STORAGE_KEY) === 'dark';
  } catch {
    return false;
  }
};

/** Persists light/dark preference and toggles the `dark` class on <html>. */
export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(readStored);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    try {
      localStorage.setItem(STORAGE_KEY, isDarkMode ? 'dark' : 'light');
    } catch {
      /* storage unavailable (private mode) — ignore */
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => setIsDarkMode((d) => !d), []);

  return { isDarkMode, toggleDarkMode };
};
