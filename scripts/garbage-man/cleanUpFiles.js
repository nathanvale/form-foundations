const { cleanUpFile } = require("./cleanUpFile.js");
/**
 * To have understanding of the eslint's returned json schema.
 * https://eslint.org/docs/user-guide/formatters/#json. Static analysis, also
 * called static code analysis, is a method of computer program debugging that
 * is done by examining the code without executing the program. The process
 * provides an understanding of the code structure, and can help to ensure that
 * the code adheres to industry standards.
 */
async function cleanUpFiles({ stdout }) {
  let output = "";
  const files = JSON.parse(stdout);
  const filesWithErrors = files
    // filter out files with no errors
    .filter(({ errorCount }) => errorCount > 0);

  for (const fileWithErrors of filesWithErrors) {
    const { source, filePath, messages } = fileWithErrors;

    output += await cleanUpFile({ messages, source, filePath });
  }
  return output;
}

exports.cleanUpFiles = cleanUpFiles;
