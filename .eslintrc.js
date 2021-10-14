module.exports = {
  root: true,

  env: {
    node: true,
  },

  plugins: ['prettier'],

  rules: {
    'no-alert': 'off',
    camelcase: 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'global-require': 0,
    'class-methods-use-this': 0,
    'import/order': ['error', { 'newlines-between': 'always' }],
    // typescript의 no-unused-var 쓰려면 기본 옵션을 비활성화 해야 함
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrors: 'none',
      },
    ],
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  extends: ['prettier', 'plugin:prettier/recommended', 'react-app', 'airbnb'],
};
