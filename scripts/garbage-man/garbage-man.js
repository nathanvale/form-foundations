const fs = require('fs');
const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);
const { runESLint } = require('../eslint/eslint.js');
const { cleanUpFiles } = require('./cleanUpFiles.js');
const {
  printToTerminalWidth,
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = require('../shared/reportingUtils');

async function runGarbageMan({ verbose = false }) {
  const eslintConfigPath = path.join(__dirname, '../.eslintrc.json');
  printInverseMessage('Garbage man');
  console.log('\r');
  printToTerminalWidth('removing any unresolved typescript');
  const stdout = await runESLint().catch(e => {
    printInverseMessage('FAIL', MESSAGE_TYPE_FAIL);
    throw e;
  });
  const output = await cleanUpFiles({ stdout })
    .then(response => {
      printInverseMessage('DONE', MESSAGE_TYPE_OK);
      if (verbose) {
        process.stdout.write(`\n${response}\n`);
        return response;
      }
      return '';
    })
    .catch(e => {
      printInverseMessage('FAIL', MESSAGE_TYPE_FAIL);
      throw e;
    });
  return output;
}

exports.runGarbageMan = runGarbageMan;
