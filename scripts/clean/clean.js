const util = require('util');
const exec = util.promisify(require('child_process').exec);
const {
  printToTerminalWidth,
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = require('../shared/reportingUtils');

async function runClean() {
  printInverseMessage('Clean');
  console.log('\r');
  printToTerminalWidth('removing dist folders from all packages');
  return exec(`rm -rf packages/*/dist`)
    .then(response => {
      printInverseMessage('DONE', MESSAGE_TYPE_OK);
    })
    .catch(e => {
      printInverseMessage('FAIL', MESSAGE_TYPE_FAIL);
      throw e;
    });
}

exports.runClean = runClean;
