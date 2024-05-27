import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';

const config = tsEslint.config(
    eslint.configs.recommended,
    ...tsEslint.configs.recommended,
    ...tsEslint.configs.strict,
    ...tsEslint.configs.stylistic
);

export default config;