export const encodeBase64 = (value) => btoa(unescape(encodeURIComponent(String(value))));

export const decodeBase64 = (value) => {
  try {
    return decodeURIComponent(escape(atob(value)));
  } catch {
    return "";
  }
};

export const generateTokenId = () =>
  crypto.randomUUID();
