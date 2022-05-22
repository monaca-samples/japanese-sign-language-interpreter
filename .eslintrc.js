module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'vue/multi-word-component-names': 'off',
    'no-plusplus': 'off',
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    'no-alert': 'off',
  },
};
