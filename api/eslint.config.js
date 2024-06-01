import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';

import globals from 'globals';

const config = tsEslint.config(
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.node
            }
        }
    },
    {
        ignores: ["dist/"]
    }
);

export default config;