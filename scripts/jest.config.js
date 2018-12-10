const base = require('../jest.settings.js');

module.exports = {
  ...base,
  roots: ['<rootDir>'],
  setupTestFrameworkScriptFile: undefined,
  testRegex: '^.+\\.spec\\.(ts|tsx|js|jsx)$',
  testMatch: undefined,
  displayName: 'scripts',
  name: 'scripts',
  collectCoverageFrom: ['**/*.js', '!**/*.spec.js', '!*.js', '!**/index.js'],
};
