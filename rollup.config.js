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
import tc from 'turbocolor';
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// export const stderr = console.error.bind(console);

function toTitleCase(str) {
  return String(str).replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function title(str) {
  console.error(`${tc.bold.yellow('(!)')} ${tc.bold.yellow(str)}`);
}

function info(url) {
  console.error(tc.gray(url));
}

function onwarn(warning, warn) {
  if (
    warning.code === 'NON_EXISTENT_EXPORT' ||
    warning.code === 'UNUSED_EXTERNAL_IMPORT'
  ) {
    const { loc, frame, message } = warning;
    title(message);
    info('https://ffjs.org/guide/en#warning-non-existent-or-unused-externals');
    // TODO: print this to an output file
    /*   info(`${loc.file} (${loc.line}:${loc.column})`);
    if (frame) {
      info(frame);
    } */
    return;
  }
  // Use default for everything else
  warn(warning);
}

async function config() {
  try {
    const { stdout } = await exec(`lerna ls --json`);
    const packages = JSON.parse(stdout);
    const template = ({ name }) => `'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./${'ff-' +
    name.match(/[ \w-]+$/g)}.cjs.production.js');
} else {
  module.exports = require('./${'ff-' +
    name.match(/[ \w-]+$/g)}.cjs.development.js');
}`;

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
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
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
        '@form-foundations/atoms',
        '@form-foundations/core',
        '@form-foundations/examples',
        '@form-foundations/widgets',
        '@form-foundations/normalize',
      ],
      output: {
        name: 'FF' + toTitleCase(name.match(/[ \w-]+$/g)),
        format: 'umd',
        sourcemap: true,
        file:
          env === 'production'
            ? `${location}/dist/${'ff-' +
                name.match(/[ \w-]+$/g)}.umd.${env}.js`
            : `${location}/dist/${'ff-' +
                name.match(/[ \w-]+$/g)}.umd.${env}.js`,
        exports: 'named',
        globals: {
          react: 'React',
          'react-native': 'ReactNative',
          'styled-components': 'styled',
          '@form-foundations/atoms': 'FFAtoms',
          '@form-foundations/core': 'FFCore',
          '@form-foundations/examples': 'FFExamples',
          '@form-foundations/widgets': 'FFWidgets',
          '@form-foundations/normalize': 'FFNormalize',
        },
      },

      plugins: [
        resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify(env),
        }),
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
        sizeSnapshot(),
        env === 'production' &&
          uglify(
            {
              output: { comments: false },
              compress: {
                keep_infinity: true,
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
        file: `${location}/dist/${'ff-' +
          name.match(/[ \w-]+$/g)}.cjs.${env}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      plugins: [
        resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        babel(babelOptions({ transformRuntime: true })),
        replace({
          'process.env.NODE_ENV': JSON.stringify(env),
        }),
        sourceMaps(),
        sizeSnapshot(),
      ],
    });

    const buildES = ({ location, name }) => ({
      onwarn,
      input: `${location}/src/index.ts`,
      external,
      output: [
        {
          file: `${location}/dist/${'ff-' + name.match(/[ \w-]+$/g)}.esm.js`,
          format: 'es',
          sourcemap: true,
        },
      ],
      plugins: [
        resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        ,
        babel(babelOptions({ transformRuntime: true, useESModules: true })),
        sizeSnapshot(),
        sourceMaps(),
      ],
    });
    return []
      .concat(
        packages.map(({ location, name }) =>
          buildUmd({ env: 'production', location, name }),
        ),
      )
      .concat(
        packages.map(({ location, name }) =>
          buildUmd({ env: 'development', location, name }),
        ),
      )
      .concat(
        packages.map(({ location, name }) =>
          buildCjs({ env: 'production', location, name }),
        ),
      )
      .concat(
        packages.map(({ location, name }) =>
          buildCjs({ env: 'development', location, name }),
        ),
      )
      .concat(
        packages.map(({ location, name }) => buildES({ location, name })),
      );
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

export default config;
