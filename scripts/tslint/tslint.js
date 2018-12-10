const path = require('path');
var tslint = require('tslint');
var fs = require('fs');
const { intersect } = require('../shared/intersect');
const {
  printToTerminalWidth,
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = require('../shared/reportingUtils');

const { listChangedFiles } = require('../shared/listChangedFiles');

async function runTSLintOnFilesWithOptions(filePatterns, onlyChanged, options) {
  const { tslintConfig, tsConfig, tsLintOptions = {} } = options;
  let changedFiles = null;
  if (onlyChanged) {
    // Calculate lazily
    changedFiles = [...(await listChangedFiles())];
  }

  const program = tslint.Linter.createProgram(tsConfig);
  const linter = new tslint.Linter(tsLintOptions, program);
  const finalFilePatterns = onlyChanged
    ? intersect(changedFiles, filePatterns)
    : // get all typescript files associated with it's tsconfig.json
      tslint.Linter.getFileNames(program);
  finalFilePatterns.forEach(fileName => {
    var fileContents = fs.readFileSync(fileName, 'utf8');
    var configuration = tslint.Configuration.findConfiguration(
      tslintConfig,
      fileName
    ).results;
    linter.lint(fileName, fileContents, configuration);
  });
  var result = linter.getResult();

  const ignoredMessageCount = 0;
  return {
    output: result.output,
    failures: result.failures,
    errorCount: result.errorCount,
    warningCount: result.warningCount - ignoredMessageCount
  };
}

async function runTSLint({
  onlyChanged,
  shouldWrite,
  fix = true,
  paths = ['packages/**/*.{ts,tsx}', 'docs/**/*.{ts,tsx}'],
  tslintConfig = path.resolve(__dirname, '../../tslint.json'),
  tsConfig = path.resolve(__dirname, '../../tsconfig.lint.json')
}) {
  printToTerminalWidth(
    `performing static analysis on ${
      onlyChanged ? 'your committed' : 'all'
    } files`
  );

  const tsLintOptions = { fix };
  let options = {
    tsConfig,
    tslintConfig,
    tsLintOptions
  };
  if (typeof onlyChanged !== 'boolean') {
    throw new Error('Pass options.onlyChanged as a boolean.');
  }
  const { errorCount, output } = await runTSLintOnFilesWithOptions(
    paths,
    onlyChanged,
    options
  );
  if (errorCount > 0) {
    printInverseMessage('FAIL', MESSAGE_TYPE_FAIL);
    throw new Error(output);
  }
  printInverseMessage('DONE', MESSAGE_TYPE_OK);
  return '';
}

exports.intersect = intersect;
exports.runTSLintOnFilesWithOptions = runTSLintOnFilesWithOptions;
exports.runTSLint = runTSLint;
