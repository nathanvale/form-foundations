const util = require('util');
const exec = util.promisify(require('child_process').exec);
const reportingUtils = require('../shared/reportingUtils');
const {
  printToTerminalWidth,
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = reportingUtils;

async function runTSC() {
  printInverseMessage('TSC');
  console.log('\r');
  printToTerminalWidth('generating type declarations');
  return exec(`tsc --build`)
    .then(response => {
      printInverseMessage('DONE', MESSAGE_TYPE_OK);
    })
    .catch(e => {
      printInverseMessage('FAIL', MESSAGE_TYPE_FAIL);
      throw e.stdout;
    });
}

exports.runTSC = runTSC;
