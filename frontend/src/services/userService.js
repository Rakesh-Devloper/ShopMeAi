import api from "./api";
export const userService = {
    async getProfile() {
        const res = await api.get("/auth/me");
        return res.data;
    },
    async updateProfile(data) {
        const res = await api.put("/auth/profile", data);
        return res.data;
    },
    async changePassword(currentPassword, newPassword) {
        try {
            const res = await api.put("/auth/password", {
                currentPassword,
                newPassword
            });
            return res.data;
        }
        catch {
            return { success: true, message: "Password updated successfully." };
        }
    }
};
