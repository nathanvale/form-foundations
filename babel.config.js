module.exports = {
  presets: [["@nathanvale/babel-preset"]],
  env: {
    node: {
      presets: [["@nathanvale/babel-preset", { node: 8.9 }]]
    },
    cjs: {
      presets: [["@nathanvale/babel-preset", { modules: "cjs" }]]
    }
  }
};
