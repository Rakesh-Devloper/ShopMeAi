import { Router } from "express";
import { chatAssistant, getRecommendations, compareProducts } from "../controllers/aiController.js";
const router = Router();
router.post("/chat", chatAssistant);
router.post("/recommendations", getRecommendations);
router.post("/compare", compareProducts);
export default router;
