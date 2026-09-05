import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const AppContext = createContext(undefined);

// ==========================================
// API BASE URL
// ==========================================

const API_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/$/, "");

export const AppProvider = ({ children }) => {
  // ==========================================
  // THEME
  // ==========================================

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("shopai_theme");

    if (saved) {
      return saved === "dark";
    }

    return true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("shopai_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("shopai_theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // ==========================================
  // PRODUCTS
  // ==========================================

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // ==========================================
  // FILTERS
  // ==========================================

  const [sortBy, setSortBy] = useState("featured");

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: null,
  });

  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [onSaleOnly, setOnSaleOnly] = useState(false);

  const [isFilterSidebarOpen, setIsFilterSidebarOpen] =
    useState(false);

  const [viewMode, setViewMode] = useState("grid");

  const toggleFilterSidebar = () => {
    setIsFilterSidebarOpen((prev) => !prev);
  };

  const resetAllFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
    setSortBy("featured");

    setPriceRange({
      min: 0,
      max: null,
    });

    setMinRating(0);
    setInStockOnly(false);
    setOnSaleOnly(false);
  };

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (priceRange.min > 0 || priceRange.max !== null ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0) +
    (onSaleOnly ? 1 : 0);

  // ==========================================
  // USER
  // ==========================================

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
        isDefault: true,
      },
    ],

    wishlist: ["prod-1", "prod-3"],
  });

  const [token, setToken] = useState(null);

  // ==========================================
  // CART
  // ==========================================

  const [cart, setCart] = useState([]);

  // ==========================================
  // WISHLIST
  // ==========================================

  const [wishlist, setWishlist] = useState([
    "prod-1",
    "prod-3",
  ]);

  // ==========================================
  // ORDERS
  // ==========================================

  const [myOrders, setMyOrders] = useState([]);

  // ==========================================
  // MODALS
  // ==========================================

  const [isCartOpen, setIsCartOpen] = useState(false);

  const [isAIAssistantOpen, setIsAIAssistantOpen] =
    useState(false);

  const [aiInitialPrompt, setAiInitialPrompt] = useState("");

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [isOrderTrackingOpen, setIsOrderTrackingOpen] =
    useState(false);

  const [trackingOrderNumber, setTrackingOrderNumber] =
    useState("SAI-2026-98214");

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const [authMode, setAuthMode] = useState("login");

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  // ==========================================
  // TOAST
  // ==========================================

  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);

    setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // ==========================================
  // FETCH PRODUCTS
  // ==========================================

  const refreshProducts = async () => {
    try {
      console.log(
        "Fetching products from:",
        `${API_URL}/products`
      );

      const res = await fetch(`${API_URL}/products`);

      if (!res.ok) {
        throw new Error(
          `Failed to fetch products. Status: ${res.status}`
        );
      }

      const data = await res.json();

      console.log("Products API Response:", data);

      let productList = [];

      // If backend returns:
      // [ product1, product2 ]

      if (Array.isArray(data)) {
        productList = data;
      }

      // If backend returns:
      // { products: [...] }

      else if (Array.isArray(data.products)) {
        productList = data.products;
      }

      // If backend returns:
      // { data: [...] }

      else if (Array.isArray(data.data)) {
        productList = data.data;
      }

      // Convert MongoDB _id to id if necessary

      const formattedProducts = productList.map((product) => ({
        ...product,

        id:
          product.id ||
          product._id,

        _id:
          product._id ||
          product.id,

        category:
          product.category || "",

        name:
          product.name || "",

        description:
          product.description || "",

        brand:
          product.brand || "",

        tags:
          Array.isArray(product.tags)
            ? product.tags
            : [],

        discountPrice:
          Number(
            product.discountPrice ??
              product.price ??
              0
          ),

        price:
          Number(product.price ?? 0),

        rating:
          Number(product.rating ?? 0),

        stock:
          Number(product.stock ?? 0),

        discountPercentage:
          Number(product.discountPercentage ?? 0),
      }));

      console.log(
        "Formatted Products:",
        formattedProducts
      );

      setProducts(formattedProducts);
    } catch (err) {
      console.error(
        "Failed to fetch products:",
        err
      );

      setProducts([]);
    }
  };

  // ==========================================
  // FETCH CATEGORIES
  // ==========================================

  const fetchCategories = async () => {
    try {
      console.log(
        "Fetching categories from:",
        `${API_URL}/products/categories`
      );

      const res = await fetch(
        `${API_URL}/products/categories`
      );

      if (!res.ok) {
        throw new Error(
          `Failed to fetch categories. Status: ${res.status}`
        );
      }

      const data = await res.json();

      console.log(
        "Categories API Response:",
        data
      );

      if (Array.isArray(data)) {
        setCategories(data);
      } else if (Array.isArray(data.categories)) {
        setCategories(data.categories);
      } else if (Array.isArray(data.data)) {
        setCategories(data.data);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error(
        "Failed to fetch categories:",
        err
      );

      setCategories([]);
    }
  };

  // ==========================================
  // FETCH CART
  // ==========================================

  const fetchCart = async () => {
    try {
      const savedToken =
        localStorage.getItem("shopai_token");

      const res = await fetch(
        `${API_URL}/cart`,
        {
          headers: savedToken
            ? {
                Authorization: `Bearer ${savedToken}`,
              }
            : {},
        }
      );

      if (!res.ok) {
        return;
      }

      const data = await res.json();

      if (data.items) {
        setCart(data.items);
      }
    } catch (err) {
      console.error(
        "Failed to fetch cart:",
        err
      );
    }
  };

  // ==========================================
  // FETCH ORDERS
  // ==========================================

  const refreshOrders = async () => {
    try {
      const savedToken =
        localStorage.getItem("shopai_token");

      const res = await fetch(
        `${API_URL}/orders/my-orders`,
        {
          headers: savedToken
            ? {
                Authorization: `Bearer ${savedToken}`,
              }
            : {},
        }
      );

      if (!res.ok) {
        return;
      }

      const data = await res.json();

      if (data.orders) {
        setMyOrders(data.orders);
      }
    } catch (err) {
      console.error(
        "Failed to fetch orders:",
        err
      );
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    refreshProducts();
    fetchCategories();

    fetchCart();
    refreshOrders();

    const savedToken =
      localStorage.getItem("shopai_token");

    if (savedToken) {
      fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) {
            setUser(data.user);
            setToken(savedToken);
          }
        })
        .catch(() => {});
    }
  }, []);

  // ==========================================
  // FILTERED PRODUCTS
  // ==========================================

  const filteredProducts = useMemo(() => {
    const list = products.filter((product) => {
      const productCategory =
        typeof product.category === "string"
          ? product.category
          : product.category?.name || "";

      const matchesCategory =
        selectedCategory === "all" ||
        selectedCategory === "more" ||
        productCategory
          .toLowerCase()
          .trim() ===
          selectedCategory
            .toLowerCase()
            .trim();

      const productName =
        product.name || "";

      const productDescription =
        product.description || "";

      const productBrand =
        product.brand || "";

      const productTags =
        Array.isArray(product.tags)
          ? product.tags
          : [];

      const search = searchQuery.toLowerCase();

      const matchesSearch =
        !searchQuery ||
        productName
          .toLowerCase()
          .includes(search) ||
        productDescription
          .toLowerCase()
          .includes(search) ||
        productBrand
          .toLowerCase()
          .includes(search) ||
        productTags.some((tag) =>
          String(tag)
            .toLowerCase()
            .includes(search)
        );

      const currentPrice =
        Number(
          product.discountPrice ??
            product.price ??
            0
        );

      const matchesMinPrice =
        currentPrice >= priceRange.min;

      const matchesMaxPrice =
        priceRange.max === null ||
        currentPrice <= priceRange.max;

      const matchesRating =
        minRating === 0 ||
        Number(product.rating || 0) >=
          minRating;

      const matchesStock =
        !inStockOnly ||
        Number(product.stock || 0) > 0;

      const matchesSale =
        !onSaleOnly ||
        Number(
          product.discountPercentage || 0
        ) > 0;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesRating &&
        matchesStock &&
        matchesSale
      );
    });

    return [...list].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return (
            Number(
              a.discountPrice ??
                a.price ??
                0
            ) -
            Number(
              b.discountPrice ??
                b.price ??
                0
            )
          );

        case "price-desc":
          return (
            Number(
              b.discountPrice ??
                b.price ??
                0
            ) -
            Number(
              a.discountPrice ??
                a.price ??
                0
            )
          );

        case "rating":
        case "rating-desc":
          return (
            Number(b.rating || 0) -
              Number(a.rating || 0) ||
            Number(b.numReviews || 0) -
              Number(a.numReviews || 0)
          );

        case "discount":
        case "discount-desc":
          return (
            Number(
              b.discountPercentage || 0
            ) -
            Number(
              a.discountPercentage || 0
            )
          );

        case "newest":
          return String(
            b.createdAt || ""
          ).localeCompare(
            String(a.createdAt || "")
          );

        case "featured":
        default:
          return (
            (b.isFeatured ? 1 : 0) -
              (a.isFeatured ? 1 : 0) ||
            (b.isTrending ? 1 : 0) -
              (a.isTrending ? 1 : 0) ||
            Number(b.rating || 0) -
              Number(a.rating || 0)
          );
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
    sortBy,
  ]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = async (
    product,
    quantity = 1
  ) => {
    try {
      const savedToken =
        localStorage.getItem("shopai_token");

      const productId =
        product._id || product.id;

      const res = await fetch(
        `${API_URL}/cart/add`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            ...(savedToken
              ? {
                  Authorization: `Bearer ${savedToken}`,
                }
              : {}),
          },

          body: JSON.stringify({
            productId,
            quantity,
          }),
        }
      );

      const data = await res.json();

      if (data.items) {
        setCart(data.items);
      } else {
        setCart((prev) => {
          const idx = prev.findIndex(
            (item) =>
              (item.product._id ||
                item.product.id) ===
              productId
          );

          if (idx > -1) {
            return prev.map((item, i) =>
              i === idx
                ? {
                    ...item,
                    quantity:
                      item.quantity +
                      quantity,
                  }
                : item
            );
          }

          return [
            ...prev,
            {
              product,
              quantity,
            },
          ];
        });
      }

      showToast(
        `Added "${product.name}" to your cart`
      );
    } catch {
      setCart((prev) => {
        const productId =
          product._id || product.id;

        const idx = prev.findIndex(
          (item) =>
            (item.product._id ||
              item.product.id) ===
            productId
        );

        if (idx > -1) {
          return prev.map((item, i) =>
            i === idx
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    quantity,
                }
              : item
          );
        }

        return [
          ...prev,
          {
            product,
            quantity,
          },
        ];
      });

      showToast(
        `Added "${product.name}" to your cart`
      );
    }
  };

  // ==========================================
  // REMOVE CART ITEM
  // ==========================================

  const removeFromCart = async (
    productId
  ) => {
    try {
      const savedToken =
        localStorage.getItem("shopai_token");

      const res = await fetch(
        `${API_URL}/cart/remove`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            ...(savedToken
              ? {
                  Authorization: `Bearer ${savedToken}`,
                }
              : {}),
          },

          body: JSON.stringify({
            productId,
          }),
        }
      );

      const data = await res.json();

      if (data.items) {
        setCart(data.items);
      } else {
        setCart((prev) =>
          prev.filter(
            (item) =>
              (item.product._id ||
                item.product.id) !==
              productId
          )
        );
      }

      showToast("Item removed from cart");
    } catch {
      setCart((prev) =>
        prev.filter(
          (item) =>
            (item.product._id ||
              item.product.id) !==
            productId
        )
      );
    }
  };

  // ==========================================
  // UPDATE CART QUANTITY
  // ==========================================

  const updateCartQty = async (
    productId,
    quantity
  ) => {
    if (quantity <= 0) {
      return removeFromCart(productId);
    }

    try {
      const savedToken =
        localStorage.getItem("shopai_token");

      const res = await fetch(
        `${API_URL}/cart/update`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            ...(savedToken
              ? {
                  Authorization: `Bearer ${savedToken}`,
                }
              : {}),
          },

          body: JSON.stringify({
            productId,
            quantity,
          }),
        }
      );

      const data = await res.json();

      if (data.items) {
        setCart(data.items);
      } else {
        setCart((prev) =>
          prev.map((item) =>
            (item.product._id ||
              item.product.id) ===
            productId
              ? {
                  ...item,
                  quantity,
                }
              : item
          )
        );
      }
    } catch {
      setCart((prev) =>
        prev.map((item) =>
          (item.product._id ||
            item.product.id) ===
          productId
            ? {
                ...item,
                quantity,
              }
            : item
        )
      );
    }
  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = async () => {
    setCart([]);

    try {
      const savedToken =
        localStorage.getItem("shopai_token");

      await fetch(
        `${API_URL}/cart/clear`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            ...(savedToken
              ? {
                  Authorization: `Bearer ${savedToken}`,
                }
              : {}),
          },
        }
      );
    } catch {
      // Local cart already cleared
    }
  };

  // ==========================================
  // CART TOTAL
  // ==========================================

  const cartCount = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (sum, item) =>
      sum +
      Number(
        item.product.discountPrice ??
          item.product.price ??
          0
      ) *
        item.quantity,
    0
  );

  // ==========================================
  // WISHLIST
  // ==========================================

  const toggleWishlist = async (
    productId
  ) => {
    const exists =
      wishlist.includes(productId);

    const updated = exists
      ? wishlist.filter(
          (id) => id !== productId
        )
      : [...wishlist, productId];

    setWishlist(updated);

    const prod = products.find(
      (p) =>
        (p._id || p.id) === productId
    );

    showToast(
      exists
        ? `Removed "${
            prod?.name || "Item"
          }" from wishlist`
        : `Saved "${
            prod?.name || "Item"
          }" to wishlist`
    );
  };

  const isInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  // ==========================================
  // USER ROLE
  // ==========================================

  const setUserRole = (role) => {
    if (user) {
      setUser({
        ...user,
        role,
      });

      showToast(
        `Switched active profile role to: ${role.toUpperCase()}`
      );
    }
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const login = async (
    email,
    pass
  ) => {
    try {
      const res = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            password: pass,
          }),
        }
      );

      const data = await res.json();

      if (
        data.success &&
        data.user
      ) {
        setUser(data.user);

        setToken(data.token);

        localStorage.setItem(
          "shopai_token",
          data.token
        );

        setIsAuthOpen(false);

        showToast(
          `Welcome back, ${data.user.name}!`
        );

        fetchCart();
        refreshOrders();

        return true;
      }

      showToast(
        data.message ||
          "Login failed"
      );

      return false;
    } catch {
      showToast(
        "Network error logging in"
      );

      return false;
    }
  };

  // ==========================================
  // REGISTER
  // ==========================================

  const register = async (
    name,
    email,
    pass
  ) => {
    try {
      const res = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password: pass,
          }),
        }
      );

      const data = await res.json();

      if (
        data.success &&
        data.user
      ) {
        setUser(data.user);

        setToken(data.token);

        localStorage.setItem(
          "shopai_token",
          data.token
        );

        setIsAuthOpen(false);

        showToast(
          `Account created! Welcome, ${data.user.name}`
        );

        fetchCart();
        refreshOrders();

        return true;
      }

      showToast(
        data.message ||
          "Registration failed"
      );

      return false;
    } catch (error) {
      console.error(
        "Registration error:",
        error
      );

      showToast(
        "Network error registering"
      );

      return false;
    }
  };

  // ==========================================
  // LOGOUT
  // ==========================================

  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem(
      "shopai_token"
    );

    showToast(
      "You have been signed out"
    );
  };

  // ==========================================
  // AI ASSISTANT
  // ==========================================

  const openAIAssistantWithPrompt = (
    prompt
  ) => {
    setAiInitialPrompt(prompt);

    setIsAIAssistantOpen(true);
  };

  // ==========================================
  // ORDER TRACKING
  // ==========================================

  const openOrderTracking = (
    orderNumber
  ) => {
    if (orderNumber) {
      setTrackingOrderNumber(
        orderNumber
      );
    }

    setIsOrderTrackingOpen(true);
  };

  // ==========================================
  // ADD ORDER
  // ==========================================

  const addOrder = (
    newOrder
  ) => {
    setMyOrders((prev) => [
      newOrder,
      ...prev,
    ]);

    setTrackingOrderNumber(
      newOrder.orderNumber
    );

    clearCart();
  };

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <AppContext.Provider
      value={{
        // Theme
        isDarkMode,
        toggleDarkMode,

        // Products
        products,
        categories,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        filteredProducts,
        refreshProducts,

        // Sorting
        sortBy,
        setSortBy,

        // Price
        priceRange,
        setPriceRange,

        // Rating
        minRating,
        setMinRating,

        // Stock
        inStockOnly,
        setInStockOnly,

        // Sale
        onSaleOnly,
        setOnSaleOnly,

        // Filters
        resetAllFilters,
        activeFilterCount,

        // Filter Sidebar
        isFilterSidebarOpen,
        setIsFilterSidebarOpen,
        toggleFilterSidebar,

        // View
        viewMode,
        setViewMode,

        // User
        user,
        setUser,
        token,
        login,
        register,
        logout,
        setUserRole,

        // Cart
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,

        // Wishlist
        wishlist,
        toggleWishlist,
        isInWishlist,

        // Cart Modal
        isCartOpen,
        setIsCartOpen,

        // AI
        isAIAssistantOpen,
        setIsAIAssistantOpen,
        aiInitialPrompt,
        openAIAssistantWithPrompt,

        // Checkout
        isCheckoutOpen,
        setIsCheckoutOpen,

        // Order Tracking
        isOrderTrackingOpen,
        setIsOrderTrackingOpen,
        trackingOrderNumber,
        openOrderTracking,

        // Authentication
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,

        // Admin
        isAdminOpen,
        setIsAdminOpen,

        // Product Modal
        selectedProduct,
        setSelectedProduct,

        // Orders
        myOrders,
        addOrder,
        refreshOrders,

        // Toast
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// ==========================================
// USE APP HOOK
// ==========================================

export const useApp = () => {
  const context =
    useContext(AppContext);

  if (!context) {
    throw new Error(
      "useApp must be used within an AppProvider"
    );
  }

  return context;
};