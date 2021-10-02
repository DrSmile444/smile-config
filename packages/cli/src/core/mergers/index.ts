import { EslintMerger } from './eslint.merger';
import { StylelintMerger } from './stylelint.merger';
import { VscodeExtensionMerger } from './vscode-extension.merger';

export const eslintMerger = new EslintMerger();
export const stylelintMerger = new StylelintMerger();
export const vscodeExtensionMerger = new VscodeExtensionMerger();

export * from './eslint.merger';
export * from './stylelint.merger';
export * from './vscode-extension.merger';
