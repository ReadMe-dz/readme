module.exports = {
  env: {
    commonjs: true,
    jest: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'off',
  },
};
