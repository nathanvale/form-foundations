const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');

module.exports = (baseConfig, env, config) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@nathanvale/babel-preset'],
      },
    },
  });

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
      checkSyntacticErrors: true,
      formatter: require('react-dev-utils/typescriptFormatter'),
    }),
  );

  console.log(JSON.stringify(config));

  return config;
};
