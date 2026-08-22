export const unique = (items = []) => [...new Set(items)];

export const compact = (items = []) => items.filter(Boolean);

export const chunk = (items = [], size = 10) => {
  if (size <= 0) return [];
  const result = [];
  for (let i = 0; i < items.length; i += size) result.push(items.slice(i, i + size));
  return result;
};
