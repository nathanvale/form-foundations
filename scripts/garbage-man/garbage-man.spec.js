'use strict';
jest.mock('./cleanUpFiles.js');
jest.mock('../eslint/eslint.js');
jest.mock('../shared/reportingUtils');
const fs = require('fs');
const { cleanUpFiles } = require('./cleanUpFiles.js');
const { runGarbageMan } = require('./garbage-man');
const { runESLint } = require('../eslint/eslint.js');
const errorsJson = require('./errors.json');
const {
  printToTerminalWidth,
  printInverseMessage,
  MESSAGE_TYPE_OK,
  MESSAGE_TYPE_FAIL
} = require('../shared/reportingUtils');
const errorMessage = 'Some bad shit went down :(';
const mockStdoutWrite = jest.spyOn(process.stdout, 'write');

beforeEach(() => {
  runESLint.mockReset();
  cleanUpFiles.mockReset();
  mockStdoutWrite.mockReset();
});

describe('runGarbageMan', () => {
  const errors = JSON.stringify(errorsJson);
  it('should clean up files with errors with logging', () => {
    runESLint.mockResolvedValueOnce(errors);
    cleanUpFiles.mockResolvedValueOnce('verbose logs');
    return runGarbageMan({ verbose: true }).then(data => {
      expect(data).toBe('verbose logs');
    });
  });
  it('should clean up files with errors without logging', () => {
    runESLint.mockResolvedValueOnce(errors);
    cleanUpFiles.mockResolvedValueOnce('');
    return runGarbageMan({ verbose: false }).then(data => {
      expect(data).toBe('');
    });
  });
  it('should throw an error when eslint fails', () => {
    runESLint.mockRejectedValueOnce(errorMessage);
    cleanUpFiles.mockResolvedValueOnce('');
    return runGarbageMan({ verbose: false }).catch(e => {
      expect(e).toBe(errorMessage);
    });
  });
  it('should throw an error when cleanUpFiles fails', async () => {
    runESLint.mockResolvedValue(errors);
    cleanUpFiles.mockRejectedValue(errorMessage);
    const test = await runGarbageMan({ verbose: false }).catch(e => {
      expect(printInverseMessage).toBeCalledWith('FAIL', MESSAGE_TYPE_FAIL);
      expect(e).toBe(errorMessage);
    });
  });
});
