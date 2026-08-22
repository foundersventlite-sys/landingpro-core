import { apiRequest } from "./apiClient";

export const courierService = {
  createEntry: (data) =>
    apiRequest("/courier/entry", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  cancelEntry: (id) =>
    apiRequest(`/courier/entry/${id}/cancel`, {
      method: "POST",
    }),
  getStatus: (id) => apiRequest(`/courier/entry/${id}`),
};
