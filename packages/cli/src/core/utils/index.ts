export const mergeArray = <T extends string>(aArray?: T[], bArray?: T[]): T[] => {
  const result = [...(aArray || []), ...(bArray || [])];

  return [...new Set(result)]
};

export function coerceArray<T>(value: T | T[]): T[];
export function coerceArray<T>(value: T | readonly T[]): readonly T[];
export function coerceArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

/**
 * @description Shortcut function for flattering an array.
 * It uses withing reduce function
 * */
export function reduceArray<T>(accumulator: T[], nextArray: T[]): T[] {
  return [...accumulator, ...nextArray];
}
