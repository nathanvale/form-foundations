const base = require('../jest.settings.js');

module.exports = {
  ...base,
  roots: ['<rootDir>'],
  setupTestFrameworkScriptFile: null,
  displayName: 'scripts',
  name: 'scripts',
  collectCoverageFrom: ['**/*.js', '!**/*.spec.js', '!*.js', '!**/index.js']
};
