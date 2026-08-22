export const hasPermission = (role, permission, permissions) =>
  Array.isArray(permissions?.[role]) && permissions[role].includes(permission);

export const isAdmin = (role) => role === "admin";

export const isClient = (role) => role === "client";
