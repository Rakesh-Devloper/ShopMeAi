import mongoose, { Schema } from "mongoose";
const CategorySchema = new Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String, default: "✨" },
    itemCount: { type: Number, default: 0 },
    bannerImage: { type: String },
    colorBg: { type: String }
}, {
    timestamps: true
});
export const CategoryModel = mongoose.models.Category || mongoose.model("Category", CategorySchema);
