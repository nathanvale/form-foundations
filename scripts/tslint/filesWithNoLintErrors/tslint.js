const minimatch = require('minimatch');
const path = require('path');
var tslint = require('tslint');
var fs = require('fs');

const { listChangedFiles } = require('../shared/listChangedFiles');
let changedFiles = null;

function intersect(files, patterns) {
  let intersection = [];
  patterns.forEach(pattern => {
    intersection = [
      ...intersection,
      ...minimatch.match(files, pattern, { matchBase: true, dot: true })
    ];
  });
  return [...new Set(intersection)];
}

function runTSLintOnFilesWithOptions(filePatterns, onlyChanged, options) {
  const { tslintConfig, tsConfig, tsLintOptions = {} } = options;
  if (onlyChanged && changedFiles === null) {
    // Calculate lazily.
    changedFiles = [...listChangedFiles()];
  }

  console.log(filePatterns);
  console.log(changedFiles);

  const program = tslint.Linter.createProgram(tsConfig);
  console.log(tsLintOptions);
  const linter = new tslint.Linter(tsLintOptions, program);

  console.log(onlyChanged);
  const finalFilePatterns = onlyChanged
    ? intersect(changedFiles, filePatterns)
    : // get all typescript files associated with it's tsconfig.json
      tslint.Linter.getFileNames(program);

  const hmm = tslint.Linter.getFileNames(program);
  console.log(hmm);
  console.log(finalFilePatterns);

  finalFilePatterns.forEach(fileName => {
    var fileContents = fs.readFileSync(fileName, 'utf8');

    var configuration = tslint.Configuration.findConfiguration(
      tslintConfig,
      fileName
    ).results;
    linter.lint(fileName, fileContents, configuration);
  });
  var result = linter.getResult();

  console.log(result);

  const ignoredMessageCount = 0;
  return {
    failures: result.failures,
    errorCount: result.errorCount,
    warningCount: result.warningCount - ignoredMessageCount
  };
}

function runTSLint({
  onlyChanged,
  fix = true,
  paths = ['packages/**/*.{ts,tsx}', 'docs/**/*.{ts,tsx}'],
  tslintConfig = path.resolve(__dirname, '../../tslint.json'),
  tsConfig = path.resolve(__dirname, '../../tsconfig.lint.json')
}) {
  console.log(arguments);
  const tsLintOptions = { fix };

  let options = {
    tsConfig,
    tslintConfig,
    tsLintOptions
  };

  if (typeof onlyChanged !== 'boolean') {
    throw new Error('Pass options.onlyChanged as a boolean.');
  }

  const { errorCount } = runTSLintOnFilesWithOptions(
    paths,
    onlyChanged,
    options
  );

  return errorCount === 0;
}

exports.intersect = intersect;
exports.runTSLintOnFilesWithOptions = runTSLintOnFilesWithOptions;
exports.runTSLint = runTSLint;
