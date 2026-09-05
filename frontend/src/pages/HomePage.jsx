import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { HeroSection } from "../components/home/HeroSection";
import { CategorySection } from "../components/home/CategorySection";
import { AIPicks } from "../components/home/AIPicks";
import { TrendingProducts } from "../components/home/TrendingProducts";
import { PromotionalBanners } from "../components/home/PromotionalBanners";
export const HomePage = () => {
    return (_jsxs("div", { className: "space-y-4", children: [_jsx(HeroSection, {}), _jsx(CategorySection, {}), _jsx(AIPicks, {}), _jsx(TrendingProducts, {}), _jsx(PromotionalBanners, {})] }));
};
