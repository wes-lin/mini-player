module.exports = {
  env: {
    browser: true,
    es2021: true,
    node:true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'vue/multi-word-component-names': 0,
    'vue/script-setup-uses-vars': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': 'error',
    'semi':[2,'never'],
    'quotes': [1, 'single'],
    'rest-spread-spacing': ['error','always'],
    'space-infix-ops':'error'
  },
}
