// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        // allow paren-less arrow functions
        'no-unused-vars': 1,
        'space-before-function-paren': 0,
        'arrow-parens': 0,
        'spaced-comment': 0,
        'semi': 0,
        'comma-dangle': 0,
        'no-return-assign': 0,
        'no-tabs': 0,
        'space-before-blocks': 0,
        'indent': 0,
        'padded-blocks': 0,
        'keyword-spacing': 0,
        'no-unneeded-ternary': 0,
        'comma-spacing': 0,
        'space-infix-ops': 0,
        'no-dupe-keys': 0,
        'operator-linebreak': 0,
        'space-unary-ops': 0,
        'semi-spacing': 0,
        'operator-linebreak': 0,
        'space-in-parens': 0,
        'brace-style': 0,
        'key-spacing': 0,
        'quotes': 0,
        'no-multi-spaces': 0,
        'no-multiple-empty-lines': 0,
        'eqeqeq': 0, // '==='
        'camelcase': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
    }
}
