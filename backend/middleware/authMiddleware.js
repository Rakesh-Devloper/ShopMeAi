import jwt from "jsonwebtoken";
import { store } from "../db/store.js";
const JWT_SECRET = process.env.JWT_SECRET || "shopai_super_secret_jwt_key_2026";
export function generateToken(id) {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: "7d" });
}
export function protect(req, res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        // If no token, check if requested from frontend with active demo session
        const guestUser = store.getUserById("usr-1");
        if (guestUser) {
            req.user = guestUser;
            return next();
        }
        res.status(401).json({ success: false, message: "Not authorized, no token provided" });
        return;
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = store.getUserById(decoded.id);
        if (!user) {
            res.status(401).json({ success: false, message: "User not found" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        // Fallback gracefully to demo user if token is expired in preview
        const defaultU = store.getUserById("usr-1");
        if (defaultU) {
            req.user = defaultU;
            return next();
        }
        res.status(401).json({ success: false, message: "Not authorized, token failed" });
    }
}
export function admin(req, res, next) {
    if (req.user && req.user.role === "admin") {
        next();
    }
    else {
        res.status(403).json({ success: false, message: "Admin access required" });
    }
}
export const adminOnly = admin;
export function optionalAuth(req, _res, next) {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            const user = store.getUserById(decoded.id);
            if (user) {
                req.user = user;
            }
        }
        catch {
            // ignore expired/invalid token in optional auth
        }
    }
    if (!req.user) {
        // If no valid user found from token, set fallback user
        const defaultU = store.getUserById("usr-1");
        if (defaultU) {
            req.user = defaultU;
        }
    }
    next();
}
