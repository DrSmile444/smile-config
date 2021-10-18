export class CombineMerger {
  mergeFiles(target: string | null, source: string): string {
    const normalizedTarget = target ? target.replace(/\r\n/g, '\n') : target;
    const normalizedSource = source ? source.replace(/\r\n/g, '\n') : source;

    if (normalizedTarget === null) {
      return normalizedSource;
    }

    if (normalizedTarget.includes(normalizedSource)) {
      return normalizedTarget;
    }

    return `${normalizedTarget}\n${normalizedSource}`;
  }
}
