import axios from "axios";
import authService from "./authService";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      authService.removeToken();
      authService.clearStoredUser();

      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;

        if (
          !currentPath.includes("/login") &&
          !currentPath.includes("/register")
        ) {
          window.location.href = "/login";
        }
      }
    }

    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected server communication error occurred.";

    return Promise.reject(new Error(message));
  }
);

export default api;