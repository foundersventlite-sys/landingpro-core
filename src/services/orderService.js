import { apiRequest } from "./apiClient";

export const orderService = {
  getAll: () => apiRequest("/orders"),
  getById: (id) => apiRequest(`/orders/${id}`),
  create: (data) => apiRequest("/orders", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/orders/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  confirm: (id) => apiRequest(`/orders/${id}/confirm`, { method: "POST" }),
  cancel: (id) => apiRequest(`/orders/${id}/cancel`, { method: "POST" }),
};
