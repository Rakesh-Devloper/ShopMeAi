import { Router } from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import { getUserProfile, updateUserProfile, getAllUsers } from "../controllers/userController.js";
const router = Router();
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/", protect, adminOnly, getAllUsers);
export default router;
