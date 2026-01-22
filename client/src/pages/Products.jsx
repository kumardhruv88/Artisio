import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Grid3X3, LayoutGrid, Star, ShoppingBag, X, Heart, TrendingUp, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fetchProducts, API_CATEGORIES } from '../services/api';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
// Fallback to static data if API fails
import staticProducts, { getProductsByCategory as getStaticProducts, categories as staticCategories } from '../data/productsData';

const PRODUCTS_PER_PAGE = 12;

const Products = () => {
    const heroRef = useRef(null);
    const shopRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });
    const isShopInView = useInView(shopRef, { once: true, amount: 0.1 });
    const [activeCategory, setActiveCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
    const [sortBy, setSortBy] = useState('newest');
    const [gridView, setGridView] = useState(3);
    const [priceRange, setPriceRange] = useState([0, 5000]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    // Use global context instead of local state
    const { isInWishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();

    // API State
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [useApi, setUseApi] = useState(true);

    // Fetch products from API on mount
    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            try {
                const data = await fetchProducts();
                if (data && data.length > 0) {
                    setApiProducts(data);
                    setUseApi(true);
                } else {
                    // Fallback to static data
                    setUseApi(false);
                }
            } catch (error) {
                console.error('API Error, using static data:', error);
                setUseApi(false);
            }
            setIsLoading(false);
        };
        loadProducts();
    }, []);

    // Dynamic categories based on source
    const categories = useApi ? API_CATEGORIES : staticCategories;

    // Category groups for sidebar
    const categoryGroups = {
        'FOODS': ['Coffee', 'Chocolate', 'Honey & Preserves', 'Tea', 'Spices'],
        'BEVERAGES': ['Beverages'],
        'PANTRY': ['Oils & Vinegars', 'Pasta & Grains', 'Condiments'],
        'OTHER': ['Cheese', 'Bakery', 'Nuts & Snacks'],
    };

    // Search categories for dropdown
    const searchCategories = ['All', 'Coffee', 'Chocolate', 'Tea', 'Honey & Preserves'];

    // Popular search suggestions
    const popularSearches = [
        'Artisan Coffee',
        'Dark Chocolate',
        'Organic Honey',
        'Gift Sets',
        'New Arrivals',
    ];

    // Text animation variants
    const textVariants = {
        hidden: { opacity: 0, y: 80, clipPath: 'inset(100% 0 0 0)' },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0 0 0)',
            transition: { duration: 1.2, delay: 0.3 + i * 0.25, ease: [0.19, 1, 0.22, 1] }
        })
    };

    // Slide-up animation for shop section
    const slideUpVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
        }
    };

    // Filter products by category and search
    const filteredProducts = useMemo(() => {
        // Choose data source based on API availability
        const allProducts = useApi ? apiProducts : staticProducts;

        // Filter by category
        let result = activeCategory === 'All'
            ? allProducts
            : allProducts.filter(p => p.category === activeCategory);

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(query) ||
                (p.category && p.category.toLowerCase().includes(query)) ||
                (typeof p.artisan === 'string' && p.artisan.toLowerCase().includes(query)) ||
                (p.artisan?.name && p.artisan.name.toLowerCase().includes(query))
            );
        }
        return result;
    }, [activeCategory, searchQuery, apiProducts, useApi]);

    // Get visible products for pagination
    const visibleProducts = useMemo(() => {
        return filteredProducts.slice(0, visibleCount);
    }, [filteredProducts, visibleCount]);

    // Reset visible count when category changes
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setVisibleCount(PRODUCTS_PER_PAGE);
        setIsSearchFocused(false);
    };

    // Load more products
    const handleLoadMore = () => {
        setVisibleCount(prev => prev + PRODUCTS_PER_PAGE);
    };

    const hasMoreProducts = visibleCount < filteredProducts.length;

    // Clear all filters
    const clearFilters = () => {
        setActiveCategory('All');
        setPriceRange([0, 5000]);
        setSearchQuery('');
    };

    // Handle wishlist toggle with global context
    const handleWishlistToggle = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    // Handle add to cart
    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
    };

    // Handle search suggestion click
    const handleSearchSuggestion = (suggestion) => {
        setSearchQuery(suggestion);
        setIsSearchFocused(false);
    };

    return (
        <div className="min-h-screen bg-[#FAF9F7]">
            {/* HERO SECTION - Full Screen */}
            <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1920&q=80"
                        alt="Artisan Food Collection"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="overflow-hidden">
                            <motion.h1
                                custom={0}
                                variants={textVariants}
                                initial="hidden"
                                animate={isHeroInView ? "visible" : "hidden"}
                                className="font-display text-6xl md:text-8xl lg:text-9xl text-white italic leading-[0.9]"
                            >
                                Shop
                            </motion.h1>
                        </div>
                        <div className="overflow-hidden">
                            <motion.h1
                                custom={1}
                                variants={textVariants}
                                initial="hidden"
                                animate={isHeroInView ? "visible" : "hidden"}
                                className="font-display text-6xl md:text-8xl lg:text-9xl text-secondary italic leading-[0.9]"
                            >
                                Collection
                            </motion.h1>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50"
                >
                    <span className="text-xs tracking-[0.3em] uppercase mb-3">Explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-[1px] h-10 bg-white/30"
                    />
                </motion.div>
            </section>

            {/* SHOP SECTION - Slides in on scroll */}
            <motion.section
                ref={shopRef}
                initial="hidden"
                animate={isShopInView ? "visible" : "hidden"}
                variants={slideUpVariants}
                className="py-10"
            >
                <div className="container-custom">
                    {/* Top Bar - Search, Sort, Product Count, Grid Toggle */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#e8e5e0]">
                        {/* Search Input with Dropdown */}
                        <div className="relative w-full md:w-80">
                            <div className={`relative border-2 transition-colors ${isSearchFocused ? 'border-[#D4AF37]' : 'border-[#e8e5e0]'} rounded-full`}>
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999]" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    placeholder="Search artisan collections..."
                                    className="w-full pl-12 pr-10 py-3 bg-transparent text-[#333] text-sm placeholder:text-[#999] focus:outline-none rounded-full"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#999] hover:text-[#333]"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Search Dropdown */}
                            <AnimatePresence>
                                {isSearchFocused && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-[#e8e5e0] z-50 overflow-hidden"
                                    >
                                        {/* Category Pills */}
                                        <div className="p-4 border-b border-[#f0ede8]">
                                            <div className="flex flex-wrap gap-2">
                                                {searchCategories.map((cat) => (
                                                    <button
                                                        key={cat}
                                                        onClick={() => handleCategoryChange(cat)}
                                                        className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${activeCategory === cat
                                                            ? 'bg-[#D4AF37] text-white'
                                                            : 'bg-[#f5f3f0] text-[#666] hover:bg-[#e8e5e0]'
                                                            }`}
                                                    >
                                                        {cat === 'All' && '✦ '}
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Popular Searches */}
                                        <div className="p-4">
                                            <p className="flex items-center gap-2 text-[11px] text-[#999] tracking-[0.1em] uppercase mb-3">
                                                <TrendingUp className="w-3.5 h-3.5" />
                                                Popular Now
                                            </p>
                                            <div className="grid grid-cols-2 gap-2">
                                                {popularSearches.map((item) => (
                                                    <button
                                                        key={item}
                                                        onClick={() => handleSearchSuggestion(item)}
                                                        className="flex items-center gap-2 py-2 px-3 text-sm text-[#555] hover:text-[#D4AF37] hover:bg-[#faf8f5] rounded-lg transition-colors text-left"
                                                    >
                                                        <TrendingUp className="w-3.5 h-3.5 text-[#ccc]" />
                                                        {item}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Click outside to close */}
                            {isSearchFocused && (
                                <div
                                    className="fixed inset-0 z-40"
                                    onClick={() => setIsSearchFocused(false)}
                                />
                            )}
                        </div>

                        {/* Right Side Controls */}
                        <div className="flex items-center gap-6">
                            {/* Sort Dropdown */}
                            <div className="relative">
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="appearance-none bg-transparent border border-[#ddd] px-4 py-2.5 pr-10 text-sm text-[#333] cursor-pointer focus:border-[#333] focus:outline-none rounded"
                                >
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="popular">Most Popular</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666] pointer-events-none" />
                            </div>

                            {/* Product Count */}
                            <span className="text-sm text-[#666] hidden md:block">
                                {filteredProducts.length} products
                            </span>

                            {/* Grid View Toggle */}
                            <div className="hidden md:flex items-center gap-1 border-l border-[#ddd] pl-6">
                                <button
                                    onClick={() => setGridView(3)}
                                    className={`p-2 rounded transition-colors ${gridView === 3 ? 'bg-[#f0ede8] text-[#333]' : 'text-[#ccc] hover:text-[#999]'}`}
                                >
                                    <Grid3X3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setGridView(4)}
                                    className={`p-2 rounded transition-colors ${gridView === 4 ? 'bg-[#f0ede8] text-[#333]' : 'text-[#ccc] hover:text-[#999]'}`}
                                >
                                    <LayoutGrid className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Layout - Sidebar + Grid */}
                    <div className="flex gap-12">
                        {/* Left Sidebar - Filters */}
                        <aside className="hidden lg:block w-56 flex-shrink-0">
                            {/* Filters Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-display text-lg text-[#333] italic">Filters</h3>
                                <button
                                    onClick={clearFilters}
                                    className="text-[11px] text-[#999] uppercase tracking-wider hover:text-[#333] transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>

                            {/* Showing count */}
                            <p className="text-sm text-[#666] mb-8">
                                Showing <span className="font-medium text-[#333]">{filteredProducts.length}</span> products
                            </p>

                            {/* Category Filter */}
                            <div className="mb-8">
                                <h4 className="text-sm font-medium text-[#333] mb-4">Category</h4>

                                {/* All Collections */}
                                <button
                                    onClick={() => handleCategoryChange('All')}
                                    className={`flex items-center justify-between w-full py-2 text-sm transition-colors ${activeCategory === 'All'
                                        ? 'text-[#8B3A62] font-medium'
                                        : 'text-[#666] hover:text-[#333]'
                                        }`}
                                >
                                    All Collections
                                    {activeCategory === 'All' && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B3A62]" />
                                    )}
                                </button>

                                {/* Category Groups */}
                                {Object.entries(categoryGroups).map(([group, cats]) => (
                                    <div key={group} className="mt-4">
                                        <p className="text-[10px] text-[#999] tracking-[0.15em] uppercase mb-2">{group}</p>
                                        {cats.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => handleCategoryChange(cat)}
                                                className={`block w-full text-left py-1.5 text-sm transition-colors ${activeCategory === cat
                                                    ? 'text-[#8B3A62] font-medium'
                                                    : 'text-[#666] hover:text-[#333]'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {/* Price Range Filter */}
                            <div className="mb-8">
                                <h4 className="text-sm font-medium text-[#333] mb-4">Price Range</h4>
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full accent-[#D4AF37] cursor-pointer"
                                />
                                <div className="flex justify-between text-sm text-[#666] mt-2">
                                    <span>$0</span>
                                    <span>-</span>
                                    <span>${priceRange[1].toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Quick Filters */}
                            <div className="mb-8">
                                <h4 className="text-sm font-medium text-[#333] mb-4">Quick Filters</h4>
                                <div className="space-y-2">
                                    {['New Arrivals', 'On Sale', 'Best Sellers', 'Gift Sets'].map((filter) => (
                                        <label key={filter} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 accent-[#D4AF37] cursor-pointer"
                                            />
                                            <span className="text-sm text-[#666] group-hover:text-[#333] transition-colors">
                                                {filter}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setShowMobileFilters(true)}
                            className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3 bg-[#333] text-white text-sm tracking-wider uppercase shadow-lg rounded-full"
                        >
                            Filters
                        </button>

                        {/* Product Grid */}
                        <div className="flex-1">
                            <div className={`grid gap-8 ${gridView === 4
                                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                                }`}>
                                {isLoading ? (
                                    /* Loading State */
                                    <div className="col-span-full flex flex-col items-center justify-center py-20">
                                        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37] mb-4" />
                                        <p className="text-[#666] text-sm">Loading products from database...</p>
                                    </div>
                                ) : visibleProducts.length === 0 ? (
                                    /* Empty State */
                                    <div className="col-span-full flex flex-col items-center justify-center py-20">
                                        <p className="text-[#666] text-lg mb-2">No products found</p>
                                        <p className="text-[#999] text-sm">Try adjusting your filters or search query</p>
                                    </div>
                                ) : (
                                    visibleProducts.map((product, index) => (
                                        <motion.div
                                            key={product._id || product.id}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true, amount: 0.2 }}
                                            transition={{
                                                delay: (index % 4) * 0.1,
                                                duration: 0.6,
                                                ease: [0.19, 1, 0.22, 1]
                                            }}
                                            className="group"
                                        >
                                            <Link to={`/products/${product.slug || product.id}`} className="block">
                                                {/* Image Container - Taller aspect ratio like Lumière */}
                                                <div className="relative aspect-[3/4] overflow-hidden bg-[#f0ede8] mb-4 rounded-sm">
                                                    {/* Badges - Top Left */}
                                                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                                        {product.badge === 'New' && (
                                                            <span className="px-3 py-1.5 bg-[#D4AF37] text-white text-[10px] tracking-wider uppercase font-semibold rounded-sm">
                                                                NEW
                                                            </span>
                                                        )}
                                                        {product.salePrice && (
                                                            <span className="px-3 py-1.5 bg-[#D4AF37] text-white text-[10px] tracking-wider uppercase font-semibold rounded-sm">
                                                                -{Math.round((1 - product.salePrice / product.price) * 100)}%
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Wishlist Heart Button - Top Right */}
                                                    <button
                                                        onClick={(e) => handleWishlistToggle(e, product)}
                                                        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:scale-110 transition-transform"
                                                    >
                                                        <Heart
                                                            className={`w-5 h-5 transition-colors ${isInWishlist(product._id || product.id)
                                                                ? 'fill-[#e84a7f] text-[#e84a7f]'
                                                                : 'text-[#999] hover:text-[#e84a7f]'
                                                                }`}
                                                        />
                                                    </button>

                                                    {/* Product Image */}
                                                    <motion.img
                                                        src={product.images?.[0] || product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                        whileHover={{ scale: 1.05 }}
                                                        transition={{ duration: 0.5 }}
                                                    />

                                                    {/* Golden Hover Overlay */}
                                                    <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/15 transition-colors duration-300 pointer-events-none" />

                                                    {/* ADD TO BAG Button */}
                                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                                        <button
                                                            onClick={(e) => handleAddToCart(e, product)}
                                                            className="w-full py-4 bg-[#D4AF37] text-white text-xs tracking-[0.15em] uppercase font-semibold flex items-center justify-center gap-2 hover:bg-[#c9a432] transition-colors rounded-sm"
                                                        >
                                                            <ShoppingBag className="w-4 h-4" />
                                                            Add to Bag
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Product Info */}
                                                <div>
                                                    {/* Category */}
                                                    <p className="text-[10px] text-[#D4AF37] tracking-[0.15em] uppercase mb-1 font-medium">
                                                        {product.category || 'ARTISAN GOODS'}
                                                    </p>

                                                    {/* Name */}
                                                    <h3 className="font-display text-base text-[#333] mb-2 group-hover:text-[#8B3A62] transition-colors italic">
                                                        {product.name}
                                                    </h3>

                                                    {/* Rating */}
                                                    <div className="flex items-center gap-1.5 mb-2">
                                                        <div className="flex">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-3.5 h-3.5 ${i < Math.floor(product.rating)
                                                                        ? 'fill-[#D4AF37] text-[#D4AF37]'
                                                                        : 'fill-[#e0ddd6] text-[#e0ddd6]'
                                                                        }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-[11px] text-[#999]">({product.reviewCount || product.reviews || 0})</span>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-base font-semibold text-[#333]">
                                                            ${(product.price || 0).toFixed(2)}
                                                        </span>
                                                        {(product.compareAtPrice || product.salePrice) && (
                                                            <span className="text-sm text-[#999] line-through">
                                                                ${(product.compareAtPrice || product.salePrice || 0).toFixed(2)}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        </motion.div>
                                    ))
                                )}
                            </div>

                            {/* Load More */}
                            {hasMoreProducts && (
                                <div className="text-center mt-14">
                                    <button
                                        onClick={handleLoadMore}
                                        className="px-12 py-4 border-2 border-[#333] text-[#333] text-xs tracking-[0.15em] uppercase font-medium hover:bg-[#333] hover:text-white transition-all"
                                    >
                                        Load More Products
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {showMobileFilters && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                        onClick={() => setShowMobileFilters(false)}
                    >
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'tween', duration: 0.3 }}
                            onClick={(e) => e.stopPropagation()}
                            className="fixed left-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto"
                        >
                            <div className="p-6">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="font-display text-xl text-[#333] italic">Filters</h3>
                                    <button onClick={() => setShowMobileFilters(false)}>
                                        <X className="w-6 h-6 text-[#666]" />
                                    </button>
                                </div>

                                {/* Category Filter */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-[#333] mb-3">Category</h4>
                                    <button
                                        onClick={() => { handleCategoryChange('All'); setShowMobileFilters(false); }}
                                        className={`block w-full text-left py-2 text-sm ${activeCategory === 'All' ? 'text-[#8B3A62] font-medium' : 'text-[#666]'
                                            }`}
                                    >
                                        All Collections
                                    </button>
                                    {Object.entries(categoryGroups).map(([group, cats]) => (
                                        <div key={group} className="mt-3">
                                            <p className="text-[10px] text-[#999] tracking-wider uppercase mb-2">{group}</p>
                                            {cats.map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => { handleCategoryChange(cat); setShowMobileFilters(false); }}
                                                    className={`block w-full text-left py-1.5 text-sm ${activeCategory === cat ? 'text-[#8B3A62] font-medium' : 'text-[#666]'
                                                        }`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                {/* Price Range */}
                                <div className="mb-6">
                                    <h4 className="text-sm font-medium text-[#333] mb-3">Price Range</h4>
                                    <input
                                        type="range"
                                        min="0"
                                        max="5000"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                        className="w-full accent-[#D4AF37]"
                                    />
                                    <div className="flex justify-between text-sm text-[#666] mt-2">
                                        <span>$0</span>
                                        <span>${priceRange[1].toLocaleString()}</span>
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="w-full py-3 bg-[#D4AF37] text-white text-sm tracking-wider uppercase rounded"
                                >
                                    Apply Filters
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Products;
