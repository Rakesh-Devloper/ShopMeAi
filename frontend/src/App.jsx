import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { AppRoutes } from "./routes/AppRoutes";
// Slide-over Drawers & Modals
import { AIAssistantDrawer } from "./components/ai/AIAssistantDrawer";
import { CartDrawer } from "./components/cart/CartDrawer";
import { ProductDetailsModal } from "./components/products/ProductDetailsModal";
import { CheckoutModal } from "./components/checkout/CheckoutModal";
import { OrderTrackingModal } from "./components/orders/OrderTrackingModal";
import { AdminDashboardModal } from "./components/admin/AdminDashboardModal";
import { AuthModal } from "./components/auth/AuthModal";
import { Sparkles } from "lucide-react";
const MainLayout = () => {
    const { toast, openAIAssistantWithPrompt } = useApp();
    return (_jsxs("div", { className: "min-h-screen bg-[#F8F9FC] dark:bg-[#0A0D14] text-gray-900 dark:text-gray-100 flex flex-col font-sans transition-colors duration-200 selection:bg-[#4F6EF7] selection:text-white", children: [_jsx(ScrollToTop, {}), _jsx(Navbar, {}), _jsx("main", { className: "flex-1", children: _jsx(AppRoutes, {}) }), _jsx(Footer, {}), _jsxs("button", { onClick: () => openAIAssistantWithPrompt("Help me find the best deals today"), className: "fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-[#4F6EF7] via-[#8B5CF6] to-[#EC4899] text-white font-bold text-xs sm:text-sm shadow-2xl shadow-purple-500/30 flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform cursor-pointer group", title: "Open AI Shopping Assistant", children: [_jsx(Sparkles, { className: "w-4 h-4 group-hover:rotate-12 transition-transform" }), _jsx("span", { className: "hidden sm:inline", children: "Ask ShopMe" })] }), _jsx(AIAssistantDrawer, {}), _jsx(CartDrawer, {}), _jsx(ProductDetailsModal, {}), _jsx(CheckoutModal, {}), _jsx(OrderTrackingModal, {}), _jsx(AdminDashboardModal, {}), _jsx(AuthModal, {}), toast && (_jsx("div", { className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-[#111827] dark:bg-white text-white dark:text-[#111827] text-xs sm:text-sm font-semibold shadow-2xl border border-white/10 dark:border-black/10 animate-in fade-in slide-in-from-bottom-2 duration-150", children: toast }))] }));
};
export default function App() {
    return (_jsx(BrowserRouter, { children: _jsx(AppProvider, { children: _jsx(MainLayout, {}) }) }));
}
