export const normalizePhone = (phone = "") =>
  String(phone).replace(/[^\d+]/g, "");

export const normalizeEmail = (email = "") =>
  String(email).trim().toLowerCase();

export const normalizeName = (name = "") =>
  String(name).trim().replace(/\s+/g, " ");
