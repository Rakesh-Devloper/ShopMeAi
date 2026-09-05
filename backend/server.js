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

  // Connect MongoDB
  await connectDB();

  // Body parsers
  app.use(express.json({ limit: "25mb" }));

  app.use(
    express.urlencoded({
      extended: true,
      limit: "25mb",
    })
  );

  // ==========================================
  // FINAL CORS CONFIGURATION
  // ==========================================

  const corsOptions = {
    origin: function (origin, callback) {

      // Allow requests without origin
      // Example: Postman, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      // Allow localhost
      if (origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }

      // Allow ALL Vercel deployments
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      console.log("CORS Blocked:", origin);

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  };

  app.use(cors(corsOptions));

  // ==========================================
  // HEALTH CHECK
  // ==========================================

  app.get("/api/health", (_req, res) => {
    res.json({
      status: "ok",

      service: "ShopMe MERN Backend Server",

      database: isMongoConnected()
        ? "mongodb"
        : "in-memory-fallback",

      gemini: getGemini()
        ? "configured"
        : "not-configured",

      timestamp: new Date().toISOString(),
    });
  });

  // ==========================================
  // API ROUTES
  // ==========================================

  app.use("/api/auth", authRoutes);

  app.use("/api/users", userRoutes);

  app.use("/api/products", productRoutes);

  app.use("/api/orders", orderRoutes);

  app.use("/api/cart", cartRoutes);

  app.use("/api/payment", paymentRoutes);

  app.use("/api/ai", aiRoutes);

  app.use("/api/admin", adminRoutes);

  // ==========================================
  // ERROR HANDLER
  // ==========================================

  app.use(errorHandler);

  // ==========================================
  // START SERVER
  // ==========================================

  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `🚀 ShopMe Backend Server running on port ${PORT}`
    );
  });

  return { app, server };
}

if (process.env.NODE_ENV !== "test") {
  startServer();
}