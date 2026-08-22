import { apiRequest } from "./apiClient";

export const uploadService = {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiRequest("/uploads/image", {
      method: "POST",
      headers: {},
      body: formData,
    });
  },
  deleteImage: (key) => apiRequest(`/uploads/image/${encodeURIComponent(key)}`, { method: "DELETE" }),
};
