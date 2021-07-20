module.exports = {
    env: {
        browser: true,
        node: true,
        es2021: true,
    },
    extends: ['eslint:recommended'],
    plugins: ['import', 'prettier'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        'no-unused-vars': 'warn',

        // Не предлагает константы при деструктуризации
        'prefer-const': [
            'error',
            {
                destructuring: 'all',
            },
        ],

        // Неправильно работает в Windows.
        'linebreak-style': 'off',

        // Несовместимо с prettier
        'arrow-parens': 'off',

        // Несовместимо с prettier
        'object-curly-newline': 'off',

        // Несовместимо с prettier
        'no-mixed-operators': 'off',

        // Это - не наш стиль?
        'arrow-body-style': 'off',

        // Несовместимо с prettier
        'function-paren-newline': 'off',
        'no-plusplus': 'off',

        // Несовместимо с prettier
        'space-before-function-paren': 0,

        // Это - не наш стиль?
        'no-param-reassign': 'off',

        // parseInt, parseFloat и radix выключены. Мне это не нравится.
        radix: 'off',

        'prettier/prettier': ['error'],
    },
};
