import '@testing-library/jest-dom/vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Each test starts with an empty page and empty browser storage.
afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
});
