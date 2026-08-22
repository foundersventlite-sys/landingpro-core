import { apiRequest } from "./apiClient";

export const requestService = {
  getAll: () => apiRequest("/requests"),
  getById: (id) => apiRequest(`/requests/${id}`),
  create: (data) => apiRequest("/requests", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/requests/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id) => apiRequest(`/requests/${id}`, { method: "DELETE" }),
};
