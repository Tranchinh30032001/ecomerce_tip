module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react',
    'react-hooks'
  ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 0,
    'react/prop-types': 0,
    'react/display-name': 0,

    'no-console': 0,
    'no-unused-vars': 1,
    'no-constant-condition':0,
    'no-trailing-spaces': 0,
    'no-irregular-whitespace':0,
    'no-multi-spaces': 1,
    'no-multiple-empty-lines': 1,
    'space-before-blocks': ['warn', 'always'],
    'object-curly-spacing': [1, 'always'],
    'indent': ['warn', 2],
    'semi': [1, 'always'],
    'quotes': ['warn', 'single'],
    'array-bracket-spacing': 1,
    'linebreak-style': 0,
    'no-unexpected-multiline': 'warn',
    'keyword-spacing': 1,
    'comma-dangle': 1,
    'comma-spacing': 1,
    'arrow-spacing': 1,
    'no-useless-escape': 0
  }
};
