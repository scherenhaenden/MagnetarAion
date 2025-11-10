// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['karma.conf.js', 'playwright.config.ts'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'no-public',
          },
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: 'function',
          format: ['camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
    },
  },
);
