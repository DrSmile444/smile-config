import * as CommentJSON from 'comment-json';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import deepEqual = require('deep-equal');
import type { Linter } from 'eslint';
import { mergeObjects } from 'json-merger';

import { NOT_FOUND_INDEX } from '../../const';
import { coerceArray, mergeArray } from '../utils';

export class EslintMerger {
  mergeConfigs(
    target: Linter.Config | null,
    source: Linter.Config
  ): Linter.Config {
    if (target === null) {
      return source;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const defaultMerge: Linter.Config = mergeObjects([
      target,
      source,
    ]) as Linter.Config;

    if (target.plugins && source.plugins) {
      defaultMerge.plugins = mergeArray(target.plugins, source.plugins);
    }

    if (target.extends && source.extends) {
      defaultMerge.extends = mergeArray(target.extends, source.extends);
    }

    if (target.ignorePatterns && source.ignorePatterns) {
      defaultMerge.ignorePatterns = mergeArray(
        target.ignorePatterns,
        source.ignorePatterns
      );
    }

    if (target.overrides && source.overrides) {
      const leftOverrides = CommentJSON.parse(
        CommentJSON.stringify(source.overrides)
      ) as Linter.ConfigOverride[];

      defaultMerge.overrides = [
        ...target.overrides.map((targetOverride) => {
          const foundSourceOverrideIndex = leftOverrides.findIndex(
            (sourceOverride) =>
              deepEqual(
                coerceArray(targetOverride.files)
                  .slice()
                  .sort((a, b) => a.localeCompare(b)),
                coerceArray(sourceOverride.files)
                  .slice()
                  .sort((a, b) => a.localeCompare(b))
              )
          );

          if (foundSourceOverrideIndex !== NOT_FOUND_INDEX) {
            const foundSourceOverride = leftOverrides[foundSourceOverrideIndex];
            const mergedOverride = mergeObjects([
              targetOverride,
              foundSourceOverride,
            ]) as Linter.ConfigOverride;
            mergedOverride.plugins = mergeArray(
              targetOverride.plugins,
              foundSourceOverride.plugins
            );

            const DELETE_COUNT = 1;
            leftOverrides.splice(foundSourceOverrideIndex, DELETE_COUNT);

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
