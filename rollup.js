/* eslint-disable import/unambiguous, import/no-commonjs */
const {rollup} = require('rollup');
const autoExternal = require('rollup-plugin-auto-external');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const eslint = require('rollup-plugin-eslint');
const uglify = require('rollup-plugin-uglify');

const inputOptions = {
    input: 'src/index.js',
    plugins: [
        resolve({main: true, module: true}),
        commonjs({include: 'node_modules/**'}),
        autoExternal(),
        eslint(),
        babel({exclude: 'node_modules/**'}),
        uglify()
    ]
};

const build = async () => {
    const bundle = await rollup(inputOptions);

    bundle.write({format: 'cjs', file: 'dist/index.js', sourcemap: true});
    bundle.write({format: 'es', file: 'dist/index.mjs', sourcemap: true});
};

build();
