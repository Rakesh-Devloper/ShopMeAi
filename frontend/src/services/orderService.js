import api from "./api";

export const orderService = {
    async createOrder(payload) {
        const res = await api.post("/orders", payload);
        return res.data;
    },

    async getMyOrders() {
        const res = await api.get("/orders/my-orders");
        return res.data;
    },

    async getOrderById(id) {
        const res = await api.get(`/orders/${id}`);
        return res.data;
    },

    async trackOrder(orderNumber) {
        const res = await api.get("/orders/track", {
            params: {
                orderNumber
            }
        });

        return res.data;
    },

    async getAllOrders() {
        const res = await api.get("/orders/admin/all");
        return res.data;
    },

    async updateOrderStatus(id, status) {
        const res = await api.put(`/orders/${id}/status`, {
            status
        });

        return res.data;
    }
};