import mongoose from "mongoose";
import { store } from "../db/store.js";
import { ProductModel } from "../models/Product.js";
import { CategoryModel } from "../models/Category.js";
import { UserModel } from "../models/User.js";
import { OrderModel } from "../models/Order.js";
let isConnected = false;
export async function connectDB() {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        console.log("ℹ️ No MONGO_URI provided in environment. Running with in-memory MERN store engine.");
        return false;
    }
    try {
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
        });
        isConnected = true;
        console.log("✅ MongoDB Connected Successfully!");
        // Seed database if empty
        await seedMongoIfEmpty();
        return true;
    }
    catch (err) {
        console.warn("⚠️ MongoDB connection could not be established:", err.message);
        console.log("ℹ️ Falling back smoothly to reactive in-memory database store.");
        return false;
    }
}
export function isMongoConnected() {
    return isConnected && mongoose.connection.readyState === 1;
}
async function seedMongoIfEmpty() {
    try {
        const productCount = await ProductModel.countDocuments();
        if (productCount === 0) {
            console.log("🌱 Seeding initial products to MongoDB...");
            const products = store.getProducts();
            await ProductModel.insertMany(products);
        }
        const categoryCount = await CategoryModel.countDocuments();
        if (categoryCount === 0) {
            console.log("🌱 Seeding initial categories to MongoDB...");
            const categories = store.getCategories();
            await CategoryModel.insertMany(categories);
        }
        const userCount = await UserModel.countDocuments();
        if (userCount === 0) {
            console.log("🌱 Seeding initial users to MongoDB...");
            const users = store.getAllUsers();
            for (const u of users) {
                await UserModel.create({
                    ...u,
                    passwordHash: "$2a$10$wN1GqK1z1H.H4M7k9u5sVeZJ90wUqyV6qg2O8cKpFzO3aPqRstz12" // password123
                });
            }
        }
        const orderCount = await OrderModel.countDocuments();
        if (orderCount === 0) {
            console.log("🌱 Seeding initial orders to MongoDB...");
            const orders = store.getOrders();
            await OrderModel.insertMany(orders);
        }
    }
    catch (err) {
        console.warn("Notice during MongoDB seeding:", err.message);
    }
}
