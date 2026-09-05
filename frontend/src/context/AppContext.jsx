import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext(undefined);
export const AppProvider = ({ children }) => {
    // Theme state (defaults to true for dark UI, respects explicit user choice)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem("shopai_theme");
        if (saved) return saved === "dark";
        return true;
    });
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("shopai_theme", "dark");
        }
        else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("shopai_theme", "light");
        }
    }, [isDarkMode]);
    const toggleDarkMode = () => setIsDarkMode(prev => !prev);
    // Products and Categories state
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    // Sorting and Filtering state
    const [sortBy, setSortBy] = useState("featured");
    const [priceRange, setPriceRange] = useState({ min: 0, max: null });
    const [minRating, setMinRating] = useState(0);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [onSaleOnly, setOnSaleOnly] = useState(false);
    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    const [viewMode, setViewMode] = useState("grid");
    const toggleFilterSidebar = () => setIsFilterSidebarOpen(prev => !prev);
    const resetAllFilters = () => {
        setSelectedCategory("all");
        setSearchQuery("");
        setSortBy("featured");
        setPriceRange({ min: 0, max: null });
        setMinRating(0);
        setInStockOnly(false);
        setOnSaleOnly(false);
    };
    const activeFilterCount = (selectedCategory !== "all" ? 1 : 0) +
        (priceRange.min > 0 || priceRange.max !== null ? 1 : 0) +
        (minRating > 0 ? 1 : 0) +
        (inStockOnly ? 1 : 0) +
        (onSaleOnly ? 1 : 0);
    // User state
    const [user, setUser] = useState({
        id: "usr-1",
        name: "Rakesh",
        email: "kondelarakesh12@gmail.com",
        avatar: "",
        role: "admin",
        addresses: [
            {
                fullName: "Rakesh Kondela",
                phone: "+91 98765 43210",
                street: "Flat 402, Silicon Heights, Hitech City",
                city: "Hyderabad",
                state: "Telangana",
                postalCode: "500081",
                country: "India",
                isDefault: true
            }
        ],
        wishlist: ["prod-1", "prod-3"]
    });
    const [token, setToken] = useState("demo_jwt_token_rakesh");
    // Cart state
    const [cart, setCart] = useState([]);
    // Wishlist state
    const [wishlist, setWishlist] = useState(["prod-1", "prod-3"]);
    // Orders
    const [myOrders, setMyOrders] = useState([]);
    // Modals state
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
    const [aiInitialPrompt, setAiInitialPrompt] = useState("");
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
    const [trackingOrderNumber, setTrackingOrderNumber] = useState("SAI-2026-98214");
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState("login");
    const [isAdminOpen, setIsAdminOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    // Toast
    const [toast, setToast] = useState(null);
    const showToast = (msg) => {
        setToast(msg);
        setTimeout(() => {
            setToast(prev => (prev === msg ? null : prev));
        }, 3200);
    };
    // Fetch initial data
    const refreshProducts = async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            if (data.products) {
                setProducts(data.products);
            }
        }
        catch (err) {
            console.error("Failed to fetch products:", err);
        }
    };
    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/products/categories");
            const data = await res.json();
            if (data.categories) {
                setCategories(data.categories);
            }
        }
        catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };
    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("shopai_token");
            const res = await fetch("/api/cart", {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            const data = await res.json();
            if (data.items) {
                setCart(data.items);
            }
        }
        catch (err) {
            console.error("Failed to fetch cart:", err);
        }
    };
    const refreshOrders = async () => {
        try {
            const token = localStorage.getItem("shopai_token");
            const res = await fetch("/api/orders/my-orders", {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            const data = await res.json();
            if (data.orders) {
                setMyOrders(data.orders);
            }
        }
        catch (err) {
            console.error("Failed to fetch orders:", err);
        }
    };
    useEffect(() => {
        refreshProducts();
        fetchCategories();
        fetchCart();
        refreshOrders();
        // Check existing token
        const savedToken = localStorage.getItem("shopai_token");
        if (savedToken) {
            fetch("/api/auth/me", {
                headers: { Authorization: `Bearer ${savedToken}` }
            })
                .then(res => res.json())
                .then(data => {
                if (data.success && data.user) {
                    setUser(data.user);
                    setToken(savedToken);
                }
            })
                .catch(() => { });
        }
    }, []);
    // Filtered and Sorted Products
    const filteredProducts = React.useMemo(() => {
        const list = products.filter(product => {
            const matchesCategory = selectedCategory === "all" ||
                selectedCategory === "more" ||
                product.category.toLowerCase() === selectedCategory.toLowerCase();
            const matchesSearch = !searchQuery ||
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesMinPrice = product.discountPrice >= priceRange.min;
            const matchesMaxPrice = priceRange.max === null || product.discountPrice <= priceRange.max;
            const matchesRating = minRating === 0 || product.rating >= minRating;
            const matchesStock = !inStockOnly || product.stock > 0;
            const matchesSale = !onSaleOnly || product.discountPercentage > 0;
            return (matchesCategory &&
                matchesSearch &&
                matchesMinPrice &&
                matchesMaxPrice &&
                matchesRating &&
                matchesStock &&
                matchesSale);
        });
        // Apply sorting
        return list.sort((a, b) => {
            switch (sortBy) {
                case "price-asc":
                    return a.discountPrice - b.discountPrice;
                case "price-desc":
                    return b.discountPrice - a.discountPrice;
                case "rating":
                case "rating-desc":
                    return b.rating - a.rating || b.numReviews - a.numReviews;
                case "discount":
                case "discount-desc":
                    return b.discountPercentage - a.discountPercentage;
                case "newest":
                    return (b.createdAt || "").localeCompare(a.createdAt || "");
                case "featured":
                default:
                    return ((b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) ||
                        (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0) ||
                        b.rating - a.rating);
            }
        });
    }, [
        products,
        selectedCategory,
        searchQuery,
        priceRange,
        minRating,
        inStockOnly,
        onSaleOnly,
        sortBy
    ]);
    // Cart operations
    const addToCart = async (product, quantity = 1) => {
        try {
            const savedToken = localStorage.getItem("shopai_token");
            const res = await fetch("/api/cart/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(savedToken ? { Authorization: `Bearer ${savedToken}` } : {})
                },
                body: JSON.stringify({ productId: product.id, quantity })
            });
            const data = await res.json();
            if (data.items) {
                setCart(data.items);
            }
            else {
                // Local fallback
                setCart(prev => {
                    const idx = prev.findIndex(item => item.product.id === product.id);
                    if (idx > -1) {
                        return prev.map((item, i) => i === idx ? { ...item, quantity: item.quantity + quantity } : item);
                    }
                    return [...prev, { product, quantity }];
                });
            }
            showToast(`Added "${product.name}" to your cart`);
        }
        catch {
            // Local fallback
            setCart(prev => {
                const idx = prev.findIndex(item => item.product.id === product.id);
                if (idx > -1) {
                    return prev.map((item, i) => i === idx ? { ...item, quantity: item.quantity + quantity } : item);
                }
                return [...prev, { product, quantity }];
            });
            showToast(`Added "${product.name}" to your cart`);
        }
    };
    const removeFromCart = async (productId) => {
        try {
            const savedToken = localStorage.getItem("shopai_token");
            const res = await fetch("/api/cart/remove", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(savedToken ? { Authorization: `Bearer ${savedToken}` } : {})
                },
                body: JSON.stringify({ productId })
            });
            const data = await res.json();
            if (data.items) {
                setCart(data.items);
            }
            else {
                setCart(prev => prev.filter(item => item.product.id !== productId));
            }
            showToast("Item removed from cart");
        }
        catch {
            setCart(prev => prev.filter(item => item.product.id !== productId));
        }
    };
    const updateCartQty = async (productId, quantity) => {
        if (quantity <= 0) {
            return removeFromCart(productId);
        }
        try {
            const savedToken = localStorage.getItem("shopai_token");
            const res = await fetch("/api/cart/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(savedToken ? { Authorization: `Bearer ${savedToken}` } : {})
                },
                body: JSON.stringify({ productId, quantity })
            });
            const data = await res.json();
            if (data.items) {
                setCart(data.items);
            }
            else {
                setCart(prev => prev.map(item => (item.product.id === productId ? { ...item, quantity } : item)));
            }
        }
        catch {
            setCart(prev => prev.map(item => (item.product.id === productId ? { ...item, quantity } : item)));
        }
    };
    const clearCart = async () => {
        setCart([]);
        try {
            const savedToken = localStorage.getItem("shopai_token");
            await fetch("/api/cart/clear", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    ...(savedToken ? { Authorization: `Bearer ${savedToken}` } : {})
                }
            });
        }
        catch {
            // local fallback handled
        }
    };
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartTotal = cart.reduce((sum, item) => sum + item.product.discountPrice * item.quantity, 0);
    // Wishlist
    const toggleWishlist = async (productId) => {
        const exists = wishlist.includes(productId);
        const updated = exists
            ? wishlist.filter(id => id !== productId)
            : [...wishlist, productId];
        setWishlist(updated);
        const prod = products.find(p => p.id === productId);
        showToast(exists
            ? `Removed "${prod?.name || 'Item'}" from wishlist`
            : `Saved "${prod?.name || 'Item'}" to wishlist`);
    };
    const isInWishlist = (productId) => wishlist.includes(productId);
    // User role switch for testing
    const setUserRole = (role) => {
        if (user) {
            setUser({ ...user, role });
            showToast(`Switched active profile role to: ${role.toUpperCase()}`);
        }
    };
    const login = async (email, pass) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password: pass })
            });
            const data = await res.json();
            if (data.success && data.user) {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem("shopai_token", data.token);
                setIsAuthOpen(false);
                showToast(`Welcome back, ${data.user.name}!`);
                fetchCart();
                refreshOrders();
                return true;
            }
            showToast(data.message || "Login failed");
            return false;
        }
        catch {
            showToast("Network error logging in");
            return false;
        }
    };
    const register = async (name, email, pass) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password: pass })
            });
            const data = await res.json();
            if (data.success && data.user) {
                setUser(data.user);
                setToken(data.token);
                localStorage.setItem("shopai_token", data.token);
                setIsAuthOpen(false);
                showToast(`Account created! Welcome, ${data.user.name}`);
                fetchCart();
                refreshOrders();
                return true;
            }
            showToast(data.message || "Registration failed");
            return false;
        }
        catch {
            showToast("Network error registering");
            return false;
        }
    };
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("shopai_token");
        showToast("You have been signed out");
    };
    const openAIAssistantWithPrompt = (prompt) => {
        setAiInitialPrompt(prompt);
        setIsAIAssistantOpen(true);
    };
    const openOrderTracking = (orderNumber) => {
        if (orderNumber) {
            setTrackingOrderNumber(orderNumber);
        }
        setIsOrderTrackingOpen(true);
    };
    const addOrder = (newOrder) => {
        setMyOrders(prev => [newOrder, ...prev]);
        setTrackingOrderNumber(newOrder.orderNumber);
        clearCart();
    };
    return (_jsx(AppContext.Provider, { value: {
            isDarkMode,
            toggleDarkMode,
            products,
            categories,
            selectedCategory,
            setSelectedCategory,
            searchQuery,
            setSearchQuery,
            filteredProducts,
            refreshProducts,
            sortBy,
            setSortBy,
            priceRange,
            setPriceRange,
            minRating,
            setMinRating,
            inStockOnly,
            setInStockOnly,
            onSaleOnly,
            setOnSaleOnly,
            resetAllFilters,
            activeFilterCount,
            isFilterSidebarOpen,
            setIsFilterSidebarOpen,
            toggleFilterSidebar,
            viewMode,
            setViewMode,
            user,
            setUser,
            token,
            login,
            register,
            logout,
            setUserRole,
            cart,
            cartCount,
            cartTotal,
            addToCart,
            removeFromCart,
            updateCartQty,
            clearCart,
            wishlist,
            toggleWishlist,
            isInWishlist,
            isCartOpen,
            setIsCartOpen,
            isAIAssistantOpen,
            setIsAIAssistantOpen,
            aiInitialPrompt,
            openAIAssistantWithPrompt,
            isCheckoutOpen,
            setIsCheckoutOpen,
            isOrderTrackingOpen,
            setIsOrderTrackingOpen,
            trackingOrderNumber,
            openOrderTracking,
            isAuthOpen,
            setIsAuthOpen,
            authMode,
            setAuthMode,
            isAdminOpen,
            setIsAdminOpen,
            selectedProduct,
            setSelectedProduct,
            myOrders,
            addOrder,
            refreshOrders,
            toast,
            showToast
        }, children: children }));
};
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return context;
};
