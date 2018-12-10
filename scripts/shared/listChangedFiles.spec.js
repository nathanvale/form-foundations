'use strict';
jest.mock('child_process');

const execFileSync = require('child_process').execFileSync;

const { listChangedFiles } = require('./listChangedFiles');

describe('runTSLintOnFilesWithOptions', () => {
  it('should...', () => {
    const files = [
      '/Users/nathanvale/Dropbox/origin-react/packages/style-guide/src/components/Text/styles.tsx',
      '/Users/nathanvale/Dropbox/origin-react/packages/style-guide/src/components/Text/Text.spec.tsx',
      '/Users/nathanvale/Dropbox/origin-react/packages/style-guide/src/components/Text/Text.tsx',
      '/Users/nathanvale/Dropbox/origin-react/packages/style-guide/src/components/Text/Text.types.ts'
    ];

    execFileSync
      .mockImplementationOnce(() => 'e78c2adb5727e8c1acd1eb12a6ede464cc88097a')
      .mockImplementationOnce(
        () => `package.json\nCONTRIBUTING.md\nbabel.config.js`
      )
      .mockImplementationOnce(() => '');

    listChangedFiles().then(data => {
      expect(data).toEqual(
        new Set(['package.json', 'CONTRIBUTING.md', 'babel.config.js', ''])
      );
    });
  });
});
