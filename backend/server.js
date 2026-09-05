import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, isMongoConnected } from "./config/db.js";
import { getGemini } from "./config/gemini.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
export async function startServer() {
    const app = express();
    const PORT = process.env.PORT || 5000;
    // Initialize DB Connection (with fallback to in-memory store)
    await connectDB();
    // JSON & URL-encoded body parser with generous limit for avatar uploads
    app.use(express.json({ limit: "25mb" }));
    app.use(express.urlencoded({ extended: true, limit: "25mb" }));
    app.use(cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    }));
    // API Health Check
    app.get("/api/health", (_req, res) => {
        res.json({
            status: "ok",
            service: "ShopMe MERN Backend Server",
            database: isMongoConnected() ? "mongodb" : "in-memory-fallback",
            gemini: getGemini() ? "configured" : "not-configured",
            timestamp: new Date().toISOString()
        });
    });
    // REST API Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/products", productRoutes);
    app.use("/api/orders", orderRoutes);
    app.use("/api/cart", cartRoutes);
    app.use("/api/payment", paymentRoutes);
    app.use("/api/ai", aiRoutes);
    app.use("/api/admin", adminRoutes);
    // Global Error Handler
    app.use(errorHandler);
    const server = app.listen(PORT, "0.0.0.0", () => {
        console.log(`ShopMe MERN Production Server running on port ${PORT}`);
    });
    return { app, server };
}
if (process.env.NODE_ENV !== "test") {
    startServer();
}
