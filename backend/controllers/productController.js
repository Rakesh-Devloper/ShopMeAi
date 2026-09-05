import { store } from "../db/store.js";
export async function getProducts(req, res) {
    try {
        const { search, category, minPrice, maxPrice, rating, sort, featured, trending } = req.query;
        const products = store.getProducts({
            search: search,
            category: category,
            minPrice: minPrice ? Number(minPrice) : undefined,
            maxPrice: maxPrice ? Number(maxPrice) : undefined,
            rating: rating ? Number(rating) : undefined,
            sort: sort,
            featured: featured === "true" ? true : undefined,
            trending: trending === "true" ? true : undefined
        });
        return res.json({
            success: true,
            count: products.length,
            products
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function getProductById(req, res) {
    try {
        const product = store.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.json({ success: true, product });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function getCategories(req, res) {
    try {
        const categories = store.getCategories();
        return res.json({ success: true, categories });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function getTrendingProducts(req, res) {
    try {
        const products = store.getProducts({ trending: true });
        return res.json({ success: true, products });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function getAIPicks(req, res) {
    try {
        const products = store.getProducts({ featured: true });
        return res.json({ success: true, products: products.slice(0, 4) });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function createProduct(req, res) {
    try {
        const product = store.createProduct(req.body);
        return res.status(201).json({ success: true, product });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function updateProduct(req, res) {
    try {
        const updated = store.updateProduct(req.params.id, req.body);
        if (!updated) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.json({ success: true, product: updated });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function deleteProduct(req, res) {
    try {
        const success = store.deleteProduct(req.params.id);
        if (!success) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        return res.json({ success: true, message: "Product removed" });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
// Cart Controllers
export async function getCart(req, res) {
    const userId = req.user?.id || req.query.guestId || "guest";
    const cart = store.getCart(userId);
    return res.json({ success: true, cart });
}
export async function addToCart(req, res) {
    const userId = req.user?.id || req.body.guestId || "guest";
    const { productId, quantity } = req.body;
    const cart = store.addToCart(userId, productId, quantity || 1);
    return res.json({ success: true, cart });
}
export async function updateCartQty(req, res) {
    const userId = req.user?.id || req.body.guestId || "guest";
    const { productId, quantity } = req.body;
    const cart = store.updateCartQty(userId, productId, quantity);
    return res.json({ success: true, cart });
}
export async function removeFromCart(req, res) {
    const userId = req.user?.id || req.query.guestId || "guest";
    const cart = store.removeFromCart(userId, req.params.productId);
    return res.json({ success: true, cart });
}
// Wishlist
export async function toggleWishlist(req, res) {
    const userId = req.user?.id || "usr-1";
    const { productId } = req.body;
    const wishlist = store.toggleWishlist(userId, productId);
    return res.json({ success: true, wishlist });
}
