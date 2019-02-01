const {wallabyMonorepo: wallabyConfig} = require('ndv-scripts/config')
module.exports = function(wallaby) {
  const baseConfig = wallabyConfig({scope: '@form-foundations'})(wallaby)
  const tests = [
    ...baseConfig.tests,
    // TODO: raise an issue on wallaby js to find out why this isnt passing
    '!./src/scripts/__tests__/format.js',
  ]
  const config = {
    ...baseConfig,
    tests,
  }

  console.log(config)
  return config
}
