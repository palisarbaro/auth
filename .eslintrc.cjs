module.exports = {
    'env': {
        'node'  : true,
        'es2021': true
    },
    'root'   : true,
    'parser' : '@typescript-eslint/parser',
    'plugins': [
        '@typescript-eslint'
    ],
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    'overrides': [
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'sourceType' : 'module'
    },
    'rules': {
        'indent': [
            'error',
            4
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'never'
        ],
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'comma-spacing': [
            'error',
            { 'before': false, 'after': true }
        ],
        'key-spacing': [
            'error',
            { 'align': 'colon' }
        ],
        "@typescript-eslint/type-annotation-spacing": "error",
        'no-trailing-spaces': 'error',
        'space-infix-ops'   : 'error'
    }
}
