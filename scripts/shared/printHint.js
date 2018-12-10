const chalk = require('chalk');

function printHint(str) {
  console.log(chalk.bold.blue('Hint: ') + ' ' + str);
}
exports.printHint = printHint;
