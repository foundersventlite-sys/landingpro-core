import { apiRequest } from "./apiClient";

export const userService = {
  getProfile: () => apiRequest("/users/me"),
  updateProfile: (data) =>
    apiRequest("/users/me", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};
