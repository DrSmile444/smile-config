export class CombineMerger {
  mergeFiles(target: string | null, source: string): string {
    if (target === null) {
      return source;
    }

    if (target.includes(source)) {
      return target;
    }

    return `${target}\n${source}`;
  }
}
