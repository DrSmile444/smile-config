export interface VscodeExtensions {
  recommendations: string[];
}

export class VscodeExtensionMerger {
  mergeExtensions(target: VscodeExtensions | null, source: VscodeExtensions): VscodeExtensions {
    const mergeArray = <T extends string>(aArray?: T[], bArray?: T[]): T[] => {
      const result = [...(aArray || []), ...(bArray || [])];

      return [...new Set(result)]
    };
    if (target === null) {
      return source;
    }

    return {
      recommendations: mergeArray(target.recommendations, source.recommendations),
    };
  }
}
