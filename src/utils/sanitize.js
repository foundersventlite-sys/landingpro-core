export const sanitizeText = (value) =>
  String(value ?? "")
    .trim()
    .replace(/[<>]/g, "");

export const sanitizeObject = (object = {}) =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      key,
      typeof value === "string" ? sanitizeText(value) : value,
    ])
  );
