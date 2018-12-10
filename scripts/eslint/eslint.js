const util = require("util");
const exec = util.promisify(require("child_process").exec);
const path = require("path");
async function runESLint() {
  const options = { maxBuffer: 500 * 1024 };
  const eslintConfigPath = path.join(__dirname, "../.eslintrc.json");
  return exec(
    `eslint -c ${eslintConfigPath} "packages/form-foundations-core/dist/**/*.js"  -f json`,
    options
  )
    .then(response => response.stdout)
    .catch(e => {
      if (e.stderr === "") return e.stdout;
      throw e;
    });
}

exports.runESLint = runESLint;
