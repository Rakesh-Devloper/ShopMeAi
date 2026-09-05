import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
export const PromotionalBanners = () => {
    const { setSelectedCategory } = useApp();
    const banners = [
        {
            id: "b-1",
            category: "electronics",
            title: "Upgrade Your Tech",
            subtitle: "Smarter Solutions, Better Living",
            btnText: "Shop Electronics",
            bg: "bg-[#F3E8FF] dark:bg-[#251838]",
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "b-2",
            category: "fashion",
            title: "Fashion for Every You",
            subtitle: "Trendy Styles, Unbeatable Prices",
            btnText: "Shop Fashion",
            bg: "bg-[#FFE4E6] dark:bg-[#331722]",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "b-3",
            category: "home-living",
            title: "Make Home More You",
            subtitle: "Modern Essentials for Modern Homes",
            btnText: "Shop Home",
            bg: "bg-[#CCFBF1] dark:bg-[#122B29]",
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop&q=80"
        },
        {
            id: "b-4",
            category: "beauty",
            title: "Self Care Looks Good On You",
            subtitle: "Premium Beauty & Wellness",
            btnText: "Shop Beauty",
            bg: "bg-[#FCE7F3] dark:bg-[#301625]",
            image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&auto=format&fit=crop&q=80"
        }
    ];
    return (_jsx("section", { className: "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6", children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: banners.map(banner => (_jsxs("div", { className: `relative overflow-hidden rounded-[24px] ${banner.bg} p-5 sm:p-6 flex flex-col justify-between min-h-[220px] shadow-sm border border-black/5 dark:border-white/5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group`, children: [_jsxs("div", { className: "absolute right-0 bottom-0 w-36 h-36 sm:w-40 sm:h-40 overflow-hidden pointer-events-none", children: [_jsx("img", { src: banner.image, alt: banner.title, className: "w-full h-full object-cover rounded-tl-3xl opacity-80 dark:opacity-60 transition-transform duration-500 group-hover:scale-110" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/10" })] }), _jsxs("div", { className: "relative z-10 max-w-[65%] space-y-1.5", children: [_jsx("h3", { className: "text-base sm:text-lg font-extrabold text-gray-900 dark:text-white leading-tight", children: banner.title }), _jsx("p", { className: "text-xs text-gray-600 dark:text-gray-300 line-clamp-2", children: banner.subtitle })] }), _jsx("div", { className: "relative z-10 pt-4", children: _jsxs("button", { onClick: () => {
                                setSelectedCategory(banner.category);
                                const el = document.getElementById("trending-section");
                                el?.scrollIntoView({ behavior: "smooth" });
                            }, className: "inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs font-bold shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95 cursor-pointer", children: [_jsx("span", { children: banner.btnText }), _jsx(ArrowRight, { className: "w-3.5 h-3.5" })] }) })] }, banner.id))) }) }));
};
