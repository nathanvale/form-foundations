'use strict';

const { unresolved } = require('./unresolved');
const jscodeshift = require('jscodeshift');

describe('unresolved', () => {
  it('should remove unresolved exported files', () => {
    const file = {
      source: `export * from './Accordion';
    export * from './Accordion.types';`
    };
    const api = { jscodeshift };
    const options = { value: "'./Accordion.types'" };
    const actual = unresolved(file, api, options);
    expect(actual).toBe(`export * from './Accordion';`);
  });
  it('should remove unresolved imported files', () => {
    const file = {
      source: `import { Accordion } from './Accordion';
      import { AccordionProps } from './Accordion.types';`
    };
    const api = { jscodeshift };
    const options = { value: "'./Accordion.types'" };
    const actual = unresolved(file, api, options);
    expect(actual).toBe(`import { Accordion } from './Accordion';`);
  });
});
