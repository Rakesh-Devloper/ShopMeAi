import { store } from "../db/store.js";
export async function getCart(req, res) {
    try {
        const userId = req.user?.id || req.query.guestId || "guest";
        const items = store.getCart(userId);
        return res.json({ success: true, items });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function addToCart(req, res) {
    try {
        const userId = req.user?.id || req.body.guestId || "guest";
        const { productId, quantity = 1 } = req.body;
        if (!productId) {
            return res.status(400).json({ success: false, message: "productId is required" });
        }
        const items = store.addToCart(userId, productId, Number(quantity));
        return res.json({ success: true, items });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function updateCartQty(req, res) {
    try {
        const userId = req.user?.id || req.body.guestId || "guest";
        const { productId, quantity } = req.body;
        if (!productId || quantity === undefined) {
            return res.status(400).json({ success: false, message: "productId and quantity are required" });
        }
        const items = store.updateCartQty(userId, productId, Number(quantity));
        return res.json({ success: true, items });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function removeFromCart(req, res) {
    try {
        const userId = req.user?.id || req.body.guestId || "guest";
        const { productId } = req.body;
        if (!productId) {
            return res.status(400).json({ success: false, message: "productId is required" });
        }
        const items = store.removeFromCart(userId, productId);
        return res.json({ success: true, items });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function clearCart(req, res) {
    try {
        const userId = req.user?.id || req.body.guestId || "guest";
        store.setCart(userId, []);
        return res.json({ success: true, items: [] });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
