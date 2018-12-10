module.exports = {
  presets: [['@nathanvale/babel-preset']],
  env: {
    cjs: {
      presets: [['@nathanvale/babel-preset', { modules: 'cjs' }]],
    },
  },
};
