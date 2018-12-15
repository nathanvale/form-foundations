const { defaults } = require('jest-config');
const base = require('./jest.settings.js');

module.exports = {
  ...base,
  setupTestFrameworkScriptFile: './jest.setup.js',
  projects: ['<rootDir>', '<rootDir>/packages/*/jest.config.js'],
  coverageReporters: ['lcov', 'text-summary'],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
    '**/*.{ts,tsx,js}',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/index.{ts,tsx,js}',
    '!babel.config.js',
    '!jest.config.js',
  ],
  coverageThreshold: {
    global: {
      branches: 57.61,
      functions: 62.1,
      lines: 83.62,
      statements: 81.44,
    },
    './scripts': {
      branches: 15.29,
      functions: 33.01,
      lines: 29.71,
      statements: 29.02,
    },
    './packages/atoms/src': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    './packages/core/src': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    './packages/examples/src': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    './packages/widgets/src': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
