import * as deepmerge from 'deepmerge';
import type { Configuration } from 'stylelint';

import { mergeArray } from '../utils';
import { mergeOptions } from './merge-options';

export class StylelintMerger {
  mergeStyle(
    source: Configuration | null,
    target: Configuration
  ): Configuration {
    if (source === null) {
      return target;
    }

    const mergedConfig = deepmerge.all(
      [source, target],
      mergeOptions
    ) as Configuration;
    mergedConfig.extends = mergeArray(source.extends, target.extends);

    return mergedConfig;
  }
}
