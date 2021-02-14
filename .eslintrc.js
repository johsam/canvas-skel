// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
    },

    extends: [
        // 'hardcore',
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:sonarjs/recommended',
        'plugin:unicorn/recommended',
        'plugin:import/recommended',
        // 'airbnb',
    ],

    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2021,
    },

    plugins: ['@typescript-eslint', 'sonarjs', 'unicorn'],
    rules: {
        'no-var': 1,
        'prefer-const': 1,
        'prefer-arrow-callback': 1,
        'prefer-destructuring': 0,
        'block-scoped-var': 1,
        'dot-notation': 1,
        'sort-vars': 1,
        'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
        'no-duplicate-imports': 1,
        'no-shadow': 1,
        'spaced-comment': ['error', 'always', { 'markers': ['/'] }],
        'indent': 'off',
        'no-unused-vars': 0, // needed for @typescript-eslint/no-unused-vars
        'eqeqeq': 1,
        '@typescript-eslint/no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_' }],
        '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/member-ordering': 1,
        '@typescript-eslint/typedef': 1,

        '@typescript-eslint/prefer-for-of': 1,

        'import/prefer-default-export': 1,

        'sonarjs/cognitive-complexity': 'off',
        'unicorn/no-array-for-each': 'off',
        'unicorn/filename-case': 'off',
        'unicorn/no-useless-undefined': 'off',
        'unicorn/number-literal-case': 'off',
        'unicorn/no-unreadable-array-destructuring': 'off',
        'unicorn/no-abusive-eslint-disable': 'off',
        'unicorn/prevent-abbreviations': [
            'error',
            {
                whitelist: {
                    ctx: true,
                },
            },
        ],
    },
};
