import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { X, RotateCcw, Star, Check, Tag, DollarSign, Layers, SlidersHorizontal } from "lucide-react";
import { useApp } from "../../context/AppContext";
export const ProductFilterSidebar = ({ isMobileDrawer = false, onCloseMobile }) => {
    const { products, categories, selectedCategory, setSelectedCategory, priceRange, setPriceRange, minRating, setMinRating, inStockOnly, setInStockOnly, onSaleOnly, setOnSaleOnly, resetAllFilters, activeFilterCount, sortBy, setSortBy } = useApp();
    // Custom price input state
    const [customMin, setCustomMin] = useState(priceRange.min > 0 ? priceRange.min.toString() : "");
    const [customMax, setCustomMax] = useState(priceRange.max !== null ? priceRange.max.toString() : "");
    // Quick price presets
    const pricePresets = [
        { label: "All Prices", min: 0, max: null },
        { label: "Under ₹2,000", min: 0, max: 2000 },
        { label: "₹2,000 - ₹10,000", min: 2000, max: 10000 },
        { label: "₹10,000 - ₹50,000", min: 10000, max: 50000 },
        { label: "Above ₹50,000", min: 50000, max: null }
    ];
    const ratingOptions = [
        { value: 4.5, label: "4.5 & up" },
        { value: 4.0, label: "4.0 & up" },
        { value: 3.5, label: "3.5 & up" },
        { value: 3.0, label: "3.0 & up" },
        { value: 0, label: "All Ratings" }
    ];
    const handleApplyCustomPrice = (e) => {
        e.preventDefault();
        const min = customMin.trim() ? Math.max(0, Number(customMin)) : 0;
        const max = customMax.trim() ? Math.max(min, Number(customMax)) : null;
        setPriceRange({ min, max });
    };
    const getCategoryCount = (slug) => {
        if (slug === "all")
            return products.length;
        return products.filter(p => p.category.toLowerCase() === slug.toLowerCase()).length;
    };
    // Base list of categories
    const categoryList = [
        { id: "all", name: "All Products", slug: "all", icon: "✨" },
        ...(categories.length > 0
            ? categories.filter(c => c.slug !== "more")
            : [
                { id: "cat-1", name: "Electronics", slug: "electronics", icon: "📱" },
                { id: "cat-2", name: "Fashion", slug: "fashion", icon: "👗" },
                { id: "cat-3", name: "Home & Living", slug: "home-living", icon: "🛋️" },
                { id: "cat-4", name: "Beauty", slug: "beauty", icon: "✨" },
                { id: "cat-5", name: "Sports", slug: "sports", icon: "⚡" },
                { id: "cat-6", name: "Books", slug: "books", icon: "📚" }
            ])
    ];
    const isCurrentPreset = (preset) => {
        return priceRange.min === preset.min && priceRange.max === preset.max;
    };
    const content = (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(SlidersHorizontal, { className: "w-4 h-4 text-[#4F6EF7]" }), _jsx("h3", { className: "text-sm font-extrabold text-gray-900 dark:text-white uppercase tracking-wider", children: "Filters" }), activeFilterCount > 0 && (_jsx("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-black bg-[#4F6EF7] text-white", children: activeFilterCount }))] }), activeFilterCount > 0 && (_jsxs("button", { onClick: () => {
                            resetAllFilters();
                            setCustomMin("");
                            setCustomMax("");
                        }, className: "inline-flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors cursor-pointer", children: [_jsx(RotateCcw, { className: "w-3 h-3" }), _jsx("span", { children: "Reset" })] })), isMobileDrawer && onCloseMobile && (_jsx("button", { onClick: onCloseMobile, className: "p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200", children: _jsx(X, { className: "w-5 h-5" }) }))] }), _jsxs("div", { className: "space-y-2.5", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-1.5", children: [_jsx(Layers, { className: "w-3.5 h-3.5 text-[#4F6EF7]" }), "Category"] }), selectedCategory !== "all" && (_jsx("button", { onClick: () => setSelectedCategory("all"), className: "text-[11px] text-[#4F6EF7] font-semibold hover:underline cursor-pointer", children: "Clear" }))] }), _jsx("div", { className: "space-y-1 max-h-56 overflow-y-auto pr-1", children: categoryList.map(cat => {
                            const isSelected = selectedCategory.toLowerCase() === cat.slug.toLowerCase();
                            const count = getCategoryCount(cat.slug);
                            return (_jsxs("button", { onClick: () => setSelectedCategory(cat.slug), className: `w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${isSelected
                                    ? "bg-[#4F6EF7] text-white shadow-sm font-bold"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/60"}`, children: [_jsxs("div", { className: "flex items-center gap-2 truncate", children: [_jsx("span", { className: "text-sm shrink-0", children: cat.icon }), _jsx("span", { className: "truncate", children: cat.name })] }), _jsx("span", { className: `text-[10px] px-1.5 py-0.5 rounded-full font-bold shrink-0 ml-1 ${isSelected
                                            ? "bg-white/25 text-white"
                                            : "bg-gray-100 dark:bg-gray-800 text-gray-400"}`, children: count })] }, cat.id || cat.slug));
                        }) })] }), _jsxs("div", { className: "space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-1.5", children: [_jsx(DollarSign, { className: "w-3.5 h-3.5 text-emerald-500" }), "Price Range"] }), (priceRange.min > 0 || priceRange.max !== null) && (_jsx("button", { onClick: () => {
                                    setPriceRange({ min: 0, max: null });
                                    setCustomMin("");
                                    setCustomMax("");
                                }, className: "text-[11px] text-[#4F6EF7] font-semibold hover:underline cursor-pointer", children: "Clear" }))] }), _jsx("div", { className: "flex flex-wrap gap-1.5", children: pricePresets.map(preset => {
                            const active = isCurrentPreset(preset);
                            return (_jsx("button", { onClick: () => {
                                    setPriceRange({ min: preset.min, max: preset.max });
                                    setCustomMin(preset.min > 0 ? preset.min.toString() : "");
                                    setCustomMax(preset.max !== null ? preset.max.toString() : "");
                                }, className: `px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer ${active
                                    ? "bg-emerald-500 text-white font-bold shadow-xs"
                                    : "bg-gray-100 dark:bg-gray-800/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"}`, children: preset.label }, preset.label));
                        }) }), _jsxs("form", { onSubmit: handleApplyCustomPrice, className: "space-y-2 pt-1", children: [_jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold", children: "\u20B9" }), _jsx("input", { type: "number", min: "0", placeholder: "Min", value: customMin, onChange: e => setCustomMin(e.target.value), className: "w-full pl-6 pr-2 py-1.5 bg-gray-50 dark:bg-[#1C1E32] border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold", children: "\u20B9" }), _jsx("input", { type: "number", min: "0", placeholder: "Max", value: customMax, onChange: e => setCustomMax(e.target.value), className: "w-full pl-6 pr-2 py-1.5 bg-gray-50 dark:bg-[#1C1E32] border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] })] }), _jsx("button", { type: "submit", className: "w-full py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-[#4F6EF7] hover:text-white text-gray-700 dark:text-gray-200 text-xs font-bold transition-colors cursor-pointer", children: "Apply Price" })] })] }), _jsxs("div", { className: "space-y-2.5 pt-3 border-t border-gray-100 dark:border-gray-800", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-1.5", children: [_jsx(Star, { className: "w-3.5 h-3.5 fill-[#FBBF24] text-[#FBBF24]" }), "Customer Rating"] }), minRating > 0 && (_jsx("button", { onClick: () => setMinRating(0), className: "text-[11px] text-[#4F6EF7] font-semibold hover:underline cursor-pointer", children: "Clear" }))] }), _jsx("div", { className: "space-y-1", children: ratingOptions.map(opt => {
                            const isSelected = minRating === opt.value;
                            return (_jsxs("button", { onClick: () => setMinRating(opt.value), className: `w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isSelected
                                    ? "bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/60 font-bold"
                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/80 dark:hover:bg-gray-800/60"}`, children: [_jsx("div", { className: "flex items-center gap-1.5", children: opt.value > 0 ? (_jsxs("div", { className: "flex items-center", children: [[1, 2, 3, 4, 5].map(starIndex => (_jsx(Star, { className: `w-3.5 h-3.5 ${starIndex <= Math.floor(opt.value)
                                                        ? "fill-[#FBBF24] text-[#FBBF24]"
                                                        : starIndex - 0.5 <= opt.value
                                                            ? "fill-[#FBBF24]/60 text-[#FBBF24]"
                                                            : "text-gray-300 dark:text-gray-600"}` }, starIndex))), _jsx("span", { className: "ml-1.5 text-xs font-semibold", children: opt.label })] })) : (_jsx("span", { children: opt.label })) }), isSelected && (_jsx(Check, { className: "w-3.5 h-3.5 text-amber-600 dark:text-amber-400" }))] }, opt.value));
                        }) })] }), _jsxs("div", { className: "space-y-2 pt-3 border-t border-gray-100 dark:border-gray-800", children: [_jsxs("span", { className: "text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-1.5", children: [_jsx(Tag, { className: "w-3.5 h-3.5 text-purple-500" }), "Availability & Deals"] }), _jsxs("label", { className: "flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors", children: [_jsx("span", { className: "text-xs font-semibold text-gray-700 dark:text-gray-300", children: "In Stock Only" }), _jsx("input", { type: "checkbox", checked: inStockOnly, onChange: e => setInStockOnly(e.target.checked), className: "w-4 h-4 rounded text-[#4F6EF7] focus:ring-[#4F6EF7] dark:bg-gray-700 border-gray-300 dark:border-gray-600" })] }), _jsxs("label", { className: "flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors", children: [_jsxs("span", { className: "text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5", children: [_jsx("span", { children: "On Sale / Deals" }), _jsx("span", { className: "px-1.5 py-0.2 rounded-md bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 text-[10px] font-bold", children: "%" })] }), _jsx("input", { type: "checkbox", checked: onSaleOnly, onChange: e => setOnSaleOnly(e.target.checked), className: "w-4 h-4 rounded text-[#4F6EF7] focus:ring-[#4F6EF7] dark:bg-gray-700 border-gray-300 dark:border-gray-600" })] })] }), isMobileDrawer && onCloseMobile && (_jsx("div", { className: "pt-4 border-t border-gray-100 dark:border-gray-800", children: _jsx("button", { onClick: onCloseMobile, className: "w-full py-3 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-xl font-bold text-xs hover:bg-black transition-colors", children: "Show Results" }) }))] }));
    // If in mobile drawer mode
    if (isMobileDrawer) {
        return (_jsxs("div", { className: "fixed inset-0 z-50 overflow-y-auto flex", children: [_jsx("div", { onClick: onCloseMobile, className: "fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity" }), _jsx("div", { className: "relative ml-auto w-full max-w-xs bg-white dark:bg-[#151728] h-full shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between", children: content })] }));
    }
    // Desktop sticky sidebar container
    return (_jsx("aside", { className: "w-64 shrink-0 bg-white dark:bg-[#161828] rounded-[24px] p-5 border border-gray-100 dark:border-gray-800 shadow-xs self-start sticky top-24", children: content }));
};
