import { store } from "../db/store.js";
export async function getDashboardStats(req, res) {
    try {
        const stats = store.getAdminStats();
        return res.json({ success: true, stats });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function getAllUsers(req, res) {
    try {
        const users = store.getAllUsers();
        return res.json({ success: true, users });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
