module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(ts|tsx|js)$': 'babel-jest',
  },
  testMatch: ['<rootDir>/src/**/?(*.)spec.ts?(x)'],
  setupTestFrameworkScriptFile: '<rootDir>../../jest.setup.js',
  moduleFileExtensions: ['js', 'json', 'node', 'ts', 'tsx'],
  transformIgnorePatterns: ['/node_modules/(?!lodash-es)'],
  testURL: 'http://localhost',
  globals: { ['__DEV__']: true },
};
