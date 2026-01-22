import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { MapPin, Star, ArrowRight, Search, ChevronDown, ShoppingBag } from 'lucide-react';

/**
 * Artisans - Meet the Makers page
 * Adachi-inspired editorial design with alternating layouts
 */
const Artisans = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const heroRef = useRef(null);
    const isHeroInView = useInView(heroRef, { once: true });

    const categories = [
        { id: 'all', label: 'All Artisans', count: 24 },
        { id: 'coffee', label: 'Coffee Roasters', count: 6 },
        { id: 'honey', label: 'Beekeepers', count: 4 },
        { id: 'cheese', label: 'Cheesemakers', count: 3 },
        { id: 'chocolate', label: 'Chocolatiers', count: 5 },
        { id: 'olive-oil', label: 'Olive Growers', count: 4 },
        { id: 'tea', label: 'Tea Masters', count: 2 },
    ];

    // Featured artisans with more detailed data
    const artisans = [
        {
            id: 1,
            name: 'Maria Santos',
            firstName: 'Maria',
            lastName: 'Santos',
            role: 'Master Coffee Roaster',
            specialty: 'Coffee Roaster',
            location: 'Oaxaca, Mexico',
            image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=800',
            heroImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200',
            products: 12,
            rating: 4.9,
            featured: true,
            bio: `With over two decades of experience in coffee cultivation and roasting, Maria Santos has become a legendary figure in the specialty coffee world. Her family's farm in Oaxaca has been producing exceptional beans for three generations.`,
            shortBio: 'Third-generation coffee farmer bringing heritage beans to the world.',
            signature: 'Known for her distinctive light roasts that highlight bright citrus notes and floral aromatics.',
            featuredProducts: [
                { name: 'Oaxacan Single Origin', price: 28.99, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400' },
                { name: 'Heritage Blend', price: 24.99, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400' },
            ]
        },
        {
            id: 2,
            name: 'Pierre Dubois',
            firstName: 'Pierre',
            lastName: 'Dubois',
            role: 'Executive Chocolatier',
            specialty: 'Chocolatier',
            location: 'Lyon, France',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
            heroImage: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1200',
            products: 8,
            rating: 4.8,
            featured: true,
            bio: `Pierre Dubois represents the pinnacle of French chocolate artistry. Trained at the prestigious École du Grand Chocolat Valrhona, he has spent 15 years perfecting the art of bean-to-bar chocolate making.`,
            shortBio: 'Crafting bean-to-bar chocolate with sustainable cacao sources.',
            signature: 'His ganaches are legendary, featuring unexpected flavor combinations that surprise and delight.',
            featuredProducts: [
                { name: 'Dark Truffle Collection', price: 42.00, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400' },
                { name: 'Single Origin Ecuador', price: 18.99, image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400' },
            ]
        },
        {
            id: 3,
            name: 'Elena Rossi',
            firstName: 'Elena',
            lastName: 'Rossi',
            role: 'Olive Oil Producer',
            specialty: 'Olive Grower',
            location: 'Tuscany, Italy',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800',
            heroImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200',
            products: 6,
            rating: 5.0,
            featured: false,
            bio: `The Rossi family has tended olive groves in the rolling hills of Tuscany since 1890. Elena, the fourth generation, combines time-honored traditions with modern sustainability practices.`,
            shortBio: 'Family estate producing award-winning extra virgin olive oil since 1890.',
            signature: 'Her oils are pressed within hours of harvest, preserving the bright, peppery notes.',
            featuredProducts: [
                { name: 'Tuscan Reserve EVOO', price: 38.00, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400' },
            ]
        },
        {
            id: 4,
            name: 'James Mitchell',
            firstName: 'James',
            lastName: 'Mitchell',
            role: 'Master Beekeeper',
            specialty: 'Beekeeper',
            location: 'Vermont, USA',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800',
            heroImage: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200',
            products: 15,
            rating: 4.7,
            featured: false,
            bio: `James Mitchell discovered his passion for beekeeping while studying environmental science. Today, his 200-hive apiary produces some of the most sought-after raw honey in New England.`,
            shortBio: 'Sustainable apiary producing raw, unfiltered wildflower honey.',
            signature: 'His wildflower varieties change with each season, capturing Vermont\'s diverse flora.',
            featuredProducts: [
                { name: 'Wildflower Raw Honey', price: 24.00, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784ecb?w=400' },
                { name: 'Honeycomb Natural', price: 32.00, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400' },
            ]
        },
        {
            id: 5,
            name: 'Yuki Tanaka',
            firstName: 'Yuki',
            lastName: 'Tanaka',
            role: 'Tea Master',
            specialty: 'Tea Master',
            location: 'Kyoto, Japan',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800',
            heroImage: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200',
            products: 10,
            rating: 4.9,
            featured: true,
            bio: `Fifth-generation tea master Yuki Tanaka presides over one of Kyoto's most revered tea houses. Her family's shade-grown matcha has won international acclaim for its exceptional umami depth.`,
            shortBio: 'Fifth-generation tea master preserving ancient cultivation methods.',
            signature: 'The ceremonial-grade matcha is hand-ground using traditional stone mills.',
            featuredProducts: [
                { name: 'Ceremonial Matcha', price: 48.00, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400' },
                { name: 'Gyokuro Premium', price: 36.00, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400' },
            ]
        },
        {
            id: 6,
            name: 'Hans Weber',
            firstName: 'Hans',
            lastName: 'Weber',
            role: 'Alpine Cheesemaker',
            specialty: 'Cheesemaker',
            location: 'Swiss Alps',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800',
            heroImage: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=1200',
            products: 7,
            rating: 4.8,
            featured: false,
            bio: `High in the Swiss Alps, Hans Weber continues a 300-year tradition of cheese making. Using only milk from his own herd of Brown Swiss cows, each wheel is aged in natural mountain caves.`,
            shortBio: 'Alpine cheesemaker using traditional copper vats and mountain herbs.',
            signature: 'The alpine herbs his cows graze on give his cheese its distinctive flavor.',
            featuredProducts: [
                { name: 'Alpine Gruyère Aged', price: 45.00, image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400' },
            ]
        },
    ];

    const filteredArtisans = artisans.filter(artisan => {
        const matchesSearch = artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            artisan.specialty.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' ||
            artisan.specialty.toLowerCase().includes(selectedCategory);
        return matchesSearch && matchesCategory;
    });

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

    return (
        <div className="min-h-screen">
            {/* HERO SECTION - Full Screen with Community Image */}
            <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80"
                        alt="Artisan Community"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="absolute inset-0 flex items-center">
                    <div className="container-custom">
                        <div className="max-w-2xl">
                            <motion.span
                                initial={{ opacity: 0, y: 20 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.2, duration: 0.8 }}
                                className="inline-block text-secondary text-sm tracking-[0.3em] uppercase mb-6"
                            >
                                Meet The Makers
                            </motion.span>
                            <div className="overflow-hidden">
                                <motion.h1
                                    custom={0}
                                    variants={textVariants}
                                    initial="hidden"
                                    animate={isHeroInView ? "visible" : "hidden"}
                                    className="font-display text-6xl md:text-7xl lg:text-8xl text-white italic leading-[0.95]"
                                >
                                    Our
                                </motion.h1>
                            </div>
                            <div className="overflow-hidden">
                                <motion.h1
                                    custom={1}
                                    variants={textVariants}
                                    initial="hidden"
                                    animate={isHeroInView ? "visible" : "hidden"}
                                    className="font-display text-6xl md:text-7xl lg:text-8xl text-secondary italic leading-[0.95]"
                                >
                                    Artisans
                                </motion.h1>
                            </div>
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 1.2, duration: 0.8 }}
                                className="mt-8 text-white/70 text-lg max-w-md"
                            >
                                Discover the passionate craftspeople who pour their heart and heritage into every product. Each artisan brings generations of tradition to your table.
                            </motion.p>
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
                    <span className="text-xs tracking-[0.3em] uppercase mb-3">Discover</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-[1px] h-10 bg-white/30"
                    />
                </motion.div>
            </section>

            {/* MAIN CONTENT - Smooth Transition */}
            <section className="relative">
                {/* Smooth gradient transition from hero - no sharp lines */}
                <div className="absolute inset-0">
                    {/* Gradient blends from hero into content */}
                    <div className="h-[120px] bg-gradient-to-b from-primary-dark via-primary-dark to-[#0f2828]" />
                    {/* Smooth transition to cream */}
                    <div className="h-[80px] bg-gradient-to-b from-[#0f2828] to-[#1a3a3a]" />
                    <div className="h-[80px] bg-gradient-to-b from-[#1a3a3a] via-[#2a4a4a] to-[#E8E4DD]" />
                    <div className="h-[calc(100%-280px)] bg-[#F5F3EE]" />
                </div>

                <div className="relative z-10">
                    {/* Compact Filter Bar - Flapper Style */}
                    <div className="container-custom pt-8 pb-4">
                        <div className="flex flex-col gap-4">
                            {/* Flapper Toggle Button */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-accent-cream/80 text-sm tracking-[0.2em] uppercase">
                                    Browse Artisans
                                </h2>
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="flex items-center gap-2 text-secondary text-xs tracking-[0.15em] uppercase hover:text-secondary-light transition-colors"
                                >
                                    <Search className="w-4 h-4" />
                                    {showFilters ? 'Hide Filters' : 'Filter & Search'}
                                    <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                                </button>
                            </div>

                            {/* Collapsible Filter Panel */}
                            <motion.div
                                initial={false}
                                animate={{
                                    height: showFilters ? 'auto' : 0,
                                    opacity: showFilters ? 1 : 0
                                }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="pb-4 pt-2 border-t border-accent-cream/10">
                                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                                        {/* Search Input */}
                                        <div className="relative w-full lg:w-72">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-accent-cream/40" />
                                            <input
                                                type="text"
                                                placeholder="Search by name..."
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-accent-cream/15 text-accent-cream text-sm placeholder:text-accent-cream/30 focus:outline-none focus:border-secondary/50 transition-colors rounded-sm"
                                            />
                                        </div>

                                        {/* Category Pills - Compact */}
                                        <div className="flex flex-wrap gap-2">
                                            {categories.map((cat) => (
                                                <button
                                                    key={cat.id}
                                                    onClick={() => setSelectedCategory(cat.id)}
                                                    className={`px-3 py-1.5 text-[10px] tracking-[0.1em] uppercase transition-all ${selectedCategory === cat.id
                                                        ? 'bg-secondary text-primary-dark'
                                                        : 'text-accent-cream/60 hover:text-secondary'
                                                        }`}
                                                >
                                                    {cat.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>


                    {/* Featured Artisans - Editorial Layout */}
                    <div className="py-20">
                        {filteredArtisans.map((artisan, index) => (
                            <ArtisanProfile key={artisan.id} artisan={artisan} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* JOIN CTA */}
            <section className="relative py-32 overflow-hidden">
                <div className="absolute inset-0 bg-primary-dark">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1a4545]/30 rounded-full blur-3xl" />
                </div>
                <div className="container-custom relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="font-display text-5xl md:text-6xl text-accent-cream italic mb-6">
                            Are You an Artisan?
                        </h2>
                        <p className="text-accent-cream/60 text-lg max-w-xl mx-auto mb-10">
                            Join our community of passionate makers. Share your craft with food lovers worldwide and become part of the Artisio family.
                        </p>
                        <Link
                            to="/apply"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-secondary text-primary-dark text-sm tracking-[0.2em] uppercase hover:bg-secondary-light transition-colors"
                        >
                            Apply to Join
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

/**
 * ArtisanProfile - Individual artisan with editorial layout
 * Alternates between left and right image placement
 */
const ArtisanProfile = ({ artisan, index }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const isEven = index % 2 === 0;

    // Parallax for images
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-32 last:mb-0"
        >
            {/* Alternating Layout Container - Reduced height */}
            <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-stretch min-h-[70vh]`}>

                {/* Image Side - Slightly smaller */}
                <div className={`w-full lg:w-[45%] relative`}>
                    {/* Main Artisan Image */}
                    <motion.div
                        style={{ y }}
                        className="relative h-[50vh] lg:h-full overflow-hidden"
                    >
                        <img
                            src={artisan.image}
                            alt={artisan.name}
                            className="w-full h-full object-cover object-top"
                        />
                        {/* Smoother gradient overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-${isEven ? 'r' : 'l'} from-transparent via-transparent to-[#F5F3EE] hidden lg:block`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#F5F3EE] via-transparent to-transparent lg:hidden" />
                    </motion.div>

                    {/* Single Featured Product - Clean positioning at edge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className={`absolute ${isEven ? 'right-0 lg:-right-6' : 'left-0 lg:-left-6'} bottom-8 lg:bottom-16 hidden md:block z-20`}
                    >
                        <div className="bg-white p-2 shadow-xl">
                            <img
                                src={artisan.featuredProducts[0]?.image}
                                alt=""
                                className="w-24 h-24 lg:w-28 lg:h-28 object-cover"
                            />
                            <p className="text-[10px] text-gray-500 text-center mt-1 max-w-[100px] truncate">{artisan.featuredProducts[0]?.name}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Content Side - Takes more space */}
                <div className={`w-full lg:w-[55%] bg-[#F5F3EE] flex items-center ${isEven ? 'lg:pl-16 xl:pl-24' : 'lg:pr-16 xl:pr-24'}`}>

                    <div className={`p-8 lg:p-0 max-w-xl ${isEven ? '' : 'lg:ml-auto'}`}>
                        {/* Role */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-secondary text-sm tracking-[0.3em] uppercase mb-4"
                        >
                            {artisan.role}
                        </motion.p>

                        {/* Name */}
                        <div className="overflow-hidden mb-2">
                            <motion.h2
                                initial={{ y: 100 }}
                                animate={isInView ? { y: 0 } : {}}
                                transition={{ delay: 0.3, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                                className="font-display text-5xl md:text-6xl lg:text-7xl text-primary-dark italic leading-[1]"
                            >
                                {artisan.firstName}
                            </motion.h2>
                        </div>
                        <div className="overflow-hidden mb-6">
                            <motion.h2
                                initial={{ y: 100 }}
                                animate={isInView ? { y: 0 } : {}}
                                transition={{ delay: 0.4, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                                className="font-display text-5xl md:text-6xl lg:text-7xl text-primary-dark italic leading-[1]"
                            >
                                {artisan.lastName}
                            </motion.h2>
                        </div>

                        {/* Location & Rating */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            className="flex items-center gap-6 mb-6 text-gray-500 text-sm"
                        >
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {artisan.location}
                            </span>
                            <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-secondary fill-secondary" />
                                {artisan.rating}
                            </span>
                        </motion.div>

                        {/* Bio */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            className="text-gray-600 leading-relaxed mb-6"
                        >
                            {artisan.bio}
                        </motion.p>

                        {/* Signature */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            className="text-gray-500 italic text-sm mb-8 border-l-2 border-secondary pl-4"
                        >
                            {artisan.signature}
                        </motion.p>

                        {/* Featured Products */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.8, duration: 0.6 }}
                            className="mb-8"
                        >
                            <h4 className="text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">Featured Products</h4>
                            <div className="flex gap-4">
                                {artisan.featuredProducts.map((product, i) => (
                                    <div key={i} className="group cursor-pointer">
                                        <div className="w-20 h-20 overflow-hidden mb-2 bg-white shadow-md">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-600 group-hover:text-primary-dark transition-colors">{product.name}</p>
                                        <p className="text-xs text-secondary font-semibold">${product.price}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* CTA */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.9, duration: 0.6 }}
                        >
                            <Link
                                to={`/artisans/${artisan.id}`}
                                className="inline-flex items-center gap-3 text-primary-dark text-sm tracking-[0.15em] uppercase hover:text-secondary transition-colors group"
                            >
                                View Full Profile
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Artisans;
