import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { orderService } from "../services/orderService";
import { ArrowLeft, Truck, Clock, MapPin, CreditCard } from "lucide-react";
export const OrderDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { myOrders } = useApp();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        if (!id)
            return;
        // Check existing orders from context first
        const cached = myOrders.find(o => o.id === id || o.orderNumber === id);
        if (cached) {
            setOrder(cached);
            setLoading(false);
        }
        else {
            setLoading(true);
            orderService
                .getOrderById(id)
                .then(res => {
                if (res.order) {
                    setOrder(res.order);
                }
            })
                .catch(err => console.error("Error fetching order details:", err))
                .finally(() => setLoading(false));
        }
    }, [id, myOrders]);
    if (loading) {
        return (_jsxs("div", { className: "max-w-xl mx-auto px-4 py-24 text-center", children: [_jsx("div", { className: "w-10 h-10 border-3 border-[#4F6EF7] border-t-transparent rounded-full animate-spin mx-auto mb-3" }), _jsx("p", { className: "text-xs font-semibold text-gray-400", children: "Loading order details..." })] }));
    }
    if (!order) {
        return (_jsxs("div", { className: "max-w-md mx-auto px-4 py-20 text-center space-y-4", children: [_jsx("h2", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "Order Not Found" }), _jsx("p", { className: "text-sm text-gray-500", children: "We could not find an order with this identifier." }), _jsx("button", { onClick: () => navigate("/orders"), className: "px-6 py-2.5 rounded-full bg-[#4F6EF7] text-white font-bold text-xs", children: "Back to Orders" })] }));
    }
    return (_jsxs("div", { className: "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4", children: [_jsxs("button", { onClick: () => navigate("/orders"), className: "flex items-center gap-2 text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-[#4F6EF7] transition-colors cursor-pointer", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), _jsx("span", { children: "Back to All Orders" })] }), _jsxs("button", { onClick: () => navigate(`/track-order?id=${order.orderNumber}`), className: "flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#4F6EF7] text-white text-xs font-bold shadow-md hover:bg-indigo-600 transition-colors cursor-pointer", children: [_jsx(Truck, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Live Tracking" })] })] }), _jsxs("div", { className: "p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#151824] border border-gray-100 dark:border-gray-800/80 shadow-sm space-y-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("h1", { className: "text-xl sm:text-2xl font-black text-gray-900 dark:text-white font-mono", children: ["Order #", order.orderNumber] }), _jsx("span", { className: "px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-[#4F6EF7] border border-indigo-200 dark:border-indigo-800", children: order.status })] }), _jsxs("p", { className: "text-xs text-gray-400 mt-1", children: ["Placed on ", new Date(order.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })] })] }), _jsxs("div", { className: "text-left sm:text-right", children: [_jsx("span", { className: "text-xs text-gray-400", children: "Total Paid" }), _jsxs("p", { className: "text-2xl font-black text-[#4F6EF7]", children: ["\u20B9", order.totalAmount.toLocaleString()] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("h3", { className: "text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2", children: [_jsx(Clock, { className: "w-4 h-4 text-[#4F6EF7]" }), _jsx("span", { children: "Shipment Timeline" })] }), _jsx("div", { className: "relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-800", children: order.trackingSteps.map((step, idx) => (_jsxs("div", { className: "relative flex items-start gap-4", children: [_jsx("div", { className: `absolute -left-6 top-0 w-4 h-4 rounded-full border-2 flex items-center justify-center ${step.completed
                                                ? "bg-[#4F6EF7] border-[#4F6EF7] text-white ring-4 ring-indigo-500/10"
                                                : step.current
                                                    ? "bg-white dark:bg-gray-900 border-[#4F6EF7] ring-4 ring-[#4F6EF7]/20"
                                                    : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700"}` }), _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [_jsx("h4", { className: `text-xs font-bold ${step.completed || step.current ? "text-gray-900 dark:text-white" : "text-gray-400"}`, children: step.title }), _jsx("span", { className: "text-[10px] text-gray-400", children: step.timestamp })] }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-0.5", children: step.description })] })] }, idx))) })] }), _jsxs("div", { className: "space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800", children: [_jsxs("h3", { className: "text-sm font-bold text-gray-900 dark:text-white", children: ["Items in this Order (", order.items.length, ")"] }), _jsx("div", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: order.items.map((item, idx) => (_jsxs("div", { className: "py-3 flex items-center justify-between gap-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("img", { src: item.image, alt: item.name, className: "w-12 h-12 rounded-xl object-contain bg-gray-50 dark:bg-gray-800 p-1 border border-gray-100 dark:border-gray-700" }), _jsxs("div", { children: [_jsx(Link, { to: `/products/${item.productId}`, className: "text-xs sm:text-sm font-bold text-gray-900 dark:text-white hover:text-[#4F6EF7] transition-colors line-clamp-1", children: item.name }), _jsxs("p", { className: "text-[11px] text-gray-400", children: ["Qty: ", item.quantity, " \u2022 Brand: ", item.brand] })] })] }), _jsxs("span", { className: "text-xs sm:text-sm font-bold text-gray-900 dark:text-white", children: ["\u20B9", (item.price * item.quantity).toLocaleString()] })] }, idx))) })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs", children: [_jsxs("div", { className: "p-4 rounded-2xl bg-gray-50 dark:bg-[#1A1C2E] space-y-2", children: [_jsxs("h4", { className: "font-bold text-gray-900 dark:text-white flex items-center gap-1.5", children: [_jsx(MapPin, { className: "w-3.5 h-3.5 text-[#4F6EF7]" }), _jsx("span", { children: "Shipping Address" })] }), _jsx("p", { className: "font-semibold text-gray-800 dark:text-gray-200", children: order.shippingAddress.fullName }), _jsx("p", { className: "text-gray-500 dark:text-gray-400", children: order.shippingAddress.street }), _jsxs("p", { className: "text-gray-500 dark:text-gray-400", children: [order.shippingAddress.city, ", ", order.shippingAddress.state, " - ", order.shippingAddress.zipCode] }), _jsxs("p", { className: "text-gray-500 dark:text-gray-400", children: ["Phone: ", order.shippingAddress.phone] })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-gray-50 dark:bg-[#1A1C2E] space-y-2", children: [_jsxs("h4", { className: "font-bold text-gray-900 dark:text-white flex items-center gap-1.5", children: [_jsx(CreditCard, { className: "w-3.5 h-3.5 text-[#4F6EF7]" }), _jsx("span", { children: "Payment Details" })] }), _jsxs("div", { className: "flex justify-between text-gray-600 dark:text-gray-400", children: [_jsx("span", { children: "Method:" }), _jsx("span", { className: "font-bold capitalize", children: order.paymentMethod })] }), _jsxs("div", { className: "flex justify-between text-gray-600 dark:text-gray-400", children: [_jsx("span", { children: "Payment Status:" }), _jsx("span", { className: "font-bold text-emerald-600 dark:text-emerald-400 capitalize", children: order.paymentStatus })] }), _jsxs("div", { className: "flex justify-between text-gray-600 dark:text-gray-400", children: [_jsx("span", { children: "Delivery Method:" }), _jsx("span", { className: "font-bold", children: order.deliveryMethod })] })] })] })] })] }));
};
