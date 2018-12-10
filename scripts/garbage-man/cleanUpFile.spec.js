'use strict';
jest.mock('fs');
jest.mock('jest-diff');
const fs = require('fs');
const diff = require('jest-diff');
const { cleanUpFile } = require('./cleanUpFile.js');
const errorsJson = require('./errors.json');
const transformed = require('./errors.json');
const { missingNamed } = require('./codemods/missingNamed');
const { unresolved } = require('./codemods/unresolved');

beforeEach(() => {
  fs.writeFileSync.mockReset();
  diff.mockReset();
});

describe('cleanUpFile', () => {
  let messages = errorsJson[1].messages;
  const source = errorsJson[1].source;
  const filePath = errorsJson[1].filePath;
  const transformedFile = `var HeadingChevron = 'div';\nexport { HeadingChevron };`;
  it('should clean up a file', () => {
    diff.mockImplementationOnce(() => transformedFile);
    return cleanUpFile({ messages, source, filePath }).then(data => {
      expect(diff).toBeCalledWith(source, transformedFile, {
        aAnnotation: 'Removed',
        bAnnotation: 'Added'
      });
      expect(fs.writeFileSync).toBeCalledWith(filePath, transformedFile);
      expect(data).toBe(`\n${transformedFile}\n\n`);
    });
  });
  it('should not transform if no matching rule errors found', () => {
    messages = [{ ruleId: 'someUnknownRule' }];
    return cleanUpFile({ messages, source, filePath }).then(data => {
      expect(diff).toBeCalledWith(source, source, {
        aAnnotation: 'Removed',
        bAnnotation: 'Added'
      });
      expect(fs.writeFileSync).toBeCalledWith(filePath, source);
      expect(data).toMatchSnapshot();
    });
  });
});
