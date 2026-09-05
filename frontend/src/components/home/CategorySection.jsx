import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Headphones, Shirt, Armchair, Sparkles, Footprints, BookOpen, Gamepad2, ShoppingCart, Car, LayoutGrid } from "lucide-react";
import { useApp } from "../../context/AppContext";
export const CategorySection = () => {
    const { selectedCategory, setSelectedCategory } = useApp();
    const categories = [
        { id: "electronics", name: "Electronics", slug: "electronics", icon: Headphones, bg: "bg-[#F3E8FF] dark:bg-[#2B1B48] text-[#9333EA] dark:text-[#C084FC]" },
        { id: "fashion", name: "Fashion", slug: "fashion", icon: Shirt, bg: "bg-[#FCE7F3] dark:bg-[#3D1D2D] text-[#DB2777] dark:text-[#F472B6]" },
        { id: "home-living", name: "Home & Living", slug: "home-living", icon: Armchair, bg: "bg-[#CCFBF1] dark:bg-[#133230] text-[#0D9488] dark:text-[#2DD4BF]" },
        { id: "beauty", name: "Beauty", slug: "beauty", icon: Sparkles, bg: "bg-[#FFE4E6] dark:bg-[#3B1A22] text-[#E11D48] dark:text-[#FB7185]" },
        { id: "sports", name: "Sports", slug: "sports", icon: Footprints, bg: "bg-[#E0F2FE] dark:bg-[#142A3E] text-[#0284C7] dark:text-[#38BDF8]" },
        { id: "books", name: "Books", slug: "books", icon: BookOpen, bg: "bg-[#FEF3C7] dark:bg-[#382C13] text-[#D97706] dark:text-[#FBBF24]" },
        { id: "toys-games", name: "Toys & Games", slug: "toys-games", icon: Gamepad2, bg: "bg-[#EDE9FE] dark:bg-[#271F47] text-[#7C3AED] dark:text-[#A78BFA]" },
        { id: "groceries", name: "Groceries", slug: "groceries", icon: ShoppingCart, bg: "bg-[#DCFCE7] dark:bg-[#143322] text-[#16A34A] dark:text-[#4ADE80]" },
        { id: "automotive", name: "Automotive", slug: "automotive", icon: Car, bg: "bg-[#FFEDD5] dark:bg-[#3B2513] text-[#EA580C] dark:text-[#FB923C]" },
        { id: "more", name: "More", slug: "all", icon: LayoutGrid, bg: "bg-[#E0E7FF] dark:bg-[#1C2344] text-[#4F46E5] dark:text-[#818CF8]" }
    ];
    return (_jsx("section", { className: "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4", children: _jsx("div", { className: "overflow-x-auto no-scrollbar pb-2", children: _jsx("div", { className: "flex items-center justify-between min-w-[760px] lg:min-w-full gap-3 sm:gap-4", children: categories.map(cat => {
                    const Icon = cat.icon;
                    const isSelected = selectedCategory === cat.slug;
                    return (_jsxs("button", { onClick: () => {
                            setSelectedCategory(cat.slug);
                            // Scroll slightly to trending section
                            const el = document.getElementById("trending-section");
                            el?.scrollIntoView({ behavior: "smooth" });
                        }, className: "group flex flex-col items-center gap-2 cursor-pointer focus:outline-none transition-transform duration-200 hover:-translate-y-1", children: [_jsx("div", { className: `w-14 h-14 sm:w-16 sm:h-16 rounded-full ${cat.bg} flex items-center justify-center transition-all duration-200 group-hover:shadow-md ${isSelected ? "ring-2 ring-offset-2 ring-[#4F6EF7] dark:ring-offset-[#0F1117] scale-105" : ""}`, children: _jsx(Icon, { className: "w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8] transition-transform duration-200 group-hover:scale-110" }) }), _jsx("span", { className: `text-xs font-semibold tracking-tight transition-colors ${isSelected
                                    ? "text-[#4F6EF7] dark:text-[#818CF8] font-bold"
                                    : "text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"}`, children: cat.name })] }, cat.id));
                }) }) }) }));
};
