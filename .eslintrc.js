module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  globals: {
    __static: true
  },
  plugins: [
    'html'
  ],
  'rules': {
    'indent': [
      'error', 4,
  ],
  'comma-dangle': [
    'error', 'always',
  ],
'array-bracket-newline': [
  'error', {
      minItems: 1,
  },
],
'object-curly-newline': [
  'error', {
      minProperties: 1,
  },
],
'object-property-newline': [
  'error', {
      allowAllPropertiesOnSameLine: false,
  },
],

'semi': [
  'error', 'always',
],
  }
}
