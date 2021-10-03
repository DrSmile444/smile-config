import { mergeArray } from '../utils';

export interface VscodeExtensions {
  recommendations: string[];
}

export class VscodeExtensionMerger {
  mergeExtensions(
    target: VscodeExtensions | null,
    source: VscodeExtensions
  ): VscodeExtensions {
    if (target === null) {
      return source;
    }

    return {
      recommendations: mergeArray(
        target.recommendations,
        source.recommendations
      ),
    };
  }
}
