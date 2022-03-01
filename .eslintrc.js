/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
    'plugin:storybook/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'vue/require-default-prop': 'off',
    'prettier/prettier': [
      'off',
      {
        singleQuote: true,
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-console': 'warn',
    'no-debugger': 'warn',
    // 'import/no-extraneous-dependencies': [
    //   'error',
    //   {
    //     devDependencies: true,
    //   },
    // ],
    indent: ['warn', 2],
    'interface-name': 0,
    'ordered-imports': 0,
    'object-literal-sort-keys': 0,
    'no-empty-interface': 0,
    'func-style': 0,
    'no-process-env': 0,
    'no-warning-comments': 0,
    'no-negated-condition': 0,
    'consistent-return': 0,
    'match-default-export-name': 0,
    'jsx-use-translation-function': 0,
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: false,
        allowBlockStart: false,
      },
    ],
    'import/no-webpack-loader-syntax': 0,
    'babel/no-unused-expressions': 0,
    'import/named': 0,
    'import/export': 0,
    'import/no-default-export': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/array-type': [
      'error',
      {
        defaultOption: 'array',
      },
    ],
  },
};
