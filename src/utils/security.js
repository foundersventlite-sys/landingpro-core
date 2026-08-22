export const isSecureContext = () => window.isSecureContext;

export const maskEmail = (email = "") => {
  const [name, domain] = String(email).split("@");
  if (!name || !domain) return "";
  return `${name.slice(0, 2)}***@${domain}`;
};

export const maskPhone = (phone = "") => {
  const value = String(phone).replace(/\s+/g, "");
  if (value.length < 7) return value;
  return `${value.slice(0, 3)}****${value.slice(-3)}`;
};
