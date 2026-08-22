import { apiRequest } from "./apiClient";

export const clientService = {
  getAll: () => apiRequest("/clients"),
  getById: (id) => apiRequest(`/clients/${id}`),
  create: (data) => apiRequest("/clients", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/clients/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id) => apiRequest(`/clients/${id}`, { method: "DELETE" }),
};
