const lint = require('mocha-eslint')

const paths = [
  'src/**/*.js',
  'test/**/*.js',
]

const options = {
  formatter: 'compact',
  alwaysWarn: false,
  timeout: 5000,
  slow: 1000,
  strict: true,
  contextName: 'eslint',
}

lint(paths, options)
