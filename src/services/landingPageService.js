import { apiRequest } from "./apiClient";

export const landingPageService = {
  getAll: () => apiRequest("/landing-pages"),
  getById: (id) => apiRequest(`/landing-pages/${id}`),
  create: (data) => apiRequest("/landing-pages", { method: "POST", body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/landing-pages/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  publish: (id) => apiRequest(`/landing-pages/${id}/publish`, { method: "POST" }),
  unpublish: (id) => apiRequest(`/landing-pages/${id}/unpublish`, { method: "POST" }),
  remove: (id) => apiRequest(`/landing-pages/${id}`, { method: "DELETE" }),
};
