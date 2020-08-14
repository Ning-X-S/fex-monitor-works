const { strictEslint } = require('@umijs/fabric');

module.exports = {
  env: {
    browser: true,
    es2020: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'standard', 'eslint-config-umi'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    parserOptions: {
      ecmaVersion: 2017,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {},
  ...strictEslint,
};
