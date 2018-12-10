const { defaults } = require('jest-config');
const base = require('./jest.settings.js');

module.exports = {
  ...base,
  setupTestFrameworkScriptFile: './jest.setup.js',
  projects: [
    '<rootDir>',
    '<rootDir>/packages/*/jest.config.js',
    '<rootDir>/scripts/jest.config.js',
  ],
};
