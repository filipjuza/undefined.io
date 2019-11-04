module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true
    },
    extends: ['airbnb-base', 'plugin:node/recommended'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly'
    },
    parserOptions: {
        ecmaVersion: 2018
    },
    rules: {
        indent: ['error', 4],
        'max-len': ['warn', 140]
    }
};
