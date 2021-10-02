export const mergeArray = <T extends string>(aArray?: T[], bArray?: T[]): T[] => {
  const result = [...(aArray || []), ...(bArray || [])];

  return [...new Set(result)]
};
