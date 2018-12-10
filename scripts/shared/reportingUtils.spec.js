'use strict';

const reportingUtils = require('./reportingUtils');
const { printToTerminalWidth, printInverseMessage, FAIL, OK } = reportingUtils;

describe('FAIL', () => {
  it('should...', () => {
    const actual = {};
    expect(FAIL).toMatchSnapshot();
  });
});

describe('OK', () => {
  it('should...', () => {
    const actual = {};
    expect(OK).toMatchSnapshot();
  });
});
