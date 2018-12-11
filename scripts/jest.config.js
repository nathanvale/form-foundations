const base = require('../jest.settings.js');

module.exports = {
  ...base,
  setupTestFrameworkScriptFile: undefined,
  testRegex: '^.+\\.spec\\.(ts|tsx|js|jsx)$',
  testMatch: undefined,
  displayName: 'scripts',
  name: 'scripts',
};
