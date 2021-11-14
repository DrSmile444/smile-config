function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export class IgnoreMerger {
  mergeFiles(target: string | null, source: string): string {
    const normalizedTarget = target ? target.replace(/\r\n/g, '\n') : target;
    const normalizedSource = source ? source.replace(/\r\n/g, '\n') : source;

    if (normalizedTarget === null) {
      return normalizedSource;
    }

    if (normalizedTarget.includes(normalizedSource)) {
      return normalizedTarget;
    }

    let result = normalizedTarget;

    normalizedSource.split('\n').forEach((line) => {
      if (!RegExp(escapeRegExp(line)).exec(normalizedTarget)) {
        result += line;
      }
    });

    return result.endsWith('\n') ? result : `${result}\n`;
  }
}
