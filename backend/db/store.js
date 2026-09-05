import { initialCategories, initialProducts, initialOrders, defaultUser } from "../data/seedData.js";
class Store {
    constructor() {
        this.products = [...initialProducts];
        this.categories = [...initialCategories];
        this.orders = [...initialOrders];
        this.users = [
            {
                ...defaultUser,
                // Default test password: "password123"
                passwordHash: "$2a$10$wN1GqK1z1H.H4M7k9u5sVeZJ90wUqyV6qg2O8cKpFzO3aPqRstz12"
            }
        ];
        this.carts = new Map();
        // Initialize default cart with 3 items (matches the badge "3" in the reference image!)
        const initialCart = [
            { product: initialProducts[0], quantity: 1 }, // Apple iPhone 15
            { product: initialProducts[1], quantity: 1 }, // Sony WH-1000XM5
            { product: initialProducts[4], quantity: 1 } // The Alchemist
        ];
        this.carts.set(defaultUser.id, initialCart);
        this.carts.set("guest", initialCart);
    }
    // Products
    getProducts(params) {
        let result = [...this.products];
        if (params?.search) {
            const q = params.search.toLowerCase();
            result = result.filter(p => p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.brand.toLowerCase().includes(q) ||
                p.tags.some(t => t.toLowerCase().includes(q)));
        }
        if (params?.category && params.category !== "all" && params.category !== "more") {
            const catNorm = params.category.toLowerCase();
            result = result.filter(p => p.category.toLowerCase() === catNorm || p.slug.toLowerCase().includes(catNorm));
        }
        if (params?.minPrice !== undefined) {
            result = result.filter(p => p.discountPrice >= params.minPrice);
        }
        if (params?.maxPrice !== undefined) {
            result = result.filter(p => p.discountPrice <= params.maxPrice);
        }
        if (params?.rating !== undefined) {
            result = result.filter(p => p.rating >= params.rating);
        }
        if (params?.featured !== undefined) {
            result = result.filter(p => p.isFeatured === params.featured);
        }
        if (params?.trending !== undefined) {
            result = result.filter(p => p.isTrending === params.trending);
        }
        // Sorting
        if (params?.sort) {
            switch (params.sort) {
                case "price-asc":
                    result.sort((a, b) => a.discountPrice - b.discountPrice);
                    break;
                case "price-desc":
                    result.sort((a, b) => b.discountPrice - a.discountPrice);
                    break;
                case "rating":
                    result.sort((a, b) => b.rating - a.rating);
                    break;
                case "newest":
                    result.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
                    break;
                case "popularity":
                default:
                    result.sort((a, b) => b.numReviews - a.numReviews);
                    break;
            }
        }
        return result;
    }
    getProductById(id) {
        return this.products.find(p => p.id === id || p.slug === id);
    }
    createProduct(product) {
        const newProduct = {
            ...product,
            id: `prod-${Date.now()}`,
            createdAt: new Date().toISOString()
        };
        this.products.unshift(newProduct);
        return newProduct;
    }
    updateProduct(id, updates) {
        const idx = this.products.findIndex(p => p.id === id);
        if (idx === -1)
            return undefined;
        this.products[idx] = { ...this.products[idx], ...updates };
        return this.products[idx];
    }
    deleteProduct(id) {
        const prevLen = this.products.length;
        this.products = this.products.filter(p => p.id !== id);
        return this.products.length < prevLen;
    }
    // Categories
    getCategories() {
        return this.categories;
    }
    // Users
    getUserByEmail(email) {
        return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    }
    getUserById(id) {
        return this.users.find(u => u.id === id);
    }
    getAllUsers() {
        return this.users.map(({ passwordHash, ...user }) => user);
    }
    createUser(user) {
        const newUser = {
            id: `usr-${Date.now()}`,
            name: user.name,
            email: user.email,
            avatar: "",
            role: user.role || 'user',
            addresses: [],
            wishlist: [],
            passwordHash: user.passwordHash
        };
        this.users.push(newUser);
        const { passwordHash, ...safeUser } = newUser;
        return safeUser;
    }
    updateUser(id, updates) {
        const idx = this.users.findIndex(u => u.id === id);
        if (idx === -1)
            return undefined;
        this.users[idx] = { ...this.users[idx], ...updates };
        const { passwordHash, ...safeUser } = this.users[idx];
        return safeUser;
    }
    // Cart
    getCart(userId) {
        return this.carts.get(userId) || [];
    }
    setCart(userId, items) {
        this.carts.set(userId, items);
        return items;
    }
    addToCart(userId, productId, quantity = 1) {
        const current = this.getCart(userId);
        const prod = this.getProductById(productId);
        if (!prod)
            return current;
        const existingIdx = current.findIndex(item => item.product.id === productId);
        let updated;
        if (existingIdx > -1) {
            updated = current.map((item, idx) => idx === existingIdx ? { ...item, quantity: item.quantity + quantity } : item);
        }
        else {
            updated = [...current, { product: prod, quantity }];
        }
        this.carts.set(userId, updated);
        return updated;
    }
    removeFromCart(userId, productId) {
        const current = this.getCart(userId);
        const updated = current.filter(item => item.product.id !== productId);
        this.carts.set(userId, updated);
        return updated;
    }
    updateCartQty(userId, productId, quantity) {
        const current = this.getCart(userId);
        if (quantity <= 0) {
            return this.removeFromCart(userId, productId);
        }
        const updated = current.map(item => item.product.id === productId ? { ...item, quantity } : item);
        this.carts.set(userId, updated);
        return updated;
    }
    // Wishlist
    toggleWishlist(userId, productId) {
        const user = this.getUserById(userId);
        if (!user)
            return [];
        const exists = user.wishlist.includes(productId);
        user.wishlist = exists
            ? user.wishlist.filter(id => id !== productId)
            : [...user.wishlist, productId];
        return user.wishlist;
    }
    // Orders
    getOrders(userId) {
        if (userId) {
            return this.orders.filter(o => o.userId === userId);
        }
        return this.orders;
    }
    getOrderById(id) {
        return this.orders.find(o => o.id === id || o.orderNumber === id);
    }
    createOrder(orderData) {
        const randNum = Math.floor(10000 + Math.random() * 90000);
        const newOrder = {
            ...orderData,
            id: `ord-${Date.now()}`,
            orderNumber: `SAI-2026-${randNum}`,
            createdAt: new Date().toISOString(),
            trackingSteps: [
                {
                    status: "Processing",
                    title: "Order Placed & Confirmed",
                    description: "Payment successfully verified. AI inventory reservation confirmed.",
                    timestamp: "Just now",
                    completed: true,
                    current: true
                },
                {
                    status: "Confirmed",
                    title: "Dispatched from Smart Hub",
                    description: "Smart sorting algorithm scheduled nearest robotic fulfilment center.",
                    timestamp: "Expected within 4 hours",
                    completed: false
                },
                {
                    status: "Shipped",
                    title: "In Transit to Destination Hub",
                    description: "Assigned high-speed regional logistics corridor.",
                    timestamp: "Expected tomorrow",
                    completed: false
                },
                {
                    status: "Out for Delivery",
                    title: "Out for Delivery",
                    description: "Assigned to dedicated delivery executive.",
                    timestamp: "Pending",
                    completed: false
                },
                {
                    status: "Delivered",
                    title: "Delivered",
                    description: "Contactless delivery with verification.",
                    timestamp: "Pending",
                    completed: false
                }
            ]
        };
        this.orders.unshift(newOrder);
        // Clear cart
        this.setCart(orderData.userId, []);
        return newOrder;
    }
    updateOrderStatus(orderId, status) {
        const order = this.getOrderById(orderId);
        if (!order)
            return undefined;
        order.status = status;
        const statuses = ["Processing", "Confirmed", "Shipped", "Out for Delivery", "Delivered"];
        const currIdx = statuses.indexOf(status);
        order.trackingSteps = order.trackingSteps.map((step, idx) => {
            if (idx <= currIdx) {
                return { ...step, completed: true, current: idx === currIdx };
            }
            return { ...step, completed: false, current: false };
        });
        return order;
    }
    // Admin metrics
    getAdminStats() {
        const totalUsers = this.users.length + 142; // realistic scale
        const totalProducts = this.products.length;
        const totalOrders = this.orders.length + 840;
        const totalRevenue = this.orders.reduce((sum, o) => sum + o.totalAmount, 0) + 1482000;
        const lowStockProducts = this.products.filter(p => p.stock < 15);
        return {
            totalUsers,
            totalProducts,
            totalOrders,
            totalRevenue,
            lowStockProducts,
            recentOrders: this.orders.slice(0, 5)
        };
    }
}
export const store = new Store();
