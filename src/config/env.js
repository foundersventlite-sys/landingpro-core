export const APP_CONFIG = {
  name: "LandingPro Core",
  environment: import.meta.env.MODE || "development",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "/api",
};
