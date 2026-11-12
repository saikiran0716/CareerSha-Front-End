import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'theme';

const readStored = () => {
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
