import type { Linter } from 'eslint';
import { mergeObjects } from 'json-merger';
import '@typescript-eslint/experimental-utils';
import deepEqual = require('deep-equal');
import { coerceArray } from '../utils';

export class EslintMerger {
  mergeConfigs(target: Linter.Config | null, source: Linter.Config) {
    const mergeArray = <T extends string>(aArray?: T[], bArray?: T[]): T[] => {
      const result = [...(aArray || []), ...(bArray || [])];

      return [...new Set(result)]
    };

    if (target === null) {
      return source;
    }

    const defaultMerge: Linter.Config = mergeObjects([target, source]);
    defaultMerge.extends = mergeArray(target.extends, source.extends);
    defaultMerge.ignorePatterns = mergeArray(target.ignorePatterns, source.ignorePatterns);

    const leftOverrides = JSON.parse(JSON.stringify(source.overrides)) as Linter.ConfigOverride;

    defaultMerge.overrides = [
      ...target.overrides.map((targetOverride) => {
        const foundSourceOverride = source.overrides.find((sourceOverride) => deepEqual(coerceArray(targetOverride.files).slice().sort(), coerceArray(sourceOverride.files).slice().sort()))

        if (foundSourceOverride) {
          const mergedOverride = mergeObjects([targetOverride, foundSourceOverride]) as Linter.ConfigOverride;
          mergedOverride.plugins = mergeArray(targetOverride.plugins, foundSourceOverride.plugins);

          return mergedOverride;
        }

        return targetOverride;
      }),
      ...leftOverrides,
    ];

    return defaultMerge;
  }
}
