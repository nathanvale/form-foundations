const { execLernaCmd } = require('../shared/execLernaCmd');
const { runBuild } = require('../build/build');

const {
  printToTerminalWidth,
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = require('../shared/reportingUtils');

async function runBootstrap({ verbose = false } = {}) {
  printInverseMessage('Lerna');
  console.log('\r');
  printToTerminalWidth(
    'installing, hoisting and symlinking any cross-dependencies'
  );
  await execLernaCmd(['bootstrap']);
  printInverseMessage('DONE', MESSAGE_TYPE_OK);
  console.log('\r');
  await runBuild(verbose);
  return true;
}

exports.runBootstrap = runBootstrap;
