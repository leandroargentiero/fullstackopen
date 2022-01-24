module.exports = {
  env: {
    'jest/globals': true,
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'jest'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
  },
};
