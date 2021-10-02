export const mergeArray = <T extends string>(aArray?: T[], bArray?: T[]): T[] => {
  const result = [...(aArray || []), ...(bArray || [])];

  return [...new Set(result)]
};

export function coerceArray<T>(value: T | T[]): T[];
export function coerceArray<T>(value: T | readonly T[]): readonly T[];
export function coerceArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}
