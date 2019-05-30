module.exports = {
    'env': {
      'browser': true,
      'commonjs': true,
      'es6': true,
    },
    'extends': 'google',
    'globals': {
      'Atomics': 'readonly',
      'SharedArrayBuffer': 'readonly',
    },
    'parserOptions': {
      'ecmaVersion': 2018,
    },
    'rules': {
      'indent': ['error', 2],
      'require-jsdoc': 0,
      'max-len': ['error', {code: 120}],
      'quotes': [2, 'single', 'avoid-escape'],
    },
  };