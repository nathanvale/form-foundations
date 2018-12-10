function printToTerminalWidth(str) {
  return str;
}

const printInverseMessage = jest.fn().mockImplementation(() => {
  return 'printInverseMessage';
});

const MESSAGE_TYPE_OK = 'MESSAGE_TYPE_OK';
const MESSAGE_TYPE_FAIL = 'MESSAGE_TYPE_FAIL';

exports.printToTerminalWidth = printToTerminalWidth;
exports.printInverseMessage = printInverseMessage;
exports.MESSAGE_TYPE_OK = MESSAGE_TYPE_OK;
exports.MESSAGE_TYPE_FAIL = MESSAGE_TYPE_FAIL;
