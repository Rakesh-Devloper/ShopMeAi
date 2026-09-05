import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect } from "react";
import { ArrowUpDown, Check, ChevronDown, Sparkles, ArrowUpNarrowWide, ArrowDownWideNarrow, Star, Percent, Clock } from "lucide-react";
import { useApp } from "../../context/AppContext";
export const SORT_OPTIONS = [
    {
        id: "featured",
        label: "Featured & Popular",
        icon: Sparkles,
        shortLabel: "Featured"
    },
    {
        id: "price-asc",
        label: "Price: Low to High",
        icon: ArrowUpNarrowWide,
        shortLabel: "Price ↑"
    },
    {
        id: "price-desc",
        label: "Price: High to Low",
        icon: ArrowDownWideNarrow,
        shortLabel: "Price ↓"
    },
    {
        id: "rating-desc",
        label: "Highest Customer Rating",
        icon: Star,
        shortLabel: "Top Rated"
    },
    {
        id: "discount-desc",
        label: "Biggest Discount (% Off)",
        icon: Percent,
        shortLabel: "Best Deals"
    },
    {
        id: "newest",
        label: "Newest Arrivals",
        icon: Clock,
        shortLabel: "Newest"
    }
];
export const ProductSortDropdown = () => {
    const { sortBy, setSortBy } = useApp();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const currentOption = SORT_OPTIONS.find(opt => opt.id === sortBy) || SORT_OPTIONS[0];
    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (_jsxs("div", { className: "relative inline-block text-left", ref: dropdownRef, children: [_jsxs("button", { id: "product-sort-dropdown-button", type: "button", onClick: () => setIsOpen(prev => !prev), className: `inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${isOpen
                    ? "border-[#4F6EF7] bg-blue-50/70 dark:bg-[#1C2038] text-[#4F6EF7]"
                    : "border-gray-200 dark:border-gray-700/80 bg-white dark:bg-[#161828] text-gray-700 dark:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600 shadow-xs"}`, "aria-haspopup": "true", "aria-expanded": isOpen, children: [_jsx(ArrowUpDown, { className: "w-3.5 h-3.5 text-[#4F6EF7]" }), _jsx("span", { className: "text-gray-400 font-normal hidden sm:inline", children: "Sort:" }), _jsx("span", { className: "font-semibold text-gray-900 dark:text-white", children: currentOption.label }), _jsx(ChevronDown, { className: `w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-[#4F6EF7]" : ""}` })] }), isOpen && (_jsxs("div", { className: "absolute right-0 mt-1.5 w-60 rounded-2xl bg-white dark:bg-[#181A2D] shadow-xl border border-gray-100 dark:border-gray-800 p-1.5 z-30 animate-in fade-in zoom-in-95 duration-100", children: [_jsx("div", { className: "px-2.5 py-1.5 mb-1 border-b border-gray-100 dark:border-gray-800", children: _jsx("span", { className: "text-[10px] font-extrabold uppercase tracking-wider text-gray-400", children: "Sort Catalog By" }) }), _jsx("div", { className: "space-y-0.5", children: SORT_OPTIONS.map(option => {
                            const Icon = option.icon;
                            const isSelected = option.id === sortBy;
                            return (_jsxs("button", { onClick: () => {
                                    setSortBy(option.id);
                                    setIsOpen(false);
                                }, className: `w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${isSelected
                                    ? "bg-[#4F6EF7]/10 text-[#4F6EF7] font-bold"
                                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800/60"}`, children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx(Icon, { className: `w-3.5 h-3.5 ${isSelected ? "text-[#4F6EF7]" : "text-gray-400"}` }), _jsx("span", { children: option.label })] }), isSelected && (_jsx(Check, { className: "w-3.5 h-3.5 text-[#4F6EF7]" }))] }, option.id));
                        }) })] }))] }));
};
