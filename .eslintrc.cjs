/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'vue/require-default-prop': 'off',
    "vue/multi-word-component-names": 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    curly: ['error', 'all'],
    indent: ['error', 2, { ignoreComments: true }],
    'prefer-arrow-callback': 'error',
    'lines-between-class-members': 'off',
    'array-bracket-spacing': ['error', 'never'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/camelcase': 'off',
    'id-match': ['error', '^[A-Za-z0-9-_$]+$', { properties: true }], // To prevent cyrillic letters etc.
    'vue/html-closing-bracket-spacing': 'error',
    'vue/no-multiple-template-root': 'off',
    'no-void': 'off',
    'import/named': 0,
    'import/export': 0,
    'import/no-default-export': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-shadow': ['error'],
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: false,
        allowBlockStart: false,
      },
    ],
  },
};
