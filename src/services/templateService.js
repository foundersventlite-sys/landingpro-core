import { apiRequest } from "./apiClient";

export const templateService = {
  getAll: () => apiRequest("/templates"),
  getById: (id) => apiRequest(`/templates/${id}`),
  create: (data) => apiRequest("/templates", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/templates/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  remove: (id) => apiRequest(`/templates/${id}`, { method: "DELETE" }),
};
