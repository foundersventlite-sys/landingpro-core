export const createId = () => crypto.randomUUID();

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const safeJsonParse = (value, fallback = null) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

export const pick = (object, keys) =>
  keys.reduce((result, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) result[key] = object[key];
    return result;
  }, {});

export const omit = (object, keys) => {
  const result = { ...object };
  keys.forEach((key) => delete result[key]);
  return result;
};
