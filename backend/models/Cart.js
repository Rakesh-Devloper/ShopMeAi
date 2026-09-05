import mongoose, { Schema } from "mongoose";
const CartItemSchema = new Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    selectedColor: { type: String },
    selectedSize: { type: String }
});
const CartSchema = new Schema({
    userId: { type: String, required: true, index: true },
    items: [CartItemSchema],
    subtotal: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 }
}, { timestamps: true });
export const CartModel = mongoose.models.Cart || mongoose.model("Cart", CartSchema);
