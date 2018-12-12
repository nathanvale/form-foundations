module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: ['last 2 versions'],
        },
      },
    ],
    '@babel/stage-3',
    '@babel/react',
    '@babel/typescript',
  ],
};
