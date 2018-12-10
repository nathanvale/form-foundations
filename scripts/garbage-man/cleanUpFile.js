const fs = require("fs");
const chalk = require("chalk");
const diff = require("jest-diff");
const jscodeshift = require("jscodeshift");
const { missingNamed } = require("./codemods/missingNamed");
const { unresolved } = require("./codemods/unresolved");

async function cleanUpFile({ messages, source, filePath }) {
  const transformedFile = messages.reduce((currfileSource, nextRuleError) => {
    const { source, column, endColumn, ruleId } = nextRuleError;
    let codemod;
    if (ruleId === "import/named" || ruleId === "no-undef") {
      codemod = missingNamed;
    } else if (ruleId === "import/no-unresolved") {
      codemod = unresolved;
    } else {
      return currfileSource;
    }
    console.log("source", source);
    console.log(nextRuleError);
    const value = source.substring(column - 1, endColumn - 1);
    const transformed = codemod(
      { source: currfileSource },
      { jscodeshift },
      { value }
    );
    return transformed;
  }, source);
  const d = diff(source, transformedFile, {
    aAnnotation: "Removed",
    bAnnotation: "Added"
  });
  const output = `\n${d}\n\n`;
  fs.writeFileSync(filePath, transformedFile);
  return output;
}

exports.cleanUpFile = cleanUpFile;
