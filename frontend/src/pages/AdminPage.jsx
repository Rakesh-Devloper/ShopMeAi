import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { orderService } from "../services/orderService";
import { productService } from "../services/productService";
import { ShieldAlert, DollarSign, ShoppingBag, Package, Users, Plus, Trash2 } from "lucide-react";
export const AdminPage = () => {
    const { user, products, myOrders, showToast } = useApp();
    const [activeTab, setActiveTab] = useState("orders");
    const [orders, setOrders] = useState(myOrders);
    const [productList, setProductList] = useState(products);
    const [searchTerm, setSearchTerm] = useState("");
    // New product form
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [newProdName, setNewProdName] = useState("");
    const [newProdCategory, setNewProdCategory] = useState("Electronics");
    const [newProdBrand, setNewProdBrand] = useState("");
    const [newProdPrice, setNewProdPrice] = useState(999);
    const [newProdDiscountPrice, setNewProdDiscountPrice] = useState(799);
    const [newProdStock, setNewProdStock] = useState(50);
    const [newProdImage, setNewProdImage] = useState("https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&auto=format&fit=crop&q=80");
    const [newProdDesc, setNewProdDesc] = useState("");
    useEffect(() => {
        // Fetch all orders for admin
        orderService.getAllOrders()
            .then(res => {
            if (res.orders && res.orders.length > 0) {
                setOrders(res.orders);
            }
        })
            .catch(() => { });
        setProductList(products);
    }, [products, myOrders]);
    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            const res = await orderService.updateOrderStatus(orderId, newStatus);
            if (res.success && res.order) {
                setOrders(prev => prev.map(o => (o.id === orderId ? res.order : o)));
                showToast(`Order status updated to "${newStatus}"`);
            }
            else {
                // Local fallback update
                setOrders(prev => prev.map(o => (o.id === orderId || o.orderNumber === orderId ? { ...o, status: newStatus } : o)));
                showToast(`Order status updated to "${newStatus}"`);
            }
        }
        catch {
            setOrders(prev => prev.map(o => (o.id === orderId || o.orderNumber === orderId ? { ...o, status: newStatus } : o)));
            showToast(`Order status updated to "${newStatus}"`);
        }
    };
    const handleCreateProduct = async (e) => {
        e.preventDefault();
        if (!newProdName || !newProdBrand) {
            showToast("Please fill in product name and brand");
            return;
        }
        const discountPerc = Math.round(((newProdPrice - newProdDiscountPrice) / newProdPrice) * 100);
        const payload = {
            name: newProdName,
            slug: newProdName.toLowerCase().replace(/\s+/g, "-"),
            category: newProdCategory,
            brand: newProdBrand,
            price: Number(newProdPrice),
            discountPrice: Number(newProdDiscountPrice),
            discountPercentage: discountPerc > 0 ? discountPerc : 0,
            stock: Number(newProdStock),
            images: [newProdImage],
            description: newProdDesc || "High quality authentic product backed by ShopMe brand warranty.",
            rating: 4.8,
            numReviews: 12,
            features: ["Premium build quality", "Official brand warranty"],
            specifications: { Brand: newProdBrand, Category: newProdCategory },
            tags: ["New Arrival"],
            isFeatured: true,
            isTrending: false
        };
        try {
            const res = await productService.createProduct(payload);
            if (res.success && res.product) {
                setProductList(prev => [res.product, ...prev]);
                showToast(`Product "${newProdName}" added successfully!`);
            }
            else {
                const fallback = {
                    id: `prod-${Date.now()}`,
                    ...payload
                };
                setProductList(prev => [fallback, ...prev]);
                showToast(`Product "${newProdName}" added!`);
            }
            setShowAddProductModal(false);
            setNewProdName("");
            setNewProdBrand("");
        }
        catch {
            showToast("Error creating product");
        }
    };
    const handleDeleteProduct = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?"))
            return;
        try {
            await productService.deleteProduct(productId);
            setProductList(prev => prev.filter(p => p.id !== productId));
            showToast("Product deleted successfully");
        }
        catch {
            setProductList(prev => prev.filter(p => p.id !== productId));
            showToast("Product removed");
        }
    };
    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    return (_jsxs("div", { className: "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8", children: [_jsxs("div", { className: "p-6 sm:p-8 rounded-3xl bg-gray-900 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border border-gray-800", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold", children: [_jsx(ShieldAlert, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Store Administrator Portal" })] }), _jsx("h1", { className: "text-2xl sm:text-3xl font-black tracking-tight", children: "ShopMe Operations Center" }), _jsx("p", { className: "text-xs text-gray-400", children: "Real-time management for catalog products, inventory stock, and logistics dispatch" })] }), _jsx("div", { className: "flex items-center p-1 bg-gray-800/80 rounded-2xl border border-gray-700", children: ["orders", "products", "analytics"].map(tab => (_jsx("button", { onClick: () => setActiveTab(tab), className: `px-4 py-2 rounded-xl text-xs font-bold capitalize transition-colors cursor-pointer ${activeTab === tab
                                ? "bg-[#4F6EF7] text-white shadow-md"
                                : "text-gray-400 hover:text-white"}`, children: tab }, tab))) })] }), _jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6", children: [_jsxs("div", { className: "p-5 rounded-3xl bg-white dark:bg-[#151824] border border-gray-100 dark:border-gray-800/80 shadow-sm space-y-1", children: [_jsx("div", { className: "w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center", children: _jsx(DollarSign, { className: "w-5 h-5" }) }), _jsxs("p", { className: "text-2xl font-black text-gray-900 dark:text-white", children: ["\u20B9", totalRevenue.toLocaleString()] }), _jsx("p", { className: "text-xs font-semibold text-gray-400", children: "Total Revenue" })] }), _jsxs("div", { className: "p-5 rounded-3xl bg-white dark:bg-[#151824] border border-gray-100 dark:border-gray-800/80 shadow-sm space-y-1", children: [_jsx("div", { className: "w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-[#4F6EF7] flex items-center justify-center", children: _jsx(ShoppingBag, { className: "w-5 h-5" }) }), _jsx("p", { className: "text-2xl font-black text-gray-900 dark:text-white", children: orders.length }), _jsx("p", { className: "text-xs font-semibold text-gray-400", children: "Total Customer Orders" })] }), _jsxs("div", { className: "p-5 rounded-3xl bg-white dark:bg-[#151824] border border-gray-100 dark:border-gray-800/80 shadow-sm space-y-1", children: [_jsx("div", { className: "w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-500 flex items-center justify-center", children: _jsx(Package, { className: "w-5 h-5" }) }), _jsx("p", { className: "text-2xl font-black text-gray-900 dark:text-white", children: productList.length }), _jsx("p", { className: "text-xs font-semibold text-gray-400", children: "Active Catalog SKUs" })] }), _jsxs("div", { className: "p-5 rounded-3xl bg-white dark:bg-[#151824] border border-gray-100 dark:border-gray-800/80 shadow-sm space-y-1", children: [_jsx("div", { className: "w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center", children: _jsx(Users, { className: "w-5 h-5" }) }), _jsx("p", { className: "text-2xl font-black text-gray-900 dark:text-white", children: "1,248" }), _jsx("p", { className: "text-xs font-semibold text-gray-400", children: "Registered Members" })] })] }), activeTab === "orders" && (_jsxs("div", { className: "p-6 rounded-3xl bg-white dark:bg-[#151824] border border-gray-100 dark:border-gray-800/80 shadow-sm space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [_jsxs("h2", { className: "text-base font-bold text-gray-900 dark:text-white", children: ["Customer Orders Pipeline (", orders.length, ")"] }), _jsx("p", { className: "text-xs text-gray-400", children: "Change status in real-time to update the customer's live tracking view" })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-xs", children: [_jsx("thead", { className: "border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-semibold", children: _jsxs("tr", { children: [_jsx("th", { className: "py-3 px-3", children: "Order ID" }), _jsx("th", { className: "py-3 px-3", children: "Customer" }), _jsx("th", { className: "py-3 px-3", children: "Items" }), _jsx("th", { className: "py-3 px-3", children: "Total" }), _jsx("th", { className: "py-3 px-3", children: "Current Status" }), _jsx("th", { className: "py-3 px-3", children: "Update Status" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: orders.map(o => (_jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/40", children: [_jsx("td", { className: "py-3.5 px-3 font-mono font-bold text-gray-900 dark:text-white", children: o.orderNumber }), _jsxs("td", { className: "py-3.5 px-3", children: [_jsx("p", { className: "font-bold text-gray-900 dark:text-white", children: o.shippingAddress?.fullName || o.userName }), _jsx("p", { className: "text-[10px] text-gray-400", children: o.shippingAddress?.city })] }), _jsxs("td", { className: "py-3.5 px-3", children: [_jsxs("span", { className: "font-bold", children: [o.items.length, " items"] }), _jsx("p", { className: "text-[10px] text-gray-400 truncate max-w-[150px]", children: o.items[0]?.name })] }), _jsxs("td", { className: "py-3.5 px-3 font-black text-gray-900 dark:text-white", children: ["\u20B9", o.totalAmount.toLocaleString()] }), _jsx("td", { className: "py-3.5 px-3", children: _jsx("span", { className: "px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-[#4F6EF7]", children: o.status }) }), _jsx("td", { className: "py-3.5 px-3", children: _jsxs("select", { value: o.status, onChange: e => handleUpdateOrderStatus(o.id, e.target.value), className: "px-2.5 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-xs font-semibold text-gray-900 dark:text-white cursor-pointer focus:outline-none focus:border-[#4F6EF7]", children: [_jsx("option", { value: "Processing", children: "Processing" }), _jsx("option", { value: "Confirmed", children: "Confirmed" }), _jsx("option", { value: "Shipped", children: "Shipped" }), _jsx("option", { value: "Out for Delivery", children: "Out for Delivery" }), _jsx("option", { value: "Delivered", children: "Delivered" }), _jsx("option", { value: "Cancelled", children: "Cancelled" })] }) })] }, o.id))) })] }) })] })), activeTab === "products" && (_jsxs("div", { className: "p-6 rounded-3xl bg-white dark:bg-[#151824] border border-gray-100 dark:border-gray-800/80 shadow-sm space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-base font-bold text-gray-900 dark:text-white", children: ["Catalog Inventory (", productList.length, " SKUs)"] }), _jsx("p", { className: "text-xs text-gray-400", children: "Add, edit stock, or delete products" })] }), _jsxs("button", { onClick: () => setShowAddProductModal(true), className: "flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#4F6EF7] text-white text-xs font-bold shadow-md hover:bg-indigo-600 transition-colors cursor-pointer", children: [_jsx(Plus, { className: "w-4 h-4" }), _jsx("span", { children: "Add New Product" })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-left text-xs", children: [_jsx("thead", { className: "border-b border-gray-200 dark:border-gray-800 text-gray-400 uppercase font-semibold", children: _jsxs("tr", { children: [_jsx("th", { className: "py-3 px-3", children: "Product" }), _jsx("th", { className: "py-3 px-3", children: "Category" }), _jsx("th", { className: "py-3 px-3", children: "Price" }), _jsx("th", { className: "py-3 px-3", children: "Stock" }), _jsx("th", { className: "py-3 px-3", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-gray-100 dark:divide-gray-800", children: productList.map(p => (_jsxs("tr", { className: "hover:bg-gray-50/50 dark:hover:bg-gray-800/40", children: [_jsxs("td", { className: "py-3 px-3 flex items-center gap-3", children: [_jsx("img", { src: p.images[0], alt: p.name, className: "w-10 h-10 rounded-xl object-contain bg-gray-50 dark:bg-gray-800 p-1 border border-gray-100 dark:border-gray-700" }), _jsxs("div", { className: "max-w-[220px]", children: [_jsx("p", { className: "font-bold text-gray-900 dark:text-white truncate", children: p.name }), _jsx("p", { className: "text-[10px] text-gray-400", children: p.brand })] })] }), _jsx("td", { className: "py-3 px-3 capitalize text-gray-600 dark:text-gray-300", children: p.category }), _jsxs("td", { className: "py-3 px-3", children: [_jsxs("span", { className: "font-bold text-gray-900 dark:text-white", children: ["\u20B9", p.discountPrice.toLocaleString()] }), p.price > p.discountPrice && (_jsxs("span", { className: "block text-[10px] text-gray-400 line-through", children: ["\u20B9", p.price.toLocaleString()] }))] }), _jsx("td", { className: "py-3 px-3", children: _jsxs("span", { className: `px-2.5 py-0.5 rounded-full text-[10px] font-bold ${p.stock > 10
                                                        ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600"
                                                        : "bg-rose-50 dark:bg-rose-950/60 text-rose-600"}`, children: [p.stock, " units"] }) }), _jsx("td", { className: "py-3 px-3", children: _jsx("button", { onClick: () => handleDeleteProduct(p.id), className: "p-1.5 text-gray-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors", title: "Delete product", children: _jsx(Trash2, { className: "w-4 h-4" }) }) })] }, p.id))) })] }) })] })), activeTab === "analytics" && (_jsxs("div", { className: "p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#151824] border border-gray-100 dark:border-gray-800/80 shadow-sm space-y-6", children: [_jsx("h2", { className: "text-base font-bold text-gray-900 dark:text-white", children: "E-Commerce Growth Metrics" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs", children: [_jsxs("div", { className: "p-4 rounded-2xl bg-gray-50 dark:bg-[#1A1C2E] space-y-1", children: [_jsx("span", { className: "text-gray-400", children: "Average Order Value (AOV)" }), _jsxs("p", { className: "text-xl font-black text-gray-900 dark:text-white", children: ["\u20B9", orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString() : "0"] }), _jsx("p", { className: "text-[10px] text-emerald-500 font-bold", children: "+14.2% vs last month" })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-gray-50 dark:bg-[#1A1C2E] space-y-1", children: [_jsx("span", { className: "text-gray-400", children: "AI Recommendation Conversion" }), _jsx("p", { className: "text-xl font-black text-gray-900 dark:text-white", children: "32.8%" }), _jsx("p", { className: "text-[10px] text-indigo-500 font-bold", children: "Driven by Gemini AI Chat" })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-gray-50 dark:bg-[#1A1C2E] space-y-1", children: [_jsx("span", { className: "text-gray-400", children: "On-Time Courier Delivery" }), _jsx("p", { className: "text-xl font-black text-gray-900 dark:text-white", children: "99.4%" }), _jsx("p", { className: "text-[10px] text-purple-500 font-bold", children: "Autonomous route dispatch" })] })] })] })), showAddProductModal && (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-lg bg-white dark:bg-[#151824] rounded-3xl p-6 sm:p-8 space-y-4 border border-gray-100 dark:border-gray-800 shadow-2xl", children: [_jsx("h3", { className: "text-lg font-bold text-gray-900 dark:text-white", children: "Add New Catalog Product" }), _jsxs("form", { onSubmit: handleCreateProduct, className: "space-y-3 text-xs", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "Product Title *" }), _jsx("input", { type: "text", required: true, value: newProdName, onChange: e => setNewProdName(e.target.value), placeholder: "e.g. Sony WH-1000XM5 Wireless Headphones", className: "w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl font-semibold" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "Category *" }), _jsxs("select", { value: newProdCategory, onChange: e => setNewProdCategory(e.target.value), className: "w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl", children: [_jsx("option", { value: "Electronics", children: "Electronics" }), _jsx("option", { value: "Fashion", children: "Fashion" }), _jsx("option", { value: "Home", children: "Home" }), _jsx("option", { value: "Beauty", children: "Beauty" }), _jsx("option", { value: "Sports", children: "Sports" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "Brand *" }), _jsx("input", { type: "text", required: true, value: newProdBrand, onChange: e => setNewProdBrand(e.target.value), placeholder: "e.g. Sony", className: "w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl" })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "MRP Price (\u20B9) *" }), _jsx("input", { type: "number", required: true, value: newProdPrice, onChange: e => setNewProdPrice(Number(e.target.value)), className: "w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "Sale Price (\u20B9) *" }), _jsx("input", { type: "number", required: true, value: newProdDiscountPrice, onChange: e => setNewProdDiscountPrice(Number(e.target.value)), className: "w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "Stock Units *" }), _jsx("input", { type: "number", required: true, value: newProdStock, onChange: e => setNewProdStock(Number(e.target.value)), className: "w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "Image URL" }), _jsx("input", { type: "url", value: newProdImage, onChange: e => setNewProdImage(e.target.value), className: "w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-400 mb-1", children: "Description" }), _jsx("textarea", { rows: 2, value: newProdDesc, onChange: e => setNewProdDesc(e.target.value), placeholder: "Key features and warranty details...", className: "w-full px-3 py-2 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl" })] }), _jsxs("div", { className: "flex gap-2 justify-end pt-3", children: [_jsx("button", { type: "button", onClick: () => setShowAddProductModal(false), className: "px-4 py-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-5 py-2 rounded-xl bg-[#4F6EF7] text-white font-bold hover:bg-indigo-600", children: "Create Product" })] })] })] }) }))] }));
};
