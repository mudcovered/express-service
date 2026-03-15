import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-plugin-prettier';
import security from 'eslint-plugin-security';
import importX from 'eslint-plugin-import-x';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsEslint from '@typescript-eslint/eslint-plugin';
import js from '@eslint/js';

export default defineConfig([
  globalIgnores([
    'dist/**',
    'coverage/**',
    'eslint.config.mjs',
    '.prettierrc.js',
  ]),
  {
    extends: [
      '@typescript-eslint/recommended',
      '@typescript-eslint/strict',
      security.configs.recommended,
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript,
      js.configs.recommended,
    ],
    plugins: {
      '@typescript-eslint': tsEslint,
      prettier,
      security,
      'import-x': importX,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        Promise: true,
        Map: true,
      },

      parser: tsParser,
      ecmaVersion: 2018,
      sourceType: 'module',

      parserOptions: {
        project: 'tsconfig.json',
      },
    },

    settings: {
      'import-x/resolver': {
        typescript: true,
        node: true,
      },
    },

    rules: {
      '@typescript-eslint/no-var-requires': 'error',
      '@typescript-eslint/type-annotation-spacing': 'off',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'error',

      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: [
            'signature',
            'static-field',
            'static-method',
            'instance-field',
            'field',
            'constructor',
            'instance-method',
          ],
        },
      ],

      '@typescript-eslint/no-floating-promises': [
        'error',
        {
          ignoreVoid: false,
        },
      ],

      camelcase: 'error',
      '@typescript-eslint/no-explicit-any': 'off',

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'all',
          argsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      'no-unused-vars': 'off',

      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          functions: false,
          classes: true,
          variables: true,
        },
      ],

      '@typescript-eslint/return-await': 'error',
      'no-return-await': 'error',

      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],

      'max-classes-per-file': ['error', 1],
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      'prefer-object-spread': 'error',
      'prefer-template': 'error',
      'consistent-return': 'error',

      'id-denylist': [
        'error',
        'any',
        'Number',
        'number',
        'String',
        'string',
        'Boolean',
        'boolean',
        'Undefined',
        // undefined triggers false positive
      ],

      'no-redeclare': 'error',
      'no-console': 'off',
      semi: 2,
      eqeqeq: 'error',
      'no-shadow': 'error',
      'one-var': ['error', 'never'],
      'prettier/prettier': 'error',
      '@typescript-eslint/no-deprecated': 'warn',
      // Generates lots of false positives
      'security/detect-object-injection': 'off',
      'import-x/no-named-as-default-member': 'off',
      'import-x/no-cycle': 'error',
      'import-x/no-extraneous-dependencies': 'error',

      'import-x/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'parent', 'sibling', 'index'],

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    files: ['src/*.ts'],
  },
]);
