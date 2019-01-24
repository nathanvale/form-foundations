const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const { getPackages } = require('@lerna/project');

async function getPackageAliases() {
  const aliases = (await getPackages())
    .filter(package => !package.private)
    .reduce((result, { name, location }) => {
      result[`${name}$`] = location + '/src';
      return result;
    }, {});
  return aliases;
}

module.exports = async (baseConfig, configType, config) => {
  const packageAliases = await getPackageAliases();
  config.resolve.extensions.push('.ts', '.tsx');
  config.module.rules[0].test = /\.(mjs|jsx?|tsx?)$/;
  config.resolve.extensions.push('.ts', '.tsx');
  config.resolve.alias = {
    ...packageAliases,
  };
  config.plugins.push(
    new ForkTsCheckerWebpackPlugin({
      async: false,
      checkSyntacticErrors: false,
      formatter: require('react-dev-utils/typescriptFormatter'),
    }),
  );
  return config;
};
