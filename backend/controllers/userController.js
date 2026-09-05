import { store } from "../db/store.js";
export async function getUserProfile(req, res) {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }
        const freshUser = store.getUserById(user.id);
        return res.json({
            success: true,
            user: freshUser || user
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function updateUserProfile(req, res) {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ success: false, message: "Not authorized" });
        }
        const { name, phone, address, avatar } = req.body;
        const updated = store.updateUser(user.id, {
            ...(name && { name }),
            ...(phone !== undefined && { phone }),
            ...(address !== undefined && { address }),
            ...(avatar !== undefined && { avatar })
        });
        return res.json({
            success: true,
            message: "Profile updated successfully",
            user: updated
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function getAllUsers(req, res) {
    try {
        if (req.user?.role !== "admin") {
            return res.status(403).json({ success: false, message: "Admin access required" });
        }
        const users = store.getAllUsers();
        return res.json({
            success: true,
            count: users.length,
            users
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
