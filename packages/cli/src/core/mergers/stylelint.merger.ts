import { mergeObjects } from 'json-merger';
import { mergeArray } from '../utils';

export class StylelintMerger {
  mergeStyle(source: any, target: any) {
    if (source === null) {
      return target;
    }

    const mergedConfig = mergeObjects([source, target]);
    mergedConfig.extends = mergeArray(source.extends, target.extends);

    return mergedConfig;
  }
}
