module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 2020,
    },
    extends: [
        'standard',
    ],
    rules: {
        'no-console': 'off',
        'indent': 'off',
        'indent-legacy': [
            'error', 4, {
                'SwitchCase': 1,
            },
        ],
        'semi': [ 'error', 'always' ],
        'comma-dangle': [ 'error', 'always-multiline' ],
        'space-before-function-paren': [ 'error', 'never' ],
        'space-in-parens': [ 'error', 'always' ],
        'no-multi-spaces': [
            'error', {
                exceptions: {
                    'VariableDeclarator': true,
                    'ImportDeclaration': true,
                    'ExportNamedDeclaration': true,
                },
            },
        ],
        'eol-last': 'off',
        'no-multiple-empty-lines': [
            'error',
            {
                'max': 2,
                'maxEOF': 1,
                'maxBOF': 0,
            },
        ],
        'curly': [ 'error', 'multi-line' ],
        'quotes': 'off',
        'no-trailing-spaces': [
            'error', {
                'ignoreComments': true,
                'skipBlankLines': true,
            },
        ],
        'arrow-parens': [ 'error', 'as-needed' ],
        'template-curly-spacing': [ 'error', 'always' ],
        'array-bracket-spacing': [ 'error', 'always' ],
        'lines-between-class-members': 'off',
    },
    overrides: [
        {
            files: [ '*.ts' ],
            plugins: [ '@typescript-eslint' ],
            parserOptions: {
                parser: '@typescript-eslint/parser',
                ecmaVersion: 2020,
                project: './tsconfig.json',
            },
            extends: [
                'plugin:@typescript-eslint/recommended',
                'plugin:@typescript-eslint/recommended-requiring-type-checking',
            ],
            rules: {
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/no-unused-vars-experimental': [ 'error', { ignoreArgsIfArgsAfterAreUsed: true } ],
                '@typescript-eslint/no-inferrable-types': 'off',
                '@typescript-eslint/consistent-type-assertions': [ 'error', { 'assertionStyle': 'angle-bracket' } ],
                '@typescript-eslint/explicit-function-return-type': [ 'error', { allowExpressions: true } ],
                '@typescript-eslint/no-useless-constructor': [ 'error' ],
                '@typescript-eslint/no-use-before-define': 'off',
            },
        },
    ],
};