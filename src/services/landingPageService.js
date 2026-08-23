import { apiRequest } from "./apiClient";

export const landingPageService = {
  getAll: () => apiRequest("/landing-pages/list"),

  getById: (id) =>
    apiRequest(`/landing-pages/get?id=${encodeURIComponent(id)}`),

  create: (data) =>
    apiRequest("/landing-pages/create", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id, data) =>
    apiRequest("/landing-pages/update", {
      method: "PUT",
      body: JSON.stringify({
        id,
        ...data,
      }),
    }),

  publish: (id) =>
    apiRequest("/landing-pages/publish", {
      method: "POST",
      body: JSON.stringify({ id }),
    }),

  unpublish: (id) =>
    apiRequest("/landing-pages/unpublish", {
      method: "POST",
      body: JSON.stringify({ id }),
    }),

  remove: (id) =>
    apiRequest(`/landing-pages/delete?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    }),
};
