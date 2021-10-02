import { VscodeExtensionMerger } from './vscode-extension.merger';

const vscodeExtensionMerger = new VscodeExtensionMerger();

describe('VscodeExtensionMerger', () => {
  it('should merge vscode extensions and remove the same value', () => {
    const result = vscodeExtensionMerger.mergeExtensions({ recommendations: ['1', '2'] }, { recommendations: ['2', '3', '4'] });
    const result2 = vscodeExtensionMerger.mergeExtensions(result, { recommendations: ['2', '5'] });
    expect(result).toStrictEqual({
      recommendations: ['1', '2', '3', '4'],
    });
    expect(result2).toStrictEqual({
      recommendations: ['1', '2', '3', '4', '5'],
    });
  });
});
