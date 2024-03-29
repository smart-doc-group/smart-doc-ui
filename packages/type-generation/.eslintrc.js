module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ['google', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    camelcase: 0,
    'prettier/prettier': [
      'error',
      { semi: true, endOfLine: 'auto', singleQuote: true },
    ],
    'no-console': process.env.NODE_ENV === 'prod' ? 2 : 1,
    'no-unused-vars': process.env.NODE_ENV === 'prod' ? 2 : 1,
  },
  ignorePatterns: ['dist', 'build', 'lib'],
};
