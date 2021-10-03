import { CombineMerger } from './combine.merger';
import { EslintMerger } from './eslint.merger';
import { StylelintMerger } from './stylelint.merger';
import { VscodeExtensionMerger } from './vscode-extension.merger';

export const combineMerger = new CombineMerger();
export const eslintMerger = new EslintMerger();
export const stylelintMerger = new StylelintMerger();
export const vscodeExtensionMerger = new VscodeExtensionMerger();

export * from './combine.merger';
export * from './eslint.merger';
export * from './stylelint.merger';
export * from './vscode-extension.merger';
