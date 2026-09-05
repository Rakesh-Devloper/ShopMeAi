import api from "./api";
export const productService = {
    async getProducts(params) {
        const res = await api.get("/products", { params });
        return res.data;
    },
    async getProductById(id) {
        const res = await api.get(`/products/${id}`);
        return res.data;
    },
    async getCategories() {
        const res = await api.get("/products/categories");
        return res.data;
    },
    async getTrending() {
        const res = await api.get("/products/trending");
        return res.data;
    },
    async getAIPicks() {
        const res = await api.get("/products/aipicks");
        return res.data;
    },
    async createProduct(product) {
        const res = await api.post("/products", product);
        return res.data;
    },
    async updateProduct(id, updates) {
        const res = await api.put(`/products/${id}`, updates);
        return res.data;
    },
    async deleteProduct(id) {
        const res = await api.delete(`/products/${id}`);
        return res.data;
    }
};
