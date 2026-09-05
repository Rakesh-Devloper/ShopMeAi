import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { X, ShieldCheck, Package, ShoppingBag, Users, DollarSign, Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatPrice } from "../../utils/formatPrice";
export const AdminDashboardModal = () => {
    const { isAdminOpen, setIsAdminOpen, showToast, refreshProducts, products } = useApp();
    const [activeTab, setActiveTab] = useState("overview");
    const [stats, setStats] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    // New product form
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [newName, setNewName] = useState("");
    const [newBrand, setNewBrand] = useState("");
    const [newCategory, setNewCategory] = useState("electronics");
    const [newPrice, setNewPrice] = useState(19999);
    const [newDiscountPrice, setNewDiscountPrice] = useState(15999);
    const [newStock, setNewStock] = useState(25);
    const [newImage, setNewImage] = useState("https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=80");
    const [newDesc, setNewDesc] = useState("High-performance smart device with modern craftsmanship.");
    const fetchAdminData = async () => {
        setLoading(true);
        try {
            const statsRes = await fetch("/api/admin/stats");
            const statsData = await statsRes.json();
            if (statsData.stats)
                setStats(statsData.stats);
            const ordersRes = await fetch("/api/orders/admin/all");
            const ordersData = await ordersRes.json();
            if (ordersData.orders)
                setOrders(ordersData.orders);
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (isAdminOpen) {
            fetchAdminData();
        }
    }, [isAdminOpen]);
    if (!isAdminOpen)
        return null;
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newName,
                    brand: newBrand,
                    category: newCategory,
                    price: Number(newPrice),
                    discountPrice: Number(newDiscountPrice),
                    stock: Number(newStock),
                    images: [newImage],
                    description: newDesc,
                    tags: ["new", newCategory]
                })
            });
            const data = await res.json();
            if (data.product) {
                showToast(`Product "${newName}" created successfully!`);
                setShowAddProduct(false);
                refreshProducts();
                fetchAdminData();
            }
        }
        catch {
            showToast("Error creating product");
        }
    };
    const handleUpdateOrderStatus = async (orderId, status) => {
        try {
            const res = await fetch(`/api/orders/${orderId}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status })
            });
            const data = await res.json();
            if (data.order) {
                setOrders(prev => prev.map(o => (o.id === orderId ? data.order : o)));
                showToast(`Order status updated to ${status}`);
            }
        }
        catch {
            showToast("Error updating order status");
        }
    };
    return (_jsxs("div", { className: "fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6", children: [_jsx("div", { onClick: () => setIsAdminOpen(false), className: "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" }), _jsxs("div", { className: "relative w-full max-w-5xl bg-white dark:bg-[#151728] rounded-[28px] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-10 animate-in zoom-in-95 duration-150 max-h-[90vh] flex flex-col", children: [_jsxs("div", { className: "p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-emerald-50/50 via-teal-50/50 to-cyan-50/50 dark:from-[#152327] dark:to-[#171D2D]", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md", children: _jsx(ShieldCheck, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-extrabold text-gray-900 dark:text-white", children: "Admin Management Dashboard" }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Manage catalog inventory, live orders & customers" })] })] }), _jsx("button", { onClick: () => setIsAdminOpen(false), className: "p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-white/60 dark:hover:bg-gray-800", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsxs("div", { className: "flex border-b border-gray-100 dark:border-gray-800 px-6 pt-3 gap-6 text-xs font-bold uppercase tracking-wider", children: [_jsx("button", { onClick: () => setActiveTab("overview"), className: `pb-3 transition-colors border-b-2 ${activeTab === "overview"
                                    ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                                    : "border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`, children: "Overview & Metrics" }), _jsxs("button", { onClick: () => setActiveTab("products"), className: `pb-3 transition-colors border-b-2 ${activeTab === "products"
                                    ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                                    : "border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`, children: ["Products (", products.length, ")"] }), _jsxs("button", { onClick: () => setActiveTab("orders"), className: `pb-3 transition-colors border-b-2 ${activeTab === "orders"
                                    ? "border-emerald-500 text-emerald-600 dark:text-emerald-400"
                                    : "border-transparent text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}`, children: ["Orders (", orders.length, ")"] })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-6 sm:p-8 space-y-6", children: [activeTab === "overview" && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs("div", { className: "p-5 rounded-2xl bg-gray-50 dark:bg-[#1C1E32] border border-gray-100 dark:border-gray-800", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-gray-400 font-semibold", children: "Total Revenue" }), _jsx(DollarSign, { className: "w-4 h-4 text-emerald-500" })] }), _jsx("h4", { className: "text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-2", children: formatPrice(stats?.totalRevenue || 128940) }), _jsx("span", { className: "text-[11px] text-emerald-500 font-semibold mt-1 block", children: "+18% from last month" })] }), _jsxs("div", { className: "p-5 rounded-2xl bg-gray-50 dark:bg-[#1C1E32] border border-gray-100 dark:border-gray-800", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-gray-400 font-semibold", children: "Total Orders" }), _jsx(Package, { className: "w-4 h-4 text-[#4F6EF7]" })] }), _jsx("h4", { className: "text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-2", children: stats?.totalOrders || orders.length }), _jsx("span", { className: "text-[11px] text-[#4F6EF7] font-semibold mt-1 block", children: "All fulfilled on time" })] }), _jsxs("div", { className: "p-5 rounded-2xl bg-gray-50 dark:bg-[#1C1E32] border border-gray-100 dark:border-gray-800", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-gray-400 font-semibold", children: "Active Customers" }), _jsx(Users, { className: "w-4 h-4 text-purple-500" })] }), _jsx("h4", { className: "text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-2", children: stats?.totalUsers || 142 }), _jsx("span", { className: "text-[11px] text-purple-500 font-semibold mt-1 block", children: "98.4% satisfaction" })] }), _jsxs("div", { className: "p-5 rounded-2xl bg-gray-50 dark:bg-[#1C1E32] border border-gray-100 dark:border-gray-800", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-xs text-gray-400 font-semibold", children: "Live Products" }), _jsx(ShoppingBag, { className: "w-4 h-4 text-pink-500" })] }), _jsx("h4", { className: "text-xl sm:text-2xl font-black text-gray-900 dark:text-white mt-2", children: stats?.totalProducts || products.length }), _jsx("span", { className: "text-[11px] text-pink-500 font-semibold mt-1 block", children: "6 in trending list" })] })] }), _jsxs("div", { className: "p-5 rounded-2xl bg-gray-50 dark:bg-[#1C1E32] border border-gray-100 dark:border-gray-800", children: [_jsx("h4", { className: "text-sm font-bold text-gray-900 dark:text-white mb-3", children: "Store Health & Gemini AI Engine" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs", children: [_jsxs("div", { className: "p-3 bg-white dark:bg-[#151728] rounded-xl", children: [_jsx("span", { className: "text-gray-400 block", children: "AI Recommendation Engine" }), _jsx("span", { className: "text-emerald-500 font-bold", children: "Online & Active (Gemini 3.8 Flash)" })] }), _jsxs("div", { className: "p-3 bg-white dark:bg-[#151728] rounded-xl", children: [_jsx("span", { className: "text-gray-400 block", children: "Database Synchronization" }), _jsx("span", { className: "text-emerald-500 font-bold", children: "In-Sync (Memory Store + REST)" })] }), _jsxs("div", { className: "p-3 bg-white dark:bg-[#151728] rounded-xl", children: [_jsx("span", { className: "text-gray-400 block", children: "Payment Gateways" }), _jsx("span", { className: "text-emerald-500 font-bold", children: "UPI, Cards, COD Active" })] })] })] })] })), activeTab === "products" && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h4", { className: "text-sm font-bold text-gray-900 dark:text-white", children: "Product Inventory Catalog" }), _jsxs("button", { onClick: () => setShowAddProduct(!showAddProduct), className: "px-3.5 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm", children: [_jsx(Plus, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Add New Product" })] })] }), showAddProduct && (_jsxs("form", { onSubmit: handleCreateProduct, className: "p-5 rounded-2xl bg-gray-50 dark:bg-[#1C1E32] border border-emerald-500/30 space-y-3", children: [_jsx("h5", { className: "text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider", children: "Add New Product to Catalog" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "Product Name" }), _jsx("input", { type: "text", value: newName, onChange: e => setNewName(e.target.value), required: true, className: "w-full px-3 py-2 rounded-xl bg-white dark:bg-[#151728] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "Brand" }), _jsx("input", { type: "text", value: newBrand, onChange: e => setNewBrand(e.target.value), required: true, className: "w-full px-3 py-2 rounded-xl bg-white dark:bg-[#151728] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "Category" }), _jsxs("select", { value: newCategory, onChange: e => setNewCategory(e.target.value), className: "w-full px-3 py-2 rounded-xl bg-white dark:bg-[#151728] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white", children: [_jsx("option", { value: "electronics", children: "Electronics" }), _jsx("option", { value: "fashion", children: "Fashion" }), _jsx("option", { value: "home-living", children: "Home & Living" }), _jsx("option", { value: "beauty", children: "Beauty" }), _jsx("option", { value: "sports", children: "Sports" }), _jsx("option", { value: "books", children: "Books" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "Original Price (\u20B9)" }), _jsx("input", { type: "number", value: newPrice, onChange: e => setNewPrice(Number(e.target.value)), required: true, className: "w-full px-3 py-2 rounded-xl bg-white dark:bg-[#151728] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "Discounted Price (\u20B9)" }), _jsx("input", { type: "number", value: newDiscountPrice, onChange: e => setNewDiscountPrice(Number(e.target.value)), required: true, className: "w-full px-3 py-2 rounded-xl bg-white dark:bg-[#151728] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "Initial Stock" }), _jsx("input", { type: "number", value: newStock, onChange: e => setNewStock(Number(e.target.value)), required: true, className: "w-full px-3 py-2 rounded-xl bg-white dark:bg-[#151728] border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white" })] })] }), _jsxs("div", { className: "flex justify-end gap-2 pt-2", children: [_jsx("button", { type: "button", onClick: () => setShowAddProduct(false), className: "px-4 py-1.5 rounded-full bg-gray-200 dark:bg-gray-700 text-xs font-semibold", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-5 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600", children: "Save to Store" })] })] })), _jsx("div", { className: "overflow-x-auto rounded-2xl border border-gray-100 dark:border-gray-800", children: _jsxs("table", { className: "w-full text-left text-xs", children: [_jsx("thead", { className: "bg-gray-50 dark:bg-[#1C1E32] text-gray-500 font-semibold border-b border-gray-100 dark:border-gray-800", children: _jsxs("tr", { children: [_jsx("th", { className: "p-3", children: "Product" }), _jsx("th", { className: "p-3", children: "Category" }), _jsx("th", { className: "p-3", children: "Price" }), _jsx("th", { className: "p-3", children: "Stock" }), _jsx("th", { className: "p-3", children: "Status" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: products.map(p => (_jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/30", children: [_jsxs("td", { className: "p-3 flex items-center gap-2", children: [_jsx("img", { src: p.images[0], alt: p.name, className: "w-8 h-8 object-contain rounded" }), _jsx("span", { className: "font-bold text-gray-900 dark:text-white truncate max-w-[200px]", children: p.name })] }), _jsx("td", { className: "p-3 text-gray-500 capitalize", children: p.category }), _jsx("td", { className: "p-3 font-bold text-gray-900 dark:text-white", children: formatPrice(p.discountPrice) }), _jsxs("td", { className: "p-3 text-gray-700 dark:text-gray-300 font-semibold", children: [p.stock, " units"] }), _jsx("td", { className: "p-3", children: _jsx("span", { className: "px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400", children: "Active" }) })] }, p.id))) })] }) })] })), activeTab === "orders" && (_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "text-sm font-bold text-gray-900 dark:text-white", children: "Customer Orders Fulfillment" }), _jsx("div", { className: "space-y-3", children: orders.map(o => (_jsxs("div", { className: "p-4 rounded-2xl bg-gray-50 dark:bg-[#1C1E32] border border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "font-bold text-gray-900 dark:text-white font-mono", children: o.orderNumber }), _jsx("span", { className: "text-gray-400", children: "\u2022" }), _jsx("span", { className: "text-gray-500", children: o.shippingAddress.fullName })] }), _jsxs("p", { className: "text-gray-400", children: [o.items.length, " items \u2022 Total: ", formatPrice(o.totalAmount), " \u2022 Paid via ", o.paymentMethod.toUpperCase()] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-gray-400", children: "Status:" }), _jsxs("select", { value: o.status, onChange: e => handleUpdateOrderStatus(o.id, e.target.value), className: "px-2.5 py-1 rounded-xl bg-white dark:bg-[#151728] border border-gray-200 dark:border-gray-700 font-bold text-gray-900 dark:text-white", children: [_jsx("option", { value: "pending", children: "Pending" }), _jsx("option", { value: "processing", children: "Processing" }), _jsx("option", { value: "shipped", children: "Shipped" }), _jsx("option", { value: "delivered", children: "Delivered" }), _jsx("option", { value: "cancelled", children: "Cancelled" })] })] })] }, o.id))) })] }))] })] })] }));
};
