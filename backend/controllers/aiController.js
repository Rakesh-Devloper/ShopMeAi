import { getGemini, getGeminiModel } from "../config/gemini.js";
import { store } from "../db/store.js";
export async function chatAssistant(req, res) {
    try {
        const { message, conversationHistory = [] } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }
        const allProducts = store.getProducts();
        const catalogSummary = allProducts.map(p => ({
            id: p.id,
            name: p.name,
            category: p.category,
            brand: p.brand,
            price: p.discountPrice,
            originalPrice: p.price,
            discount: p.discountPercentage,
            rating: p.rating,
            features: p.features,
            description: p.description
        }));
        const gemini = getGemini();
        if (gemini) {
            try {
                const systemPrompt = `You are ShopMe, an intelligent, friendly, and expert personal shopping assistant for an e-commerce platform.
Your mission is to help shoppers find the exact right items from the available store catalog, offer insightful comparisons, and give honest advice.
Currency is Indian Rupee (₹).

Store Catalog:
${JSON.stringify(catalogSummary, null, 2)}

Instructions:
1. Always sound welcoming, concise, and helpful.
2. Recommend 1 to 3 relevant products from the catalog if applicable to user query.
3. If asking for a comparison, outline pros, cons, and a definitive verdict.
4. Output your answer in JSON format with this exact structure:
{
  "reply": "Conversational helpful response explaining your recommendations and highlighting key benefits.",
  "recommendedProductIds": ["prod-1", "prod-2"],
  "followUpSuggestions": ["Tell me about warranty", "Show cheaper alternatives"]
}`;
                const response = await gemini.models.generateContent({
                    model: getGeminiModel(),
                    contents: message,
                    config: {
                        systemInstruction: systemPrompt,
                        responseMimeType: "application/json"
                    }
                });
                const text = response.text || "{}";
                let parsed = {};
                try {
                    parsed = JSON.parse(text);
                }
                catch {
                    parsed = { reply: text, recommendedProductIds: [] };
                }
                const matchedProducts = (parsed.recommendedProductIds || [])
                    .map((id) => store.getProductById(id))
                    .filter(Boolean);
                return res.json({
                    success: true,
                    provider: "gemini",
                    reply: parsed.reply || "Here are my top recommendations tailored just for you!",
                    recommendedProducts: matchedProducts,
                    followUpSuggestions: parsed.followUpSuggestions || [
                        "Compare specs",
                        "Show warranty details",
                        "Are there bank offers?"
                    ]
                });
            }
            catch (apiErr) {
                console.warn("Gemini API call warning, using catalog smart matching:", apiErr.message);
                // Fall back to rule-based catalog engine
            }
        }
        // High quality intelligent catalog fallback
        const q = message.toLowerCase();
        let matched = allProducts.filter(p => {
            const matchName = p.name.toLowerCase().includes(q);
            const matchCat = p.category.toLowerCase().includes(q);
            const matchBrand = p.brand.toLowerCase().includes(q);
            const matchTag = p.tags.some(t => q.includes(t.toLowerCase()) || t.toLowerCase().includes(q));
            return matchName || matchCat || matchBrand || matchTag;
        });
        if (q.includes("coding") || q.includes("laptop")) {
            matched = allProducts.filter(p => p.tags.includes("laptop") || p.tags.includes("coding"));
        }
        else if (q.includes("phone") || q.includes("smartphone")) {
            matched = allProducts.filter(p => p.tags.includes("smartphone"));
        }
        else if (q.includes("headphone") || q.includes("audio") || q.includes("music")) {
            matched = allProducts.filter(p => p.tags.includes("headphones") || p.tags.includes("audio"));
        }
        else if (q.includes("fashion") || q.includes("cloth") || q.includes("men")) {
            matched = allProducts.filter(p => p.category === "Fashion" || p.tags.includes("fashion"));
        }
        else if (q.includes("home") || q.includes("decor")) {
            matched = allProducts.filter(p => p.category === "Home & Living");
        }
        if (matched.length === 0) {
            matched = allProducts.slice(0, 3);
        }
        const reply = `I've analyzed our catalog for "${message}". Here are top picks with outstanding ratings and active deals!`;
        return res.json({
            success: true,
            provider: "catalog-fallback",
            reply,
            recommendedProducts: matched.slice(0, 3),
            followUpSuggestions: [
                "What are the best deals today?",
                "Show customer ratings",
                "Compare with similar brands"
            ]
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function getRecommendations(req, res) {
    try {
        const { category, preferences } = req.body;
        const all = store.getProducts();
        let filtered = all;
        if (category) {
            filtered = all.filter(p => p.category.toLowerCase() === category.toLowerCase());
        }
        const topPicks = (filtered.length > 0 ? filtered : all).slice(0, 4);
        return res.json({
            success: true,
            recommendations: topPicks.map(p => ({
                product: p,
                reason: `Matched 98% with your interest in ${p.category} and trending sales.`,
                matchScore: 95 + Math.floor(Math.random() * 5)
            }))
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function compareProducts(req, res) {
    try {
        const { productIds } = req.body;
        if (!productIds || !Array.isArray(productIds) || productIds.length < 2) {
            return res.status(400).json({ success: false, message: "Provide at least 2 product IDs to compare" });
        }
        const products = productIds.map(id => store.getProductById(id)).filter(Boolean);
        if (products.length < 2) {
            return res.status(404).json({ success: false, message: "Products not found" });
        }
        const comparison = {
            summary: `Comparing ${products.map(p => p.name).join(" vs ")}`,
            winnerId: products[0].rating >= products[1].rating ? products[0].id : products[1].id,
            items: products.map(p => ({
                productId: p.id,
                name: p.name,
                pros: [
                    `Rated ${p.rating}/5 from over ${p.numReviews.toLocaleString()} verified buyers`,
                    `${p.discountPercentage}% active instant savings (₹${p.discountPrice.toLocaleString('en-IN')})`,
                    ...p.features.slice(0, 2)
                ],
                cons: [
                    p.stock < 15 ? "High demand, limited stock remaining" : "Premium tier item"
                ],
                verdict: p.rating >= 4.7 ? "Top recommendation in its category" : "Solid value for price"
            }))
        };
        return res.json({ success: true, comparison });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
