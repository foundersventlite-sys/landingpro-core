import { apiRequest } from "./apiClient";

export const productService = {
  getAll: () => apiRequest("/products"),
  getById: (id) => apiRequest(`/products/${id}`),
  create: (data) => apiRequest("/products", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/products/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id) => apiRequest(`/products/${id}`, { method: "DELETE" }),
};
