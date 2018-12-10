'use strict';
const opn = require('opn');
const path = require('path');

(async () => {
  try {
    const coveragePath = path.join(
      process.cwd(),
      '/coverage/lcov-report/index.html'
    );
    opn(coveragePath, { app: ['google chrome'] });
    process.exit(0);
  } catch (e) {
    throw e;
    process.exit(1);
  }
})();
