import { apiRequest } from "./apiClient";

export const customerService = {
  getById: (id) => apiRequest(`/customers/${id}`),
  getHistory: (phone) => apiRequest(`/customers/history/${phone}`),
};
