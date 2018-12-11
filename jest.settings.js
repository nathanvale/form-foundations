module.exports = {
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(ts|tsx|js)$': 'babel-jest',
  },
  testMatch: ['<rootDir>/test/**/?(*.)(spec|test).ts?(x)'],
  setupTestFrameworkScriptFile: '<rootDir>../../jest.setup.js',
  moduleFileExtensions: ['js', 'json', 'node', 'ts', 'tsx'],
  transformIgnorePatterns: ['/node_modules/(?!@babel/runtime-corejs2)'],
  testURL: 'http://localhost',
  globals: { ['__DEV__']: true },
};
