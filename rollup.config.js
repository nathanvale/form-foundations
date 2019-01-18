import fs from 'fs';
import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import sourceMaps from 'rollup-plugin-sourcemaps';
import uglify from 'rollup-plugin-uglify-es';
import { minify } from 'uglify-es';
import builtins from 'rollup-plugin-node-builtins';

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const extensions = ['.js', '.ts', '.tsx'];

function toTitleCase(str) {
  return String(str).replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function getUMDGlobalName(packageName) {
  return `FF${toTitleCase(
    packageName.replace(/^@form-foundations\/([a-zA-Z0-9_-]+)$/g, `$1`),
  )}`;
}

function extractName(name) {
  return name.match(/[ \w-]+$/g);
}

function onwarn(warning, warn) {
  if (
    warning.code === 'NON_EXISTENT_EXPORT' ||
    warning.code === 'UNUSED_EXTERNAL_IMPORT'
  ) {
    // The babel typescript plugin may leave unused or non existent
    // imports/exports after it strips out typescript types. We dont
    // need the warning as we don't care.
    return;
  }
  // Use default for everything else
  warn(warning);
}

async function config() {
  try {
    const { stdout } = await exec(`lerna ls --json --no-private`);
    const packages = JSON.parse(stdout);
    const template = ({ name }) => `'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./${'ff-' + extractName(name)}.cjs.production.js');
} else {
  module.exports = require('./${'ff-' + extractName(name)}.cjs.development.js');
}`;
    // create an entry point file
    packages.forEach(({ name, location }) => {
      const path = `${location}/dist/`;
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
      }
      fs.writeFileSync(`${location}/dist/index.js`, template({ name }));
    });

    const external = id => !id.startsWith('.') && !id.startsWith('/');
    const replacements = [{ original: 'lodash', replacement: 'lodash-es' }];
    const babelOptions = ({
      transformRuntime = false,
      useESModules = false,
    } = {}) => {
      return {
        exclude: /node_modules/,
        runtimeHelpers: transformRuntime,
        extensions,
        plugins: [
          useESModules && 'annotate-pure-calls',
          'dev-expression',
          ['transform-rename-import', { replacements }],
          transformRuntime && [
            '@babel/transform-runtime',
            {
              corejs: 2,
              helpers: true,
              regenerator: true,
              useESModules,
            },
          ],
        ].filter(Boolean),
      };
    };

    const buildUmd = ({ env, location, name }) => ({
      onwarn,
      input: `${location}/src/index.ts`,
      external: [
        'react',
        'react-native',
        'styled-components',
        ...packages.map(({ name: packageName }) => packageName),
      ],
      output: {
        name: 'FF' + toTitleCase(extractName(name)),
        format: 'umd',
        sourcemap: true,
        file:
          env === 'production'
            ? `${location}/dist/${'ff-' + extractName(name)}.umd.${env}.js`
            : `${location}/dist/${'ff-' + extractName(name)}.umd.${env}.js`,
        exports: 'named',
        globals: {
          react: 'React',
          'react-native': 'ReactNative',
          'styled-components': 'styled',
          ...packages.reduce((acc, { name: packageName }, i) => {
            acc[packageName] = getUMDGlobalName(packageName);
            return acc;
          }, {}),
        },
      },

      plugins: [
        resolve({
          extensions,
          preferBuiltins: true,
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify(env),
        }),
        builtins(),
        babel(babelOptions()),
        commonjs({
          include: /node_modules/,
          namedExports: {
            'node_modules/prop-types/index.js': [
              'object',
              'oneOfType',
              'string',
              'node',
              'func',
              'bool',
              'element',
            ],
          },
        }),
        sourceMaps(),
        // sizeSnapshot(),
        env === 'production' &&
          uglify(
            {
              output: { comments: false },
              compress: {
                // eslint-disable-next-line camelcase
                keep_infinity: true,
                // eslint-disable-next-line camelcase
                pure_getters: true,
              },
              warnings: true,
              toplevel: false,
            },
            minify,
          ),
      ],
    });

    const buildCjs = ({ env, location, name }) => ({
      onwarn,
      input: `${location}/src/index.ts`,
      external,
      output: {
        file: `${location}/dist/${'ff-' + extractName(name)}.cjs.${env}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      plugins: [
        resolve({
          extensions,
        }),
        babel(babelOptions({ transformRuntime: true })),
        replace({
          'process.env.NODE_ENV': JSON.stringify(env),
        }),
        sourceMaps(),
        // sizeSnapshot(),
      ],
    });

    const buildES = ({ location, name }) => ({
      onwarn,
      input: `${location}/src/index.ts`,
      external,
      output: [
        {
          file: `${location}/dist/${'ff-' + extractName(name)}.esm.js`,
          format: 'es',
          sourcemap: true,
        },
      ],
      plugins: [
        resolve({
          extensions,
        }),
        ,
        babel(babelOptions({ transformRuntime: true, useESModules: true })),
        // sizeSnapshot(),
        sourceMaps(),
      ],
    });

    const configs = [
      /*       ...packages.map(({ location, name }) =>
        buildUmd({ env: 'production', location, name }),
      ),
      ...packages.map(({ location, name }) =>
        buildUmd({ env: 'development', location, name }),
      ), */
      ...packages.map(({ location, name }) =>
        buildCjs({ env: 'production', location, name }),
      ),
      ...packages.map(({ location, name }) =>
        buildCjs({ env: 'development', location, name }),
      ),
      ...packages.map(({ location, name }) => buildES({ location, name })),
    ];

    return configs;
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

export default config;
