import prettierPlugin from "eslint-plugin-prettier";

export default [
    {
        ignores: ["node_modules", "dist", ".vercel"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
        },
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            "prettier/prettier": "error",
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        },
    },
];
