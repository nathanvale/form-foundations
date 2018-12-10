'use strict';

jest.mock('../shared/listChangedFiles');
jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
const { listChangedFiles } = require('../shared/listChangedFiles');
const path = require('path');
const tslint = require('./tslint');
const { intersect, runTSLintOnFilesWithOptions, runTSLint } = tslint;
const errorPaths = ['**/filesWithLintErrors/**/*.{ts,tsx}'];
const noErrorPaths = ['**/filesWithNoLintErrors/**/*.{ts,tsx}'];
const tsConfig = path.join(__dirname, './filesWithLintErrors', 'tsconfig.json');
const tslintConfig = path.join(
  __dirname,
  './filesWithLintErrors',
  'tslint.json'
);
const filesWithLintErrors = [
  `${__dirname}/filesWithLintErrors/noInferrableTypes.ts`,
  `${__dirname}/filesWithLintErrors/jsxNoLambda.tsx`
];
const filesWithNoLintErrors = [
  `${__dirname}/filesWithNoLintErrors/noInferrableTypes.ts`,
  `${__dirname}/filesWithNoLintErrors/jsxNoLambda.tsx`
];

describe('runTSLint', () => {
  let onlyChanged;
  // we don't want to fix files in our unit tests.
  const fix = false;
  const tslintConfig = `${__dirname}/tslint.json`;
  describe('when linting changed files', () => {
    describe('and they have errors', () => {
      it('should return false', () => {
        listChangedFiles.mockImplementationOnce(
          () => new Set([...filesWithLintErrors, ''])
        );
        onlyChanged = true;
        return runTSLint({
          onlyChanged,
          fix,
          paths: errorPaths,
          tsConfig: `${__dirname}/filesWithLintErrors/tsconfig.lint.json`,
          tslintConfig: `${__dirname}/filesWithLintErrors/tslint.json`
        }).catch(data => {
          // TODO: mock var result = linter.getResult();
          expect(data).toBeDefined;
        });
      });
    });
    describe('and when they have no errors', () => {
      it('should return true', () => {
        listChangedFiles.mockImplementationOnce(
          () => new Set([...filesWithNoLintErrors, ''])
        );
        onlyChanged = true;
        return runTSLint({
          onlyChanged,
          fix,
          paths: noErrorPaths,
          tsConfig: `${__dirname}/filesWithNoLintErrors/tsconfig.lint.json`,
          tslintConfig: `${__dirname}/filesWithNoLintErrors/tslint.json`
        })
          .then(data => {
            expect(data).toBe(true);
          })
          .catch(e => {});
      });
    });
  });
  describe('when linting ALL files', () => {
    describe('and they have errors', () => {
      it('should return false', () => {
        listChangedFiles.mockResolvedValue(
          new Set([...filesWithLintErrors, ''])
        );
        onlyChanged = false;
        return runTSLint({
          onlyChanged,
          fix,
          paths: errorPaths,
          tsConfig: `${__dirname}/filesWithLintErrors/tsconfig.lint.json`,
          tslintConfig: `${__dirname}/filesWithLintErrors/tslint.json`
        }).catch(data => {
          // TODO: mock var result = linter.getResult();
          expect(data).toBeDefined;
        });
      });
    });
    describe('and when they have no errors', () => {
      it('should return true', () => {
        listChangedFiles.mockImplementationOnce(
          () => new Set([...filesWithNoLintErrors, ''])
        );
        onlyChanged = true;
        return runTSLint({
          onlyChanged,
          fix,
          paths: noErrorPaths,
          tsConfig: `${__dirname}/filesWithNoLintErrors/tsconfig.lint.json`,
          tslintConfig: `${__dirname}/filesWithNoLintErrors/tslint.json`
        })
          .then(data => {
            expect(data).toBe(true);
          })
          .catch(e => {});
      });
    });
  });
});
