const micromatch = require("micromatch");
const path = require("path");
const mkdirp = require("mkdirp");
const babel = require("@babel/core");
const chalk = require("chalk");
const fs = require("fs");
const replaceExt = require("replace-ext");
const PACKAGES_DIR = require("../shared/packagesDir").PACKAGES_DIR;
const getPackageName = require("../shared/getPackageName").getPackageName;
const getPackageCWD = require("../shared/getPackageCWD").getPackageCWD;
const JS_FILES_PATTERN = "**/*.{ts,tsx,js,jsx}";
const IGNORE_PATTERNS = ["**/*.spec.{ts,tsx,js,jsx}", "**/*.snap", "**/*.map"];

function getBabelConfig(file) {
  const pkgName = getPackageName(file);
  return path.resolve(PACKAGES_DIR, pkgName, "babel.config.js");
}

function runBabel({ file, esPath, cjsPath }) {
  return new Promise(function(resolve) {
    let output = "";
    const babelConfig = getBabelConfig(file);
    const transformOptions = require(babelConfig);
    transformOptions.plugins = transformOptions.plugins
      ? transformOptions.plugins
      : [];
    transformOptions.babelrc = false;
    mkdirp.sync(path.dirname(esPath));
    mkdirp.sync(path.dirname(cjsPath));
    if (micromatch([file], IGNORE_PATTERNS).length > 0) {
      // ignore files such as *.spec.js
      output =
        chalk.dim("\u2022 ") +
        path.relative(PACKAGES_DIR, file) +
        " (ignore)\n";
    } else if (!micromatch.isMatch(file, JS_FILES_PATTERN)) {
      // copy files that don't need to be transpiled (eg .json)
      fs.createReadStream(file).pipe(fs.createWriteStream(esPath));
      output =
        chalk.red("\u2022 ") +
        path.relative(PACKAGES_DIR, file) +
        chalk.red(" \u21D2 ") +
        path.relative(PACKAGES_DIR, esPath) +
        " (copy)" +
        "\n";
    } else {
      const options = Object.assign({}, transformOptions);
      options.plugins = options.plugins.slice();
      options.cwd = getPackageCWD(file);
      //es transpile
      process.env.BABEL_ENV = undefined;
      let transformed = babel.transformFileSync(file, options).code;
      if (transformed !== "") {
        esPath = replaceExt(esPath, ".js");
        fs.writeFileSync(esPath, transformed);
      }
      output =
        chalk.green("\u2022 ") +
        path.relative(PACKAGES_DIR, file) +
        chalk.green(" \u21D2 ") +
        path.relative(PACKAGES_DIR, esPath) +
        "\n";

      //cjs transpile
      process.env.BABEL_ENV = "cjs";
      transformed = babel.transformFileSync(file, options).code;
      if (transformed !== "") {
        cjsPath = replaceExt(cjsPath, ".js");
        fs.writeFileSync(cjsPath, transformed);
      }
      output +=
        chalk.green("\u2022 ") +
        path.relative(PACKAGES_DIR, file) +
        chalk.green(" \u21D2 ") +
        path.relative(PACKAGES_DIR, cjsPath) +
        "\n";
    }

    resolve(output);
  });
}

exports.runBabel = runBabel;
