import axios from "axios";
import authService from "./authService";
// Create Axios client configured for ShopMe backend API
const api = axios.create({
    baseURL: import.meta.env?.VITE_API_URL || "/api",
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 15000
});
// Request interceptor: automatically attach JWT token from authService to every outgoing request
api.interceptors.request.use(config => {
    const token = authService.getToken();
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => Promise.reject(error));
// Response interceptor: handle 401 Unauthorized responses by redirecting to login
api.interceptors.response.use(response => response, error => {
    if (error.response && error.response.status === 401) {
        // Clear token and cached user session
        authService.removeToken();
        authService.clearStoredUser();
        // Redirect user to login page if in browser environment and not already on auth pages
        if (typeof window !== "undefined") {
            const currentPath = window.location.pathname;
            if (!currentPath.includes("/login") && !currentPath.includes("/register")) {
                const redirectQuery = currentPath && currentPath !== "/"
                    ? `?redirect=${encodeURIComponent(currentPath + window.location.search)}`
                    : "";
                window.location.href = `/login${redirectQuery}`;
            }
        }
    }
    const message = error.response?.data?.message ||
        error.message ||
        "An unexpected server communication error occurred.";
    return Promise.reject(new Error(message));
});
export default api;
