import mongoose, { Schema } from "mongoose";
const ProductSchema = new Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountPrice: { type: Number, required: true },
    discountPercentage: { type: Number, default: 0 },
    category: { type: String, required: true, index: true },
    brand: { type: String, required: true },
    rating: { type: Number, default: 4.5 },
    numReviews: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 10 },
    images: [{ type: String }],
    tags: [{ type: String }],
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false }
}, {
    timestamps: true
});
export const ProductModel = mongoose.models.Product || mongoose.model("Product", ProductSchema);
