import { apiRequest } from "./apiClient";

export const analyticsService = {
  getDashboard: () => apiRequest("/analytics/dashboard"),
  getLandingPage: (id) => apiRequest(`/analytics/landing-pages/${id}`),
};
