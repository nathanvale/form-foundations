const { commitsOnBranch } = require('../git/commitsOnBranch');
const { runPrettier } = require('../prettier/');
const { runTSLint } = require('../tslint/');
const { runJest } = require('../jest/');
const { execGitCmd } = require('../git/execGitCmd');
const chalk = require('chalk');
var semver = require('semver');
const {
  printToTerminalWidth,
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = require('../shared/reportingUtils');

async function runPrecommit() {
  let output = '';
  printInverseMessage('Prettier');
  console.log('\r');
  output += await runPrettier({ onlyChanged: true });
  console.log('\r');
  printInverseMessage('TSLint');
  console.log('\r');
  output += await runTSLint({ onlyChanged: true });
  console.log('\r');
  printInverseMessage('Jest');
  console.log('\r');
  output += await runJest({ onlyChanged: true });
  return output;
}

exports.runPrecommit = runPrecommit;
