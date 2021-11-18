import { EslintMerger } from './eslint.merger';
import { IgnoreMerger } from './ignore.merger';
import { StylelintMerger } from './stylelint.merger';
import { VscodeExtensionMerger } from './vscode-extension.merger';

export const ignoreMerger = new IgnoreMerger();
export const eslintMerger = new EslintMerger();
export const stylelintMerger = new StylelintMerger();
export const vscodeExtensionMerger = new VscodeExtensionMerger();

export * from './ignore.merger';
export * from './eslint.merger';
export * from './stylelint.merger';
export * from './vscode-extension.merger';
