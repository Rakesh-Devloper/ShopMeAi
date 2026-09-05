import axios from "axios";
import authService from "./authService";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://shopmeai-zki4.onrender.com/api";

console.log("API URL:", API_URL);

const api = axios.create({
  baseURL: API_URL,
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
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected server communication error occurred.";

    return Promise.reject(new Error(message));
  }
);

export default api;