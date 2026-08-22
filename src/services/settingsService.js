import { apiRequest } from "./apiClient";

export const settingsService = {
  get: () => apiRequest("/settings"),
  update: (data) =>
    apiRequest("/settings", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
