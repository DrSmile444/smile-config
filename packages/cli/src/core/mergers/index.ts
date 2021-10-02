import { EslintMerger } from './eslint.merger';
import { VscodeExtensionMerger } from './vscode-extension.merger';

export const eslintMerger = new EslintMerger();
export const vscodeExtensionMerger = new VscodeExtensionMerger();

export * from './eslint.merger';
export * from './vscode-extension.merger';
