export const generateId = (): number => Math.floor(10000 + Math.random() * 90000);

export const useUniqueId = (prefix: string, overrideId?: string): string => {
  const stringId = `Polaris${prefix}`;
  return overrideId || stringId + generateId();
};

export default {};
