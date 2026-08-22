export const now = () => new Date().toISOString();

export const isValidDate = (value) => {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

export const daysBetween = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.ceil(Math.abs(endDate - startDate) / 86400000);
};
