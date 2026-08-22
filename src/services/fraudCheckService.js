import { apiRequest } from "./apiClient";

export const fraudCheckService = {
  check: (phone) =>
    apiRequest("/fraud-check", {
      method: "POST",
      body: JSON.stringify({ phone }),
    }),
};
