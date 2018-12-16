/**
 * Wallaby.js
 * Integrated Continuous Testing Tool for JavaScript Wallaby.js
 * It runs your JavaScript tests immediately as you type and displays execution
 * results in your code editor. It also provides beautiful test and code
 * coverage reports updated in realtime. It will make you write tests faster -
 * you just have to see it in action to believe it!
 * https://wallabyjs.com
 */

module.exports = (src = [], tests = []) => wallaby => ({
  name: 'Origin React',
  debug: true,
  env: {
    type: 'node',
    runner: 'node',
  },
  testFramework: 'jest',
  files: [
    './tslint.json',
    './tsconfig.settings.json',
    './jest.settings.js',
    './jest.config.js',
    './jest.setup.js',
    'tsconfig.json',
    'packages/validation/**',
    ...src,
    'scripts/**/*.{js,ts,tsx,json}',
    '!packages/**/*.spec.{js,jsx,ts,tsx}',
    '!scripts/**/*.spec.js',
    '!**/*.d.ts',
    '!**/*.{snap}',
    '!packages/**/coverage/**',
    '!packages/**/node_modules/**',
  ],
  compilers: {
    '*.js': wallaby.compilers.babel({
      babel: require('@babel/core'),
    }),
    'scripts/**/*.{js,jsx}': wallaby.compilers.babel({
      babel: require('@babel/core'),
    }),
    'packages/**/*.{js,jsx,ts,tsx}': wallaby.compilers.babel({
      babel: require('@babel/core'),
    }),
  },
  tests: [...tests, '!packages/**/node_modules/**'],
  setup: function(wallaby) {
    // We need this so wallaby and yarn workspaces play nicely together
    // https://github.com/wallabyjs/public/issues/1374#issuecomment-342021786
    let jestConfig = global._modifiedJestConfig;
    if (!jestConfig) {
      jestConfig = global._modifiedJestConfig = require('./jest.settings.js');
      const path = require('path');
      const globby = require('globby');
      jestConfig.moduleNameMapper = globby
        .sync(path.join(wallaby.projectCacheDir, 'packages/*/package.json'))
        .reduce((acc, v) => {
          const packageJsonPath = v;
          acc[`^${require(packageJsonPath).name}(.*)`] = `${path.dirname(
            packageJsonPath,
          )}$1`;
          return acc;
        }, {});
      jestConfig.setupTestFrameworkScriptFile = './jest.setup.js';
    }
    wallaby.testFramework.configure(jestConfig);
  },
});
