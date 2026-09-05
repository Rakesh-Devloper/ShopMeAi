import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { X, Search, Package, CheckCircle2, Truck, MapPin, RotateCcw } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatPrice } from "../../utils/formatPrice";
export const OrderTrackingModal = () => {
    const { isOrderTrackingOpen, setIsOrderTrackingOpen, trackingOrderNumber, showToast } = useApp();
    const [orderIdInput, setOrderIdInput] = useState(trackingOrderNumber || "SAI-2026-98214");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchTracking = async (numberToTrack) => {
        if (!numberToTrack.trim())
            return;
        setLoading(true);
        try {
            const res = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(numberToTrack.trim())}`);
            const data = await res.json();
            if (data.order) {
                setOrder(data.order);
            }
            else {
                showToast("Order not found with that number.");
            }
        }
        catch {
            showToast("Error tracking order. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (isOrderTrackingOpen && trackingOrderNumber) {
            setOrderIdInput(trackingOrderNumber);
            fetchTracking(trackingOrderNumber);
        }
    }, [isOrderTrackingOpen, trackingOrderNumber]);
    if (!isOrderTrackingOpen)
        return null;
    const steps = [
        { key: "pending", label: "Order Placed", desc: "We received your order" },
        { key: "processing", label: "Packed", desc: "Item verified by AI quality check" },
        { key: "shipped", label: "Shipped", desc: "In transit with BlueDart Air" },
        { key: "delivered", label: "Delivered", desc: "Handed over at doorstep" }
    ];
    const getStepStatus = (currentStatus, stepIndex) => {
        const statusOrder = {
            pending: 0,
            processing: 1,
            shipped: 2,
            delivered: 3,
            cancelled: -1
        };
        const currentIdx = statusOrder[currentStatus] ?? 1;
        if (currentIdx > stepIndex)
            return "completed";
        if (currentIdx === stepIndex)
            return "current";
        return "upcoming";
    };
    return (_jsxs("div", { className: "fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6", children: [_jsx("div", { onClick: () => setIsOrderTrackingOpen(false), className: "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" }), _jsxs("div", { className: "relative w-full max-w-2xl bg-white dark:bg-[#151728] rounded-[28px] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-10 animate-in zoom-in-95 duration-150", children: [_jsxs("div", { className: "p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-blue-50/50 via-indigo-50/50 to-purple-50/50 dark:from-[#1A1C30] dark:to-[#171626]", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("div", { className: "w-9 h-9 rounded-xl bg-[#4F6EF7] text-white flex items-center justify-center shadow-md", children: _jsx(Truck, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white", children: "Real-Time Order Tracking" }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Live GPS courier updates & delivery progress" })] })] }), _jsx("button", { onClick: () => setIsOrderTrackingOpen(false), className: "p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-white/60 dark:hover:bg-gray-800", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "p-6 sm:p-8 space-y-6", children: [_jsxs("form", { onSubmit: (e) => {
                                    e.preventDefault();
                                    fetchTracking(orderIdInput);
                                }, className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative flex-1", children: [_jsx(Package, { className: "w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" }), _jsx("input", { type: "text", value: orderIdInput, onChange: e => setOrderIdInput(e.target.value), placeholder: "Enter order number (e.g. SAI-2026-98214)...", className: "w-full pl-9 pr-4 py-2.5 bg-gray-50 dark:bg-[#1E2034] border border-gray-200 dark:border-gray-700/80 rounded-full text-xs sm:text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] }), _jsxs("button", { type: "submit", disabled: loading, className: "px-5 py-2.5 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-full text-xs font-bold hover:bg-black transition-colors shrink-0 flex items-center gap-1.5", children: [loading ? (_jsx(RotateCcw, { className: "w-3.5 h-3.5 animate-spin" })) : (_jsx(Search, { className: "w-3.5 h-3.5" })), _jsx("span", { children: "Track" })] })] }), order && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "p-5 rounded-2xl bg-gradient-to-r from-indigo-50/70 to-purple-50/70 dark:from-[#1C1F38] dark:to-[#221A3B] border border-indigo-100 dark:border-indigo-950/80", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [_jsxs("div", { children: [_jsx("span", { className: "text-[11px] font-bold text-[#4F6EF7] uppercase tracking-wider", children: "Live Delivery Status" }), _jsx("h4", { className: "text-xl font-extrabold text-gray-900 dark:text-white capitalize mt-0.5", children: order.status === "shipped" ? "Out for Delivery Today" : order.status })] }), _jsxs("div", { className: "text-right", children: [_jsx("span", { className: "text-[11px] text-gray-400 block", children: "Estimated Arrival" }), _jsx("span", { className: "text-sm font-black text-emerald-600 dark:text-emerald-400", children: order.estimatedDelivery })] })] }), _jsx("div", { className: "mt-6 pt-4 border-t border-indigo-100/80 dark:border-indigo-900/40", children: _jsx("div", { className: "grid grid-cols-4 gap-2 relative", children: steps.map((step, idx) => {
                                                        const state = getStepStatus(order.status, idx);
                                                        return (_jsxs("div", { className: "flex flex-col items-center text-center relative z-10", children: [_jsx("div", { className: `w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${state === "completed"
                                                                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                                                                        : state === "current"
                                                                            ? "bg-[#4F6EF7] text-white ring-4 ring-blue-100 dark:ring-blue-900/40 animate-pulse"
                                                                            : "bg-gray-200 dark:bg-gray-700 text-gray-400"}`, children: state === "completed" ? (_jsx(CheckCircle2, { className: "w-5 h-5" })) : (idx + 1) }), _jsx("span", { className: "text-xs font-bold text-gray-900 dark:text-white mt-2", children: step.label }), _jsx("span", { className: "text-[10px] text-gray-400 hidden sm:block mt-0.5", children: step.desc })] }, step.key));
                                                    }) }) })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs", children: [_jsxs("div", { className: "p-4 rounded-2xl bg-gray-50 dark:bg-[#1E2034] space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2 text-gray-500", children: [_jsx(Truck, { className: "w-4 h-4 text-[#4F6EF7]" }), _jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: "Courier Partner" })] }), _jsxs("p", { className: "text-gray-700 dark:text-gray-300 font-semibold", children: [order.trackingDetails?.carrier, " (Air Express)"] }), _jsxs("p", { className: "text-gray-400 font-mono", children: ["AWB: ", order.trackingDetails?.trackingNumber] })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-gray-50 dark:bg-[#1E2034] space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2 text-gray-500", children: [_jsx(MapPin, { className: "w-4 h-4 text-rose-500" }), _jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: "Destination" })] }), _jsx("p", { className: "text-gray-700 dark:text-gray-300 font-semibold truncate", children: order.shippingAddress.fullName }), _jsxs("p", { className: "text-gray-400 truncate", children: [order.shippingAddress.street, ", ", order.shippingAddress.city, " - ", order.shippingAddress.postalCode] })] })] }), order.trackingDetails?.checkpoints && order.trackingDetails.checkpoints.length > 0 && (_jsxs("div", { className: "space-y-3", children: [_jsx("h4", { className: "text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider", children: "Activity Timeline" }), _jsx("div", { className: "space-y-2.5 pl-2 border-l-2 border-indigo-200 dark:border-indigo-900", children: order.trackingDetails.checkpoints.map((cp, i) => (_jsxs("div", { className: "relative pl-4 text-xs", children: [_jsx("div", { className: "absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-[#4F6EF7] ring-4 ring-white dark:ring-[#151728]" }), _jsx("p", { className: "font-bold text-gray-900 dark:text-white", children: cp.status }), _jsxs("p", { className: "text-gray-400 text-[11px]", children: [cp.location, " \u2022 ", cp.time] })] }, i))) })] })), _jsxs("div", { className: "space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800", children: [_jsxs("h4", { className: "text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider", children: ["Order Items (", order.items.length, ")"] }), _jsx("div", { className: "space-y-2 max-h-40 overflow-y-auto", children: order.items.map(item => (_jsxs("div", { className: "flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-[#1E2034] text-xs", children: [_jsxs("div", { className: "flex items-center gap-2.5", children: [_jsx("img", { src: item.product.images[0], alt: item.product.name, className: "w-10 h-10 object-contain rounded-lg bg-white dark:bg-gray-800 p-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "font-bold text-gray-900 dark:text-white truncate max-w-[220px]", children: item.product.name }), _jsxs("p", { className: "text-gray-400 text-[11px]", children: ["Qty: ", item.quantity] })] })] }), _jsx("span", { className: "font-bold text-gray-900 dark:text-white", children: formatPrice(item.product.discountPrice * item.quantity) })] }, item.product.id))) })] })] }))] })] })] }));
};
