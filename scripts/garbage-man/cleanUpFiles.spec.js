'use strict';

jest.mock('./cleanUpFile.js');
const { cleanUpFile } = require('./cleanUpFile.js');
const { cleanUpFiles } = require('./cleanUpFiles.js');
const errorsJson = require('./errors.json');

beforeEach(() => {
  cleanUpFile.mockReset();
});

describe('cleanUpFiles', () => {
  const errors = JSON.stringify(errorsJson);
  it('should clean up files with errors with logs', () => {
    cleanUpFile.mockResolvedValue('clean up log\n');
    const stdout = errors;
    return cleanUpFiles({ stdout, verbose: true }).then(data => {
      expect(data).toBe('clean up log\nclean up log\n');
    });
  });
});
