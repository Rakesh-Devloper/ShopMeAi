import { Router } from "express";
import { getProducts, getProductById, getCategories, getTrendingProducts, getAIPicks, createProduct, updateProduct, deleteProduct, getCart, addToCart, updateCartQty, removeFromCart, toggleWishlist } from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
const router = Router();
// Public catalog routes
router.get("/", getProducts);
router.get("/categories", getCategories);
router.get("/trending", getTrendingProducts);
router.get("/ai-picks", getAIPicks);
router.get("/:id", getProductById);
// Admin product CRUD
router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);
// Cart routes
router.get("/cart/items", getCart);
router.post("/cart/add", addToCart);
router.put("/cart/update", updateCartQty);
router.delete("/cart/:productId", removeFromCart);
// Wishlist
router.post("/wishlist/toggle", protect, toggleWishlist);
export default router;
