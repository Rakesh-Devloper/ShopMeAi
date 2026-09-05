import jwt from "jsonwebtoken";
export function generateToken(id) {
    const secret = process.env.JWT_SECRET || "shopai-default-jwt-secret-development-mode-token";
    return jwt.sign({ id }, secret, {
        expiresIn: "30d"
    });
}
