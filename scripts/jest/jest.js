const util = require("util");
const exec = util.promisify(require("child_process").exec);
const path = require("path");
const chalk = require("chalk");

const {
  printToTerminalWidth,
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL,
  MESSAGE_TYPE_WARNING
} = require("../shared/reportingUtils");

async function runJest() {
  const options = { maxBuffer: 500 * 1024 };
  printToTerminalWidth(`executing unit tests on your committed files`);
  return exec(
    `jest --changedSince master --roots '<rootDir>' --silent --detectOpenHandles --forceExit --json`,
    options
  )
    .then(() => {
      printInverseMessage("DONE", MESSAGE_TYPE_OK);
      return "";
    })
    .catch(({ stderr, stdout }) => {
      const results = JSON.parse(stdout.match(/{.*}/g)[0]);
      let error = "";
      // Tests passed but unacceptable coverage.
      if (results.numFailedTestSuites === 0 && results.numFailedTests === 0) {
        printInverseMessage("DONE", MESSAGE_TYPE_OK);
        const coveragePath = path.join(
          process.cwd(),
          "/coverage/lcov-report/index.html"
        );
        error += `${chalk.reset.inverse.bold.white(
          " WARNING "
        )}\n\nThe files that you have been working on do not meet our high test coverage standards.\n\nPlease be mindful that during code review this issue maybe raised with you.\n\n${stderr
          .match(/coverage threshold for .*/g)
          .map(match => match.charAt(0).toUpperCase() + match.slice(1))
          .join("\n")}\n\n${chalk.bold.blue(
          "Hint: "
        )}run \`yarn coverage\` to see an interactive LCOV coverage report.`;
        return error;
      } else {
        printInverseMessage("FAIL", MESSAGE_TYPE_FAIL);
        function onlyUnique(value, index, self) {
          return self.indexOf(value) === index;
        }
        const fileNames = results.testResults
          .filter(result => result.message !== "")
          .map(({ name }) => name)
          .filter(onlyUnique);
        error += `${
          results.numFailedTests
        } of your tests failed in the following spec(s).\n\n${fileNames.join(
          "\n"
        )}`;
        throw error;
      }
    });
}

exports.runJest = runJest;
