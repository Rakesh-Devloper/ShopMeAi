import mongoose, { Schema } from "mongoose";
const OrderSchema = new Schema({
    orderNumber: { type: String, required: true, unique: true, index: true },
    userId: { type: String, required: true, index: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    items: [
        {
            productId: { type: String, required: true },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true, default: 1 },
            image: { type: String },
            brand: { type: String }
        }
    ],
    shippingAddress: {
        fullName: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        phone: { type: String, required: true }
    },
    deliveryMethod: { type: String, default: "Standard Express" },
    paymentMethod: { type: String, default: "card" },
    paymentStatus: { type: String, enum: ["paid", "pending", "failed"], default: "paid" },
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Processing", "Confirmed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"],
        default: "Processing",
        index: true
    },
    estimatedDelivery: { type: String, default: "2-3 business days" },
    carrier: { type: String, default: "BlueDart Express" },
    trackingNumber: { type: String, default: "" },
    trackingSteps: [
        {
            status: { type: String },
            title: { type: String },
            description: { type: String },
            timestamp: { type: String },
            completed: { type: Boolean, default: false },
            current: { type: Boolean, default: false },
            location: { type: String }
        }
    ]
}, {
    timestamps: true
});
export const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema);
