export const APP_NAME = "ShopMe";
export const API_BASE_URL = import.meta.env?.VITE_API_URL || "/api";
export const TOKEN_STORAGE_KEY = "shopai_token";
export const USER_STORAGE_KEY = "shopai_user";
export const CART_STORAGE_KEY = "shopai_cart";
export const ORDER_STATUSES = [
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
];
export const CATEGORIES = [
    "All",
    "Electronics",
    "Fashion",
    "Home",
    "Audio",
    "Fitness",
    "Accessories",
];
