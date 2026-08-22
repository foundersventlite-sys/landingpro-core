export const getPagination = (page = 1, limit = 20) => {
  const currentPage = Math.max(1, Number(page) || 1);
  const pageSize = Math.max(1, Number(limit) || 20);
  return {
    page: currentPage,
    limit: pageSize,
    offset: (currentPage - 1) * pageSize,
  };
};

export const getTotalPages = (total = 0, limit = 20) =>
  Math.max(1, Math.ceil(Number(total || 0) / Math.max(1, Number(limit) || 20)));
