const base = require('../../jest.settings.js');
const pack = require('./package.json');

module.exports = {
  ...base,
  displayName: pack.name,
  name: pack.name,
  testMatch: ['<rootDir>/__test__/**/?(*.)(spec|test).ts?(x)'],
  testRegex: undefined,
  modulePaths: ['src'],
};
