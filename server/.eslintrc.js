module.exports = {
  "extends": [
      "eslint-config-egg",
  ],
  rules: {
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
      'no-debugger': 'error',
      'semi': [
          'error', 'always',
      ],
      'standard/no-callback-literal': 'off',
      'camelcase': 'off',
  }
}

