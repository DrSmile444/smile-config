import type { Linter } from 'eslint';
import { mergeObjects } from 'json-merger';
import '@typescript-eslint/experimental-utils';

export class EslintMergerService {
  mergeConfigs(target: Linter.Config | null, source: Linter.Config) {
    const mergeArray = <T extends string>(aArray?: T[], bArray?: T[]): T[] => [...(aArray || []).filter((value) => !(bArray || []).includes(value)), ...(bArray || [])];

    if (target === null) {
      return source;
    }

    const defaultMerge: Linter.Config = mergeObjects([target, source]);
    defaultMerge.extends = mergeArray(target.extends, source.extends);
    defaultMerge.ignorePatterns = mergeArray(target.ignorePatterns, source.ignorePatterns);

    return defaultMerge;
  }
}
