import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify-es';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';
import pkg from './package.json';
import path from 'path';
import { minify } from 'uglify-es';
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const inputFile = path.join(__dirname, 'src/index.js');

async function config() {
  try {
    const { stdout } = await exec(`lerna ls --json`);
    const packages = JSON.parse(stdout);
    console.log(packages);

    const d = [
      {
        name: '@form-foundations/atoms',
        version: '0.1.0',
        private: false,
        location: '/Users/nathanvale/lerna-repo/packages/atoms',
      },
      {
        name: '@form-foundations/core',
        version: '0.1.0',
        private: false,
        location: '/Users/nathanvale/lerna-repo/packages/core',
      },
      {
        name: '@form-foundations/examples',
        version: '0.1.0',
        private: false,
        location: '/Users/nathanvale/lerna-repo/packages/examples',
      },
      {
        name: '@form-foundations/widgets',
        version: '0.1.0',
        private: false,
        location: '/Users/nathanvale/lerna-repo/packages/widgets',
      },
    ];
    const input = './compiled/index.js';
    const external = id => !id.startsWith('.') && !id.startsWith('/');
    const replacements = [{ original: 'lodash', replacement: 'lodash-es' }];
    const babelOptions = {
      exclude: /node_modules/,
      runtimeHelpers: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      plugins: [
        'annotate-pure-calls',
        'dev-expression',
        ['transform-rename-import', { replacements }],
      ],
    };

    const buildUmd = ({ env, location, name }) => ({
      input: `${location}/src/index.ts`,
      external: ['react', 'react-native', 'styled-components'],
      output: {
        name: name,
        format: 'umd',
        sourcemap: true,
        file:
          env === 'production'
            ? `${location}/dist/${name.match(/[ \w-]+$/g)}.umd.${env}.js`
            : `${location}/dist/${name.match(/[ \w-]+$/g)}.umd.${env}.js`,
        exports: 'named',
        globals: {
          react: 'React',
          'react-native': 'ReactNative',
          'styled-components': 'styled',
        },
      },

      plugins: [
        resolve({
          customResolveOptions: {
            main: false,
            module: true,
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        replace({
          'process.env.NODE_ENV': JSON.stringify(env),
        }),
        babel(babelOptions),
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
      input: `${location}/src/index.ts`,
      external,
      output: {
        file: `${location}/dist/${name.match(/[ \w-]+$/g)}.cjs.${env}.js`,
        format: 'cjs',
        sourcemap: true,
      },
      plugins: [
        resolve(),
        replace({
          'process.env.NODE_ENV': JSON.stringify(env),
        }),
        sourceMaps(),
        sizeSnapshot(),
      ],
    });

    const buildES = () => ({
      input,
      external,
      output: [
        {
          file: pkg.module,
          format: 'es',
          sourcemap: true,
        },
      ],
      plugins: [resolve(), babel(babelOptions), sizeSnapshot(), sourceMaps()],
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
      );
    /*return [
      buildUmd({ env: 'production' }),
        buildUmd({ env: 'development' }),
           buildCjs({ env: 'production' }),
      buildCjs({ env: 'development' }),
      buildES(), 
    ];*/
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
}

export default config;
