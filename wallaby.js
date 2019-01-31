/**
 * Wallaby.js
 * Integrated Continuous Testing Tool for JavaScript Wallaby.js
 * It runs your JavaScript tests immediately as you type and displays execution
 * results in your code editor. It also provides beautiful test and code
 * coverage reports updated in realtime. It will make you write tests faster -
 * you just have to see it in action to believe it!
 * https://wallabyjs.com
 */

module.exports = wallaby => ({
  name: 'Origin React',
  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'jest',
  files: [
    './jest.settings.js',
    './jest.config.js',
    './jest.setup.js',
    'tsconfig.json',
    'packages/*/src/**',
    '!packages/**/*.spec.{ts,tsx}',
    '!**/*.d.ts',
    '!**/*.{snap}',
    '!packages/**/coverage/**',
    '!packages/**/node_modules/**',
  ],
  compilers: {
    '*.js': wallaby.compilers.babel({
      babel: require('@babel/core'),
    }),
    'packages/**/*.{ts,tsx}': wallaby.compilers.babel({
      babel: require('@babel/core'),
    }),
  },
  tests: ['packages/*/src/**/*.spec.{ts,tsx}'],
  setup: function(wallaby) {
    let jestConfig = global._modifiedJestConfig
    if (!jestConfig) {
      jestConfig = global._modifiedJestConfig = require('./jest.config.js')
      jestConfig.moduleNameMapper = {
        '^@form-foundations/([a-zA-Z0-9_-]+)$':
          process.cwd() + '/packages/$1/src/index.js',
      }
      jestConfig.setupTestFrameworkScriptFile = './jest.setup.js'
    }
    wallaby.testFramework.configure(jestConfig)
  },
})
