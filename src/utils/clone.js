export const deepClone = (value) => {
  if (value === undefined) return undefined;
  return structuredClone(value);
};

export const shallowClone = (value) => {
  if (Array.isArray(value)) return [...value];
  if (value && typeof value === "object") return { ...value };
  return value;
};
