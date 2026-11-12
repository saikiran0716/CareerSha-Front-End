import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // Real bugs → errors
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Unused code must be removed; allow `_name` for intentionally unused args
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      // Use real types; justify any exception with an eslint-disable comment
      '@typescript-eslint/no-explicit-any': 'error',

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    // Fast refresh is irrelevant for tests and test helpers
    files: ['src/test/**', '**/*.test.{ts,tsx}'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    // Node-side config files
    files: ['*.config.{js,ts}'],
    languageOptions: { globals: globals.node },
  },
  // Must be last: turns off rules that conflict with Prettier formatting
  prettier,
);
