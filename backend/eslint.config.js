import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig({
  files: ['**/*.js'],
  languageOptions: {
    sourceType: 'module',
    globals: {
      ...globals.node,
      ...globals.commonjs,
    },
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
});
