import type { Linter } from 'eslint';
import { mergeObjects } from 'json-merger';
import '@typescript-eslint/experimental-utils';
import deepEqual = require('deep-equal');
import { coerceArray, mergeArray } from '../utils';

export class EslintMerger {
  mergeConfigs(target: Linter.Config | null, source: Linter.Config) {
    if (target === null) {
      return source;
    }

    const defaultMerge: Linter.Config = mergeObjects([target, source]);

    if (target.extends && source.extends) {
      defaultMerge.extends = mergeArray(target.extends, source.extends);
    }

    if (target.ignorePatterns && source.ignorePatterns) {
      defaultMerge.ignorePatterns = mergeArray(target.ignorePatterns, source.ignorePatterns);
    }

    if (target.overrides && source.overrides) {
      const leftOverrides = JSON.parse(JSON.stringify(source.overrides)) as Linter.ConfigOverride[];

      defaultMerge.overrides = [
        ...target.overrides.map((targetOverride) => {
          const foundSourceOverrideIndex = leftOverrides.findIndex((sourceOverride) => deepEqual(coerceArray(targetOverride.files).slice().sort(), coerceArray(sourceOverride.files).slice().sort()))

          if (foundSourceOverrideIndex !== -1) {
            const foundSourceOverride = leftOverrides[foundSourceOverrideIndex];
            const mergedOverride = mergeObjects([targetOverride, foundSourceOverride]) as Linter.ConfigOverride;
            mergedOverride.plugins = mergeArray(targetOverride.plugins, foundSourceOverride.plugins);

            leftOverrides.splice(foundSourceOverrideIndex, 1);

            return mergedOverride;
          }

          return targetOverride;
        }),
        ...leftOverrides,
      ];
    }

    return defaultMerge;
  }
}
