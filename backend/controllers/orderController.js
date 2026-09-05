import { store } from "../db/store.js";
export async function createOrder(req, res) {
    try {
        const { items, shippingAddress, deliveryMethod, paymentMethod, subtotal, discount, shipping, tax, totalAmount } = req.body;
        const user = req.user || { id: "usr-1", name: "Rakesh", email: "kondelarakesh12@gmail.com" };
        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: "No items in order" });
        }
        const order = store.createOrder({
            userId: user.id,
            userName: shippingAddress?.fullName || user.name,
            userEmail: user.email,
            items,
            shippingAddress,
            deliveryMethod: deliveryMethod || "Standard Delivery",
            paymentMethod: paymentMethod || "card",
            paymentStatus: "paid",
            subtotal: subtotal || items.reduce((acc, item) => acc + item.price * item.quantity, 0),
            discount: discount || 0,
            shipping: shipping || 0,
            tax: tax || 0,
            totalAmount: totalAmount || subtotal,
            status: "Processing",
            estimatedDelivery: "Delivery in 2-3 business days"
        });
        return res.status(201).json({ success: true, order });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function getMyOrders(req, res) {
    try {
        const userId = req.user?.id || "usr-1";
        const orders = store.getOrders(userId);
        return res.json({ success: true, orders });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function getOrderById(req, res) {
    try {
        const order = store.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        return res.json({ success: true, order });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function trackOrderByNumber(req, res) {
    try {
        const { orderNumber } = req.query;
        if (!orderNumber) {
            return res.status(400).json({ success: false, message: "Please provide an order number" });
        }
        const order = store.getOrderById(orderNumber);
        if (!order) {
            return res.status(404).json({ success: false, message: "No order found with this tracking number" });
        }
        return res.json({ success: true, order });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function getAllOrders(req, res) {
    try {
        const orders = store.getOrders();
        return res.json({ success: true, orders });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function updateOrderStatus(req, res) {
    try {
        const { status } = req.body;
        const order = store.updateOrderStatus(req.params.id, status);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        return res.json({ success: true, order });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
