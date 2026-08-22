export const isDefined = (value) => value !== undefined && value !== null;

export const isString = (value) => typeof value === "string";

export const isNumber = (value) =>
  typeof value === "number" && Number.isFinite(value);

export const isArray = (value) => Array.isArray(value);

export const isFunction = (value) => typeof value === "function";
