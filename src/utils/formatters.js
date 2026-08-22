export const formatCurrency = (amount, currency = "৳") =>
  `${currency}${Number(amount || 0).toLocaleString("en-BD")}`;

export const formatDate = (date) =>
  date ? new Date(date).toLocaleDateString("en-BD") : "";

export const formatDateTime = (date) =>
  date ? new Date(date).toLocaleString("en-BD") : "";

export const truncate = (value, length = 80) => {
  const text = String(value || "");
  return text.length > length ? `${text.slice(0, length)}...` : text;
};
