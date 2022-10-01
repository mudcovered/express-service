module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['prettier', 'security', 'import', 'deprecation'],
  extends: [
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',
    'plugin:security/recommended',
    'eslint:recommended',
  ],
  globals: {
    Promise: true,
    Map: true,
  },
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    project: 'tsconfig.json',
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    '@typescript-eslint/no-var-requires': 'on',
    '@typescript-eslint/type-annotation-spacing': 'off',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    // This mimics tslint/member-ordering (statics-first)
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
      { ignoreVoid: false },
    ],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'all', argsIgnorePattern: '^_' },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'error',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true },
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
      'error', // eslint error
      // keyword blacklist!
      'any',
      'Number',
      'number',
      'String',
      'string',
      'Boolean',
      'boolean',
      'Undefined',
      // 'undefined' false positive on let x = undefined
    ],
    'no-redeclare': 'off',
    semi: 2,
    eqeqeq: 'error',
    'no-shadow': 'error',
    'one-var': ['error', 'never'],
    'prettier/prettier': 'error',
    'deprecation/deprecation': 'warn',
    // Useless as it false positives on array assignment!
    'security/detect-object-injection': 'off',
    'import/order': [
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
  overrides: [{ files: ['src/*.ts'] }],
};
