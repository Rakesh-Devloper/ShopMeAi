import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String, default: "" },
    addresses: [
        {
            id: { type: String },
            fullName: { type: String },
            street: { type: String },
            city: { type: String },
            state: { type: String },
            zipCode: { type: String },
            phone: { type: String },
            isDefault: { type: Boolean, default: false }
        }
    ],
    wishlist: [{ type: String }]
}, {
    timestamps: true
});
export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);
