import type * as deepmerge from 'deepmerge';

export const mergeOptions: deepmerge.Options = {
  arrayMerge(target: any[], source: any[], options?: deepmerge.Options): any[] {
    return source;
  },
};
