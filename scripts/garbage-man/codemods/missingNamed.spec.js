'use strict';

const { missingNamed } = require('./missingNamed');
const jscodeshift = require('jscodeshift');

describe('missingNamed', () => {
  it('should remove unresolved named imports', () => {
    const file = {
      source: `import { HeadingLinkProps, Hello } from './HeadingChevron.types';`
    };
    const api = { jscodeshift };
    const options = { value: 'HeadingLinkProps' };
    const actual = missingNamed(file, api, options);
    expect(actual).toBe(`import { Hello } from './HeadingChevron.types';`);
  });
  it('should remove unresolved exports', () => {
    const file = {
      source: `import { HeadingLinkProps, Hello } from './HeadingChevron.types';`
    };
    const api = { jscodeshift };
    const options = { value: 'HeadingLinkProps' };
    const actual = missingNamed(file, api, options);
    expect(actual).toBe(`import { Hello } from './HeadingChevron.types';`);
  });
});
