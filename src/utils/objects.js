export const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

export const isEmptyObject = (value) =>
  isObject(value) && Object.keys(value).length === 0;

export const mergeObjects = (...objects) =>
  Object.assign({}, ...objects.filter(isObject));

export const removeUndefined = (object = {}) =>
  Object.fromEntries(
    Object.entries(object).filter(([, value]) => value !== undefined)
  );
