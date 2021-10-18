module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  rules: {
    'no-alert': 'off',
    camelcase: 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'global-require': 0,
    'import/no-unresolved': 0,
    'class-methods-use-this': 0,
    'import/order': ['error', { 'newlines-between': 'always' }],
    'react/jsx-filename-extension': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'import/extensions': 0,
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'max-len': ['error', { code: 80 }],
    'arrow-body-style': [
      'error',
      'as-needed',
      { requireReturnForObjectLiteral: true },
    ],
    'implicit-arrow-linebreak': 'off',
    'comma-dangle': [
      'error',
      {
        functions: 'never',
        arrays: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
  },
};
