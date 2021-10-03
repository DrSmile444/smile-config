export function coerceArray<T>(value: T | T[]): T[];
export function coerceArray<T>(value: T | readonly T[]): readonly T[];
export function coerceArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

export const mergeArray = <T extends string[] | string>(
  aArray?: T,
  bArray?: T
): T extends any[] ? T : T[] => {
  const result = [...coerceArray(aArray ?? []), ...coerceArray(bArray ?? [])];

  return [...new Set(result)] as T extends any[] ? T : T[];
};

/**
 * @description Shortcut function for flattering an array.
 * It uses withing reduce function
 * */
export function reduceArray<T>(accumulator: T[], nextArray: T[]): T[] {
  return [...accumulator, ...nextArray];
}
