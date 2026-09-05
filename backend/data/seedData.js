export const initialCategories = [
    {
        id: "electronics",
        name: "Electronics",
        slug: "electronics",
        icon: "Headphones",
        bgColor: "bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
        textColor: "text-purple-600",
        itemCount: 42
    },
    {
        id: "fashion",
        name: "Fashion",
        slug: "fashion",
        icon: "Shirt",
        bgColor: "bg-pink-100 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400",
        textColor: "text-pink-600",
        itemCount: 68
    },
    {
        id: "home-living",
        name: "Home & Living",
        slug: "home-living",
        icon: "Armchair",
        bgColor: "bg-teal-100 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400",
        textColor: "text-teal-600",
        itemCount: 35
    },
    {
        id: "beauty",
        name: "Beauty",
        slug: "beauty",
        icon: "Sparkles",
        bgColor: "bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",
        textColor: "text-rose-600",
        itemCount: 29
    },
    {
        id: "sports",
        name: "Sports",
        slug: "sports",
        icon: "Footprints",
        bgColor: "bg-sky-100 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400",
        textColor: "text-sky-600",
        itemCount: 24
    },
    {
        id: "books",
        name: "Books",
        slug: "books",
        icon: "BookOpen",
        bgColor: "bg-amber-100 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400",
        textColor: "text-amber-600",
        itemCount: 55
    },
    {
        id: "toys-games",
        name: "Toys & Games",
        slug: "toys-games",
        icon: "Gamepad2",
        bgColor: "bg-indigo-100 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400",
        textColor: "text-indigo-600",
        itemCount: 31
    },
    {
        id: "groceries",
        name: "Groceries",
        slug: "groceries",
        icon: "ShoppingCart",
        bgColor: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
        textColor: "text-emerald-600",
        itemCount: 80
    },
    {
        id: "automotive",
        name: "Automotive",
        slug: "automotive",
        icon: "Car",
        bgColor: "bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400",
        textColor: "text-orange-600",
        itemCount: 19
    },
    {
        id: "more",
        name: "More",
        slug: "all",
        icon: "LayoutGrid",
        bgColor: "bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400",
        textColor: "text-violet-600",
        itemCount: 120
    }
];
export const initialProducts = [
    {
        id: "prod-1",
        name: "Apple iPhone 15",
        slug: "apple-iphone-15",
        description: "Dynamic Island, 48MP main camera, USB-C, aerospace-grade aluminum with color-infused glass back.",
        brand: "Apple",
        category: "Electronics",
        price: 79900,
        discountPrice: 69900,
        discountPercentage: 10,
        images: [
            "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80"
        ],
        stock: 28,
        rating: 4.8,
        numReviews: 2100,
        features: ["48MP Camera", "A16 Bionic chip", "Super Retina XDR Display", "USB-C Connector"],
        specifications: {
            "Display": "6.1-inch Super Retina XDR",
            "Storage": "128GB / 256GB / 512GB",
            "Processor": "A16 Bionic chip",
            "Battery": "Up to 20 hours video playback"
        },
        tags: ["smartphone", "apple", "iphone", "ios", "5g", "flagship"],
        isFeatured: true,
        isTrending: true,
        badge: "10% OFF"
    },
    {
        id: "prod-2",
        name: "Sony WH-1000XM5",
        slug: "sony-wh-1000xm5",
        description: "Industry-leading wireless noise canceling headphones with dual processors and 8 microphones.",
        brand: "Sony",
        category: "Electronics",
        price: 34990,
        discountPrice: 29990,
        discountPercentage: 14,
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80"
        ],
        stock: 19,
        rating: 4.7,
        numReviews: 1400,
        features: ["Auto NC Optimizer", "30-hour battery life", "Ultra-comfortable lightweight fit", "Crystal clear hands-free calls"],
        specifications: {
            "Driver Unit": "30mm precision engineered",
            "Battery Life": "Up to 30 Hours",
            "Connectivity": "Bluetooth 5.2, Multipoint",
            "Charging": "Quick charge (3 min = 3 hours)"
        },
        tags: ["headphones", "audio", "wireless", "noise-canceling", "sony", "music"],
        isFeatured: true,
        isTrending: true,
        badge: "14% OFF"
    },
    {
        id: "prod-3",
        name: "Nike Air Max",
        slug: "nike-air-max",
        description: "Iconic lifestyle and running sneaker with visible Max Air cushioning and breathable modern mesh.",
        brand: "Nike",
        category: "Sports",
        price: 12999,
        discountPrice: 8999,
        discountPercentage: 31,
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80"
        ],
        stock: 45,
        rating: 4.6,
        numReviews: 3200,
        features: ["Max Air heel unit", "Breathable mesh overlays", "Waffle-inspired rubber outsole", "Padded low-cut collar"],
        specifications: {
            "Upper": "Textile and Synthetic mesh",
            "Sole": "High-durability Rubber",
            "Closure": "Lace-Up",
            "Ideal For": "Running, Gym & Everyday Streetwear"
        },
        tags: ["shoes", "sneakers", "nike", "running", "sports", "fashion"],
        isFeatured: true,
        isTrending: true,
        badge: "31% OFF"
    },
    {
        id: "prod-4",
        name: "Samsung Galaxy Watch 6",
        slug: "samsung-galaxy-watch-6",
        description: "Advanced sleep coaching, ECG sensor, sapphire crystal glass, and personalized heart rate zones.",
        brand: "Samsung",
        category: "Electronics",
        price: 29999,
        discountPrice: 24999,
        discountPercentage: 17,
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80"
        ],
        stock: 22,
        rating: 4.5,
        numReviews: 1100,
        features: ["Advanced Sleep Coaching", "Body Composition Analysis", "Sapphire Crystal Glass", "Fast Wireless Charging"],
        specifications: {
            "Display": "Super AMOLED Always On",
            "OS": "Wear OS powered by Samsung",
            "Water Resistance": "5ATM + IP68",
            "Sensors": "BioActive, ECG, Temperature"
        },
        tags: ["smartwatch", "wearable", "samsung", "fitness", "health"],
        isFeatured: true,
        isTrending: true,
        badge: "17% OFF"
    },
    {
        id: "prod-5",
        name: "The Alchemist (Book)",
        slug: "the-alchemist-book",
        description: "Paulo Coelho's masterpiece about following your dreams, listening to your heart, and reading life's omens.",
        brand: "HarperCollins",
        category: "Books",
        price: 599,
        discountPrice: 399,
        discountPercentage: 33,
        images: [
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80"
        ],
        stock: 120,
        rating: 4.8,
        numReviews: 6200,
        features: ["International Best Seller", "Collector's Paperback Edition", "Inspiring Philosophical Novel"],
        specifications: {
            "Author": "Paulo Coelho",
            "Language": "English",
            "Pages": "208",
            "Publisher": "HarperCollins India"
        },
        tags: ["books", "fiction", "bestseller", "philosophy", "reading"],
        isFeatured: true,
        isTrending: true,
        badge: "33% OFF"
    },
    {
        id: "prod-6",
        name: "Minimalist Skincare Kit",
        slug: "minimalist-skincare-kit",
        description: "Complete daily routine with Salicylic Acid Cleanser, Niacinamide 10% Serum, and Ceramide Moisturizer.",
        brand: "Minimalist",
        category: "Beauty",
        price: 1999,
        discountPrice: 1299,
        discountPercentage: 35,
        images: [
            "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1608248597359-012e84c98fec?w=800&auto=format&fit=crop&q=80"
        ],
        stock: 80,
        rating: 4.6,
        numReviews: 2800,
        features: ["Fragrance Free", "Cruelty Free & Vegan", "Formulated with pure active ingredients", "Suitable for all skin types"],
        specifications: {
            "Included Items": "Cleanser (100ml), Serum (30ml), Cream (50g)",
            "Skin Type": "Oily, Combination & Acne-Prone",
            "Certifications": "Dermatologically Tested",
            "Country of Origin": "India"
        },
        tags: ["skincare", "beauty", "minimalist", "serum", "clean-beauty"],
        isFeatured: true,
        isTrending: true,
        badge: "35% OFF"
    },
    {
        id: "prod-7",
        name: "Lenovo ThinkBook 15 G4 (Coding Edition)",
        slug: "lenovo-thinkbook-15-g4",
        description: "Powerful laptop engineered for coding and multitasking with 12th Gen Intel Core i5, 16GB RAM, 512GB NVMe SSD.",
        brand: "Lenovo",
        category: "Electronics",
        price: 58990,
        discountPrice: 47990,
        discountPercentage: 18,
        images: [
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80"
        ],
        stock: 15,
        rating: 4.7,
        numReviews: 920,
        features: ["16GB Dual-Channel RAM", "512GB Gen4 M.2 NVMe SSD", "FHD IPS Antiglare screen", "Backlit ergonomic keyboard"],
        specifications: {
            "Processor": "Intel Core i5-1235U (10 Cores, up to 4.4GHz)",
            "RAM": "16GB DDR4 3200MHz",
            "Storage": "512GB SSD M.2 PCIe",
            "Display": "15.6-inch Full HD (1920x1080) IPS 300nits"
        },
        tags: ["laptop", "coding", "lenovo", "budget-laptop", "under 50000", "programming"],
        isFeatured: true,
        isTrending: false,
        badge: "Best for Coding"
    },
    {
        id: "prod-8",
        name: "Apple MacBook Air M2",
        slug: "apple-macbook-air-m2",
        description: "Strikingly thin design with all-day battery life, brilliant Liquid Retina display, and supercharged M2 chip.",
        brand: "Apple",
        category: "Electronics",
        price: 114900,
        discountPrice: 94900,
        discountPercentage: 17,
        images: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80"
        ],
        stock: 14,
        rating: 4.9,
        numReviews: 4320,
        features: ["Apple M2 chip 8-core CPU", "13.6-inch Liquid Retina display", "18 hours battery life", "MagSafe 3 charging"],
        specifications: {
            "Processor": "Apple M2 Chip",
            "Memory": "8GB Unified Memory (Configurable)",
            "Storage": "256GB / 512GB SSD",
            "Weight": "1.24 kg (2.7 lb)"
        },
        tags: ["laptop", "apple", "macbook", "m2", "developer", "creator"],
        isFeatured: true,
        isTrending: true,
        badge: "Editor's Choice"
    },
    {
        id: "prod-9",
        name: "ASUS ROG Strix G16 Gaming Laptop",
        slug: "asus-rog-strix-g16",
        description: "Dominate the game with 13th Gen Intel Core i7, NVIDIA GeForce RTX 4060, and 165Hz FHD display.",
        brand: "ASUS",
        category: "Electronics",
        price: 119990,
        discountPrice: 84990,
        discountPercentage: 29,
        images: [
            "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80"
        ],
        stock: 10,
        rating: 4.8,
        numReviews: 870,
        features: ["NVIDIA RTX 4060 8GB GDDR6", "165Hz 7ms Refresh Display", "ROG Intelligent Cooling Liquid Metal", "Per-key RGB"],
        specifications: {
            "Graphics": "RTX 4060 (140W TGP)",
            "RAM": "16GB DDR5 4800MHz",
            "Storage": "1TB PCIe 4.0 NVMe SSD",
            "Screen": "16-inch 16:10 FHD+ 165Hz"
        },
        tags: ["gaming", "laptop", "rog", "rtx4060", "asus", "under 90000"],
        isFeatured: true,
        isTrending: false,
        badge: "29% OFF"
    },
    {
        id: "prod-10",
        name: "Italian Wool Tailored Trench Coat",
        slug: "italian-wool-tailored-trench-coat",
        description: "Exquisite craftsmanship tailored from fine Italian wool blend. Features double-breasted closure and silk lining.",
        brand: "Atelier Mode",
        category: "Fashion",
        price: 18999,
        discountPrice: 12499,
        discountPercentage: 34,
        images: [
            "https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80"
        ],
        stock: 20,
        rating: 4.7,
        numReviews: 640,
        features: ["70% Virgin Italian Wool", "Water-resistant finish", "Internal passport pocket", "Tortoiseshell buttons"],
        specifications: {
            "Fit": "Tailored Relaxed",
            "Care": "Dry Clean Only",
            "Color": "Classic Camel & Charcoal",
            "Origin": "Milan, Italy"
        },
        tags: ["fashion", "coat", "winter", "luxury", "outerwear"],
        isFeatured: true,
        isTrending: true,
        badge: "34% OFF"
    },
    {
        id: "prod-11",
        name: "Nordic Minimalist Ceramic Sofa Table & Lamp",
        slug: "nordic-minimalist-ceramic-table-lamp",
        description: "Sculptural lighting piece created from hand-thrown matte ceramic with warm ambient dimmer.",
        brand: "Nordic Lumina",
        category: "Home & Living",
        price: 8499,
        discountPrice: 5299,
        discountPercentage: 37,
        images: [
            "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80"
        ],
        stock: 32,
        rating: 4.8,
        numReviews: 490,
        features: ["Hand-crafted stoneware", "Touch dimmer sensor (2700K Warm)", "Braided linen power cable"],
        specifications: {
            "Dimensions": "32cm H x 22cm W",
            "Bulb Type": "E27 Warm LED (Included)",
            "Material": "Textured Sand Ceramic",
            "Power": "12W Energy Saving"
        },
        tags: ["home", "lighting", "decor", "scandinavian", "aesthetic"],
        isFeatured: true,
        isTrending: false,
        badge: "37% OFF"
    },
    {
        id: "prod-12",
        name: "Bose QuietComfort Ultra Earbuds",
        slug: "bose-quietcomfort-ultra-earbuds",
        description: "Groundbreaking spatial audio and world-class noise cancellation tuned to your ear geometry.",
        brand: "Bose",
        category: "Electronics",
        price: 25900,
        discountPrice: 21900,
        discountPercentage: 15,
        images: [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80"
        ],
        stock: 25,
        rating: 4.7,
        numReviews: 1250,
        features: ["CustomTune Technology", "Immersive Audio Mode", "IPX4 Sweat Resistant", "Up to 24-hr with case"],
        specifications: {
            "Battery": "6 hrs per charge, 24 hrs total",
            "Codecs": "aptX Adaptive, AAC, SBC",
            "Microphones": "4 per earbud"
        },
        tags: ["earbuds", "audio", "bose", "music", "gym"],
        isFeatured: false,
        isTrending: true,
        badge: "15% OFF"
    }
];
export const initialOrders = [
    {
        id: "ord-98214",
        orderNumber: "SAI-2026-98214",
        userId: "usr-1",
        userName: "Rakesh Kondela",
        userEmail: "kondelarakesh12@gmail.com",
        items: [
            {
                productId: "prod-1",
                name: "Apple iPhone 15",
                image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80",
                price: 69900,
                quantity: 1
            },
            {
                productId: "prod-2",
                name: "Sony WH-1000XM5",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
                price: 29990,
                quantity: 1
            }
        ],
        shippingAddress: {
            fullName: "Rakesh Kondela",
            phone: "+91 98765 43210",
            street: "Flat 402, Silicon Heights, Hitech City",
            city: "Hyderabad",
            state: "Telangana",
            postalCode: "500081",
            country: "India",
            isDefault: true
        },
        deliveryMethod: "Express Delivery (Guaranteed 24-hr)",
        paymentMethod: "upi",
        paymentStatus: "paid",
        subtotal: 99890,
        discount: 5000,
        shipping: 0,
        tax: 4744,
        totalAmount: 99634,
        status: "Out for Delivery",
        estimatedDelivery: "Today by 6:30 PM",
        trackingSteps: [
            {
                status: "Processing",
                title: "Order Placed & Confirmed",
                description: "Your order details have been verified by ShopMe AI engine.",
                timestamp: "Yesterday, 10:15 AM",
                completed: true
            },
            {
                status: "Confirmed",
                title: "Dispatched from Smart Hub",
                description: "Package sorted at Automated Robotics Facility, Hyderabad.",
                timestamp: "Yesterday, 04:30 PM",
                completed: true
            },
            {
                status: "Shipped",
                title: "In Transit to Local Delivery Station",
                description: "Arrived at Hitech City Hub.",
                timestamp: "Today, 06:10 AM",
                completed: true
            },
            {
                status: "Out for Delivery",
                title: "Out for Delivery with Courier Associate",
                description: "Agent Suresh (ID #SH-409) is on the way. OTP will be required on delivery.",
                timestamp: "Today, 08:45 AM",
                completed: true,
                current: true
            },
            {
                status: "Delivered",
                title: "Delivered to Customer",
                description: "Package handed over with digital signature.",
                timestamp: "Pending",
                completed: false
            }
        ],
        createdAt: new Date(Date.now() - 86400000).toISOString()
    }
];
export const defaultUser = {
    id: "usr-1",
    name: "Rakesh",
    email: "kondelarakesh12@gmail.com",
    avatar: "",
    role: "admin",
    addresses: [
        {
            id: "addr-1",
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
    wishlist: ["prod-1", "prod-3"],
    aiPreferences: {
        favoriteCategories: ["Electronics", "Fashion"],
        budgetTier: "Premium",
        techSavvy: true,
        style: "Modern Minimal"
    }
};
