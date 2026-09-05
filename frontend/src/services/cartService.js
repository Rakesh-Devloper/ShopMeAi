import api from "./api";
export const cartService = {
    async getCart(guestId) {
        const res = await api.get("/cart", {
            params: { guestId }
        });
        return res.data;
    },
    async addToCart(productId, quantity = 1, guestId) {
        const res = await api.post("/cart/add", {
            productId,
            quantity,
            guestId
        });
        return res.data;
    },
    async updateCartQty(productId, quantity, guestId) {
        const res = await api.post("/cart/update", {
            productId,
            quantity,
            guestId
        });
        return res.data;
    },
    async removeFromCart(productId, guestId) {
        const res = await api.post("/cart/remove", {
            productId,
            guestId
        });
        return res.data;
    },
    async clearCart(guestId) {
        const res = await api.post("/cart/clear", { guestId });
        return res.data;
    }
};
