const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = (baseConfig, configType, config) => {
  config.resolve.extensions.push('.ts', '.tsx');
  config.module.rules[0].test = /\.(mjs|jsx?|tsx?)$/;
  config.resolve.extensions.push('.ts', '.tsx');

  config.resolve.alias = {
    '@form-foundations/examples': path.resolve(
      __dirname,
      '../packages/examples/src',
    ),
    '@form-foundations/core': path.resolve(__dirname, '../packages/core/src'),
    '@form-foundations/atoms': path.resolve(__dirname, '../packages/atoms/src'),
    '@form-foundations/widgets': path.resolve(
      __dirname,
      '../packages/widgets/src',
    ),
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
