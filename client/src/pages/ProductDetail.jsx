import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Star, Heart, ShoppingBag, Minus, Plus, ChevronDown,
    Truck, RotateCcw, Shield, Award, Share2, ArrowLeft, MapPin, Loader2
} from 'lucide-react';
import { fetchProductBySlug } from '../services/api';
import { getProductById } from '../data/productsData';
import products from '../data/productsData';

/**
 * ProductDetail - Lumière-inspired elegant product detail page
 * Refined spacing, breathing room, artisan info included
 */
const ProductDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();

    // ALL useState hooks must be at the top, before any conditional returns
    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [openAccordion, setOpenAccordion] = useState('description');
    const [selectedVariants, setSelectedVariants] = useState({});
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // ALL useRef hooks
    const mainRef = useRef(null);

    // ALL custom hooks
    const isMainInView = useInView(mainRef, { once: true, amount: 0.1 });

    // ALL useEffect hooks must be before conditional returns
    useEffect(() => {
        const loadProduct = async () => {
            setIsLoading(true);
            try {
                const apiProduct = await fetchProductBySlug(slug);
                if (apiProduct) {
                    setProduct(apiProduct);
                } else {
                    const staticProduct = getProductById(slug) ||
                        products.find(p => p.id === parseInt(slug) || p.slug === slug);
                    setProduct(staticProduct || null);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                const staticProduct = getProductById(slug) ||
                    products.find(p => p.id === parseInt(slug) || p.slug === slug);
                setProduct(staticProduct || null);
            }
            setIsLoading(false);
        };
        loadProduct();
    }, [slug]);

    // Initialize variants when product changes
    useEffect(() => {
        if (product?.variants && typeof product.variants === 'object') {
            const initial = {};
            Object.entries(product.variants).forEach(([key, values]) => {
                if (Array.isArray(values) && values.length > 0) {
                    initial[key] = values[0];
                }
            });
            setSelectedVariants(initial);
        }
    }, [product]);

    // ALL useMemo hooks
    const recommendedProducts = useMemo(() => {
        return products.filter(p => p.id !== product?.id && p._id !== product?._id).slice(0, 4);
    }, [product]);

    // Helper functions (not hooks)
    const handleQuantityChange = (delta) => {
        const newQuantity = quantity + delta;
        if (newQuantity >= 1 && newQuantity <= 99) setQuantity(newQuantity);
    };

    const toggleAccordion = (section) => {
        setOpenAccordion(openAccordion === section ? null : section);
    };

    // Animation variants (just objects, not hooks)
    const slideUpVariants = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const trustBadges = [
        { icon: Truck, title: 'Free Shipping', desc: 'On all orders over $50' },
        { icon: RotateCcw, title: '30-Day Returns', desc: 'Easy returns policy' },
        { icon: Shield, title: 'Secure Payment', desc: 'Encrypted transactions' },
        { icon: Award, title: 'Premium Quality', desc: 'Certified authentic' },
    ];

    // NOW we can have conditional returns (after all hooks are called)
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37] mx-auto mb-4" />
                    <p className="text-[#666]">Loading product...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="font-display text-4xl text-[#333] italic mb-4">Product Not Found</h1>
                    <p className="text-[#666] mb-6">The product you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/products')}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#333] text-white text-sm tracking-wider uppercase hover:bg-[#222] transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    // Safe getters for product data
    const productImage = product.images?.[mainImage] || product.image || 'https://via.placeholder.com/600';
    const productPrice = typeof product.price === 'number' ? product.price.toFixed(2) : '0.00';
    const productComparePrice = typeof product.compareAtPrice === 'number' ? product.compareAtPrice.toFixed(2) : null;
    const productRating = product.rating || 4.5;
    const productReviews = product.reviewCount || product.reviews || 0;
    const productArtisan = typeof product.artisan === 'string' ? product.artisan : (product.artisan?.name || 'Master Artisan');
    const productOrigin = product.origin || 'Heritage Craft Region';

    return (
        <div className="min-h-screen bg-[#FAF9F7]">
            {/* Compact Breadcrumb */}
            <div className="bg-[#FAF9F7] border-b border-[#e8e5e0]">
                <div className="container-custom py-3">
                    <div className="flex items-center gap-2 text-xs text-[#999]">
                        <Link to="/" className="hover:text-[#333] transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/products" className="hover:text-[#333] transition-colors">Shop</Link>
                        <span>/</span>
                        <span className="text-[#333]">{product.name}</span>
                    </div>
                </div>
            </div>

            {/* Main Product Section */}
            <motion.div
                ref={mainRef}
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="container-custom py-12"
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* LEFT: Product Image */}
                    <motion.div variants={slideUpVariants}>
                        <div className="relative aspect-square overflow-hidden bg-[#f0ede8] mb-4">
                            <motion.img
                                key={mainImage}
                                initial={{ opacity: 0, scale: 1.02 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                                src={productImage}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {product.badge && (
                                <span className="absolute top-4 left-4 px-3 py-1.5 bg-[#1a365d] text-white text-[10px] tracking-wider uppercase font-medium">
                                    {product.badge === 'New' ? 'NEW ARRIVAL' : product.badge}
                                </span>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {Array.isArray(product.images) && product.images.length > 1 && (
                            <div className="flex gap-3">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setMainImage(idx)}
                                        className={`w-20 h-20 overflow-hidden border-2 transition-all ${mainImage === idx
                                            ? 'border-[#D4AF37]'
                                            : 'border-transparent hover:border-[#ddd]'
                                            }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* RIGHT: Product Info */}
                    <motion.div variants={slideUpVariants} className="lg:pt-4">
                        {/* Category */}
                        <div className="flex items-center gap-3 mb-4">
                            <p className="text-xs text-[#D4AF37] tracking-[0.15em] uppercase font-medium">
                                {product.category || 'ARTISAN GOODS'}
                            </p>
                        </div>

                        {/* Title */}
                        <h1 className="font-display text-3xl md:text-4xl lg:text-[42px] text-[#333] italic mb-5 leading-[1.1]">
                            {product.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={i < Math.floor(productRating)
                                            ? 'fill-[#D4AF37] text-[#D4AF37]'
                                            : 'text-[#ddd]'
                                        }
                                    />
                                ))}
                            </div>
                            <span className="text-sm text-[#666]">
                                {productRating} · {productReviews} reviews
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mb-8">
                            <span className="text-4xl font-display text-[#333]">
                                ${productPrice}
                            </span>
                            {productComparePrice && parseFloat(productComparePrice) > parseFloat(productPrice) && (
                                <span className="ml-4 text-lg text-[#999] line-through">
                                    ${productComparePrice}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-[#555] text-base leading-[1.8] mb-8 max-w-lg">
                            {product.shortDescription || (product.description ? product.description.substring(0, 180) : '')}
                        </p>

                        {/* Stock Status */}
                        <div className="flex items-center gap-2 mb-10">
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                            <span className="text-sm text-[#555]">
                                In stock and <span className="underline">ready to ship</span>
                            </span>
                        </div>

                        {/* Variants */}
                        {product.variants && typeof product.variants === 'object' && Object.entries(product.variants).map(([variantType, options]) => {
                            if (!Array.isArray(options) || options.length === 0) return null;
                            return (
                                <div key={variantType} className="mb-8">
                                    <label className="text-xs font-medium uppercase tracking-[0.15em] text-[#333] mb-4 block">
                                        {variantType}
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {options.map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => setSelectedVariants({ ...selectedVariants, [variantType]: option })}
                                                className={`px-6 py-3 text-sm border transition-all ${selectedVariants[variantType] === option
                                                    ? 'border-[#333] bg-[#333] text-white'
                                                    : 'border-[#ddd] text-[#555] hover:border-[#333]'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}

                        {/* Quantity */}
                        <div className="flex items-center gap-8 mb-10">
                            <label className="text-xs font-medium uppercase tracking-[0.15em] text-[#333]">
                                Quantity
                            </label>
                            <div className="inline-flex items-center border border-[#ddd]">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    className="w-12 h-12 flex items-center justify-center hover:bg-[#f5f5f5] text-[#666] transition-colors"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-12 text-center text-base font-medium text-[#333]">{quantity}</span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    className="w-12 h-12 flex items-center justify-center hover:bg-[#f5f5f5] text-[#666] transition-colors"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Add to Bag + Wishlist + Share */}
                        <div className="flex gap-3 mb-12">
                            <button className="flex-1 py-4 bg-[#333] text-white text-xs tracking-[0.2em] uppercase font-medium flex items-center justify-center gap-3 hover:bg-[#222] transition-colors">
                                <ShoppingBag size={18} />
                                Add to Bag
                            </button>
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className={`w-14 h-14 border flex items-center justify-center transition-colors ${isWishlisted
                                    ? 'border-[#e84a7f] bg-[#fef2f5]'
                                    : 'border-[#ddd] hover:border-[#333]'
                                    }`}
                            >
                                <Heart
                                    size={20}
                                    className={isWishlisted ? 'fill-[#e84a7f] text-[#e84a7f]' : 'text-[#666]'}
                                />
                            </button>
                            <button className="w-14 h-14 border border-[#ddd] flex items-center justify-center hover:border-[#333] transition-colors">
                                <Share2 size={20} className="text-[#666]" />
                            </button>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-6 py-8 border-y border-[#e8e5e0]">
                            {trustBadges.map((badge, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <badge.icon size={22} className="text-[#666] mt-0.5" strokeWidth={1.5} />
                                    <div>
                                        <p className="text-sm font-medium text-[#333]">{badge.title}</p>
                                        <p className="text-xs text-[#999] mt-0.5">{badge.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Accordion Sections */}
            <section className="border-t border-[#e8e5e0] bg-white">
                <div className="container-custom max-w-4xl">
                    {/* Description */}
                    <div className="border-b border-[#e8e5e0]">
                        <button
                            onClick={() => toggleAccordion('description')}
                            className="w-full flex items-center justify-between py-6 text-left"
                        >
                            <span className="text-base font-medium text-[#333]">Description</span>
                            <ChevronDown
                                size={20}
                                className={`text-[#666] transition-transform ${openAccordion === 'description' ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <AnimatePresence>
                            {openAccordion === 'description' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-8 text-[#666] text-[15px] leading-[1.9] space-y-4">
                                        <p>{product.description}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Artisan */}
                    <div className="border-b border-[#e8e5e0]">
                        <button
                            onClick={() => toggleAccordion('artisan')}
                            className="w-full flex items-center justify-between py-6 text-left"
                        >
                            <span className="text-base font-medium text-[#333]">About the Artisan</span>
                            <ChevronDown
                                size={20}
                                className={`text-[#666] transition-transform ${openAccordion === 'artisan' ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <AnimatePresence>
                            {openAccordion === 'artisan' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-8">
                                        <div className="flex items-start gap-4 mb-4">
                                            <div className="w-16 h-16 rounded-full bg-[#f0ede8] overflow-hidden flex-shrink-0 flex items-center justify-center text-[#D4AF37]">
                                                <Award size={28} />
                                            </div>
                                            <div>
                                                <h4 className="font-display text-xl text-[#333] italic mb-1">
                                                    {productArtisan}
                                                </h4>
                                                <p className="text-sm text-[#D4AF37] flex items-center gap-1">
                                                    <MapPin size={14} />
                                                    {productOrigin}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-[#666] text-[15px] leading-[1.9]">
                                            Our family has been practicing this craft for generations. Each product is made with love, tradition, and the finest locally-sourced ingredients. We take pride in preserving ancient techniques while creating products that bring joy to modern homes.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Nutritional Info */}
                    {product.nutritionalInfo && (
                        <div className="border-b border-[#e8e5e0]">
                            <button
                                onClick={() => toggleAccordion('nutrition')}
                                className="w-full flex items-center justify-between py-6 text-left"
                            >
                                <span className="text-base font-medium text-[#333]">Nutritional Information</span>
                                <ChevronDown
                                    size={20}
                                    className={`text-[#666] transition-transform ${openAccordion === 'nutrition' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <AnimatePresence>
                                {openAccordion === 'nutrition' && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-8">
                                            <div className="bg-[#f8f7f5] rounded-lg p-6">
                                                <p className="text-sm text-[#666] mb-4">
                                                    Serving Size: {product.nutritionalInfo.serving_size || 'N/A'}
                                                </p>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    <div className="text-center p-3 bg-white rounded-lg">
                                                        <p className="text-2xl font-semibold text-[#333]">{product.nutritionalInfo.calories || 0}</p>
                                                        <p className="text-xs text-[#666] mt-1">Calories</p>
                                                    </div>
                                                    {product.nutritionalInfo.fat && (
                                                        <div className="text-center p-3 bg-white rounded-lg">
                                                            <p className="text-2xl font-semibold text-[#333]">{product.nutritionalInfo.fat}</p>
                                                            <p className="text-xs text-[#666] mt-1">Fat</p>
                                                        </div>
                                                    )}
                                                    {product.nutritionalInfo.carbs && (
                                                        <div className="text-center p-3 bg-white rounded-lg">
                                                            <p className="text-2xl font-semibold text-[#333]">{product.nutritionalInfo.carbs}</p>
                                                            <p className="text-xs text-[#666] mt-1">Carbs</p>
                                                        </div>
                                                    )}
                                                    {product.nutritionalInfo.protein && (
                                                        <div className="text-center p-3 bg-white rounded-lg">
                                                            <p className="text-2xl font-semibold text-[#333]">{product.nutritionalInfo.protein}</p>
                                                            <p className="text-xs text-[#666] mt-1">Protein</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Ingredients */}
                    {product.ingredients && (
                        <div className="border-b border-[#e8e5e0]">
                            <button
                                onClick={() => toggleAccordion('ingredients')}
                                className="w-full flex items-center justify-between py-6 text-left"
                            >
                                <span className="text-base font-medium text-[#333]">Ingredients</span>
                                <ChevronDown
                                    size={20}
                                    className={`text-[#666] transition-transform ${openAccordion === 'ingredients' ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <AnimatePresence>
                                {openAccordion === 'ingredients' && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-8">
                                            <div className="bg-[#FAF9F7] rounded-none p-6 border border-[#e8e5e0]">
                                                <p className="text-[#333] text-[13px] uppercase tracking-[0.08em] leading-[2.2] font-medium">
                                                    {typeof product.ingredients === 'string'
                                                        ? product.ingredients
                                                        : Array.isArray(product.ingredients) ? product.ingredients.join(' • ') : ''}
                                                </p>
                                                {Array.isArray(product.dietary) && product.dietary.length > 0 && (
                                                    <div className="mt-6 flex flex-wrap gap-2 pt-6 border-t border-[#e8e5e0]">
                                                        {product.dietary.map((tag, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="px-3 py-1.5 border border-[#e8e5e0] text-[#666] text-[10px] tracking-widest uppercase font-medium bg-white"
                                                            >
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Shipping */}
                    <div className="border-b border-[#e8e5e0]">
                        <button
                            onClick={() => toggleAccordion('shipping')}
                            className="w-full flex items-center justify-between py-6 text-left"
                        >
                            <span className="text-base font-medium text-[#333]">Shipping & Returns</span>
                            <ChevronDown
                                size={20}
                                className={`text-[#666] transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <AnimatePresence>
                            {openAccordion === 'shipping' && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-8 text-[#666] text-[15px] leading-[1.9] space-y-3">
                                        <p>• Free standard shipping on orders over $50</p>
                                        <p>• Express shipping available (2-3 business days)</p>
                                        <p>• 30-day return policy for unopened items</p>
                                        <p>• Contact support for return authorization</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* Recommended Products */}
            {recommendedProducts.length > 0 && (
                <section className="py-20 bg-[#FAF9F7]">
                    <div className="container-custom">
                        <h2 className="font-display text-3xl md:text-4xl text-[#333] italic text-center mb-14">
                            Curated For You
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {recommendedProducts.map((prod) => (
                                <Link
                                    key={prod.id || prod._id}
                                    to={`/products/${prod.slug || prod.id}`}
                                    className="group"
                                >
                                    <div className="aspect-square overflow-hidden bg-[#f0ede8] mb-4">
                                        <img
                                            src={prod.images?.[0] || prod.image || 'https://via.placeholder.com/400'}
                                            alt={prod.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <h3 className="text-sm text-[#333] font-medium mb-1">{prod.name}</h3>
                                    <p className="text-sm text-[#666]">${prod.price?.toFixed(2) || '0.00'}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetail;
