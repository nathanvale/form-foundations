const { defaults } = require('jest-config');
const base = require('./jest.settings.js');

module.exports = {
  ...base,
  setupTestFrameworkScriptFile: './jest.setup.js',
  projects: [
    '<rootDir>',
    '<rootDir>/packages/*/jest.config.js',
    '<rootDir>/scripts/jest.config.js'
  ],
  coverageDirectory: '<rootDir>/coverage/',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
