// eslint-disable-next-line no-undef
module.exports = {
    root: true,
    env: {
        browser: true,
        es2020: true,
    },
    
    globals: {},

    extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended', 'plugin:@typescript-eslint/recommended'],

    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 11,
    },

    plugins: ['@typescript-eslint'],
    rules: {
        'no-var': 1,
        'prefer-const': 1,
        'no-unused-vars': 0, // needed for @typescript-eslint/no-unused-vars

        '@typescript-eslint/no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_' }],
        '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true }],
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/member-ordering': 1,
    },
};
