import { mergeObjects } from 'json-merger';
import type { Configuration } from 'stylelint';

import { mergeArray } from '../utils';

export class StylelintMerger {
  mergeStyle(
    source: Configuration | null,
    target: Configuration
  ): Configuration {
    if (source === null) {
      return target;
    }

    const mergedConfig = mergeObjects([source, target]) as Configuration;
    mergedConfig.extends = mergeArray(source.extends, target.extends);

    return mergedConfig;
  }
}
