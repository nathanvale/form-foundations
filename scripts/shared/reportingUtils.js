const chalk = require('chalk');
const stringLength = require('string-length');
const OK = chalk.reset.inverse.bold.green(` DONE `);

const MESSAGE_TYPE_OK = 'MESSAGE_TYPE_OK';
const MESSAGE_TYPE_FAIL = 'MESSAGE_TYPE_FAIL';
const MESSAGE_TYPE_INFO = 'MESSAGE_TYPE_INFO';
const MESSAGE_TYPE_WARNING = 'MESSAGE_TYPE_WARNING';

function printToTerminalWidth(str) {
  const columns = process.stdout.columns || 80;
  const WIDTH = columns - stringLength(OK) + 1;
  const strs = str.match(new RegExp(`(.{1,${WIDTH}})`, 'g'));
  let lastString = strs[strs.length - 1];
  if (lastString.length < WIDTH) {
    lastString += Array(WIDTH - lastString.length).join(chalk.dim('.'));
  }
  process.stdout.write(
    strs
      .slice(0, -1)
      .concat(lastString)
      .join('\n')
  );
}

function printInverseMessage(message, errorType = MESSAGE_TYPE_INFO) {
  message = ` ${message.toUpperCase()} `;
  switch (errorType) {
    case MESSAGE_TYPE_OK:
      console.log(chalk.reset.inverse.bold.green(message));
      break;
    case MESSAGE_TYPE_FAIL:
      console.log(chalk.reset.inverse.bold.red(message));
      break;
    case MESSAGE_TYPE_INFO:
      console.log(chalk.reset.inverse.bold.yellow(message));
      break;
    case MESSAGE_TYPE_WARNING:
      console.log(chalk.reset.inverse.bold.white(message));
      break;
    default:
      console.log(message);
      break;
  }
}

exports.printToTerminalWidth = printToTerminalWidth;
exports.printInverseMessage = printInverseMessage;
exports.MESSAGE_TYPE_OK = MESSAGE_TYPE_OK;
exports.MESSAGE_TYPE_FAIL = MESSAGE_TYPE_FAIL;
