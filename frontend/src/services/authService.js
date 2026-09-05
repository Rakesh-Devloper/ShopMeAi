import api from "./api";
export const TOKEN_KEY = "shopai_token";
export const USER_KEY = "shopai_user";
/**
 * Cookie Utilities for Token Storage
 */
export const cookieStorage = {
    get(name) {
        if (typeof document === "undefined")
            return null;
        const nameEQ = `${encodeURIComponent(name)}=`;
        const ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ")
                c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length));
            }
        }
        return null;
    },
    set(name, value, days = 7) {
        if (typeof document === "undefined")
            return;
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";
        const secureFlag = isHttps ? "; Secure" : "";
        document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secureFlag}`;
    },
    remove(name) {
        if (typeof document === "undefined")
            return;
        document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
    }
};
/**
 * JWT utilities
 */
export const jwtUtils = {
    decode(token) {
        try {
            if (!token || typeof token !== "string")
                return null;
            const parts = token.split(".");
            if (parts.length < 2)
                return null;
            const base64Url = parts[1];
            const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
            const jsonPayload = decodeURIComponent(atob(base64)
                .split("")
                .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join(""));
            return JSON.parse(jsonPayload);
        }
        catch {
            return null;
        }
    },
    isExpired(token) {
        if (!token)
            return true;
        const payload = this.decode(token);
        if (!payload || !payload.exp)
            return false;
        return payload.exp * 1000 < Date.now();
    }
};
export const authService = {
    async register(data) {
        const res = await api.post("/auth/register", data);
        if (res.data && res.data.token) {
            this.setToken(res.data.token);
            if (res.data.user) {
                this.setStoredUser(res.data.user);
            }
        }
        return res.data;
    },
    async login(data) {
        const res = await api.post("/auth/login", data);
        if (res.data && res.data.token) {
            this.setToken(res.data.token);
            if (res.data.user) {
                this.setStoredUser(res.data.user);
            }
        }
        return res.data;
    },
    logout() {
        this.removeToken();
        this.clearStoredUser();
    },
    getToken() {
        try {
            const token = localStorage.getItem(TOKEN_KEY);
            if (token)
                return token;
        }
        catch { }
        return cookieStorage.get(TOKEN_KEY);
    },
    setToken(token) {
        if (!token)
            return;
        try {
            localStorage.setItem(TOKEN_KEY, token);
        }
        catch { }
        cookieStorage.set(TOKEN_KEY, token, 7);
    },
    removeToken() {
        try {
            localStorage.removeItem(TOKEN_KEY);
        }
        catch { }
        cookieStorage.remove(TOKEN_KEY);
    },
    isAuthenticated() {
        const token = this.getToken();
        if (!token)
            return false;
        if (jwtUtils.isExpired(token)) {
            this.removeToken();
            this.clearStoredUser();
            return false;
        }
        return true;
    },
    getTokenPayload() {
        const token = this.getToken();
        return token ? jwtUtils.decode(token) : null;
    },
    async getCurrentUser() {
        const res = await api.get("/auth/me");
        if (res.data && res.data.user) {
            this.setStoredUser(res.data.user);
        }
        return res.data;
    },
    async getMe() {
        return this.getCurrentUser();
    },
    async updateProfile(updates) {
        const res = await api.put("/auth/profile", updates);
        if (res.data && res.data.user) {
            this.setStoredUser(res.data.user);
        }
        return res.data;
    },
    async uploadAvatar(avatarBase64) {
        const res = await api.post("/auth/avatar", {
            avatar: avatarBase64
        });
        if (res.data && res.data.user) {
            this.setStoredUser(res.data.user);
        }
        return res.data;
    },
    async changePassword(data) {
        const res = await api.post("/auth/change-password", data);
        return res.data;
    },
    getStoredUser() {
        try {
            const raw = localStorage.getItem(USER_KEY);
            return raw ? JSON.parse(raw) : null;
        }
        catch {
            return null;
        }
    },
    setStoredUser(user) {
        if (!user)
            return;
        try {
            localStorage.setItem(USER_KEY, JSON.stringify(user));
        }
        catch { }
    },
    clearStoredUser() {
        try {
            localStorage.removeItem(USER_KEY);
        }
        catch { }
    }
};
export default authService;
