import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Award, Leaf, ArrowRight, ArrowLeft } from 'lucide-react';
import Button from '@components/common/Button';
import ProductCard from '@components/products/ProductCard';

const ArtisanDetail = () => {
    const { id } = useParams();

    // Artisan data - should match Artisans.jsx data
    const artisansData = {
        1: {
            name: "Maria Santos",
            brand: "Santos Coffee",
            location: "Oaxaca, Mexico",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200",
            avatar: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&q=80",
            bio: "With over two decades of experience in coffee cultivation and roasting, Maria Santos has become a legendary figure in the specialty coffee world. Her family's farm in Oaxaca has been producing exceptional beans for three generations.",
            specialty: "Coffee Roaster",
            founded: "1985",
            sustainability: "Shade-Grown, Fair Trade Certified",
            products: [
                { id: 101, name: 'Oaxacan Single Origin', price: 28.99, image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400', artisan: 'Santos Coffee', rating: 4.9, reviews: 42 },
                { id: 102, name: 'Heritage Blend', price: 24.99, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', artisan: 'Santos Coffee', rating: 4.8, reviews: 35 },
            ]
        },
        2: {
            name: "Pierre Dubois",
            brand: "Dubois Chocolaterie",
            location: "Lyon, France",
            image: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=1200",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
            bio: "Pierre Dubois represents the pinnacle of French chocolate artistry. Trained at the prestigious École du Grand Chocolat Valrhona, he has spent 15 years perfecting the art of bean-to-bar chocolate making.",
            specialty: "Chocolatier",
            founded: "2009",
            sustainability: "Direct Trade Cacao, Carbon Neutral",
            products: [
                { id: 201, name: 'Dark Truffle Collection', price: 42.00, image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400', artisan: 'Dubois Chocolaterie', rating: 5.0, reviews: 28 },
                { id: 202, name: 'Single Origin Ecuador', price: 18.99, image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=400', artisan: 'Dubois Chocolaterie', rating: 4.9, reviews: 22 },
            ]
        },
        3: {
            name: "Elena Rossi",
            brand: "Rossi Olive Estate",
            location: "Tuscany, Italy",
            image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
            bio: "The Rossi family has tended olive groves in the rolling hills of Tuscany since 1890. Elena, the fourth generation, combines time-honored traditions with modern sustainability practices.",
            specialty: "Olive Oil Producer",
            founded: "1890",
            sustainability: "100% Organic, Zero Waste Policy",
            products: [
                { id: 301, name: 'Tuscan Reserve EVOO', price: 38.00, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400', artisan: 'Rossi Olive Estate', rating: 5.0, reviews: 56 },
            ]
        },
        4: {
            name: "James Mitchell",
            brand: "Vermont Apiaries",
            location: "Vermont, USA",
            image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=1200",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
            bio: "James Mitchell discovered his passion for beekeeping while studying environmental science. Today, his 200-hive apiary produces some of the most sought-after raw honey in New England.",
            specialty: "Master Beekeeper",
            founded: "2010",
            sustainability: "Sustainable Beekeeping, Native Pollinator Support",
            products: [
                { id: 401, name: 'Wildflower Raw Honey', price: 24.00, image: 'https://images.unsplash.com/photo-1587049352846-4a222e784ecb?w=400', artisan: 'Vermont Apiaries', rating: 4.8, reviews: 67 },
                { id: 402, name: 'Honeycomb Natural', price: 32.00, image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=400', artisan: 'Vermont Apiaries', rating: 4.9, reviews: 31 },
            ]
        },
        5: {
            name: "Yuki Tanaka",
            brand: "Tanaka Tea House",
            location: "Kyoto, Japan",
            image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=1200",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
            bio: "Fifth-generation tea master Yuki Tanaka presides over one of Kyoto's most revered tea houses. Her family's shade-grown matcha has won international acclaim for its exceptional umami depth.",
            specialty: "Tea Master",
            founded: "1875",
            sustainability: "Traditional Methods, Organic Certified",
            products: [
                { id: 501, name: 'Ceremonial Matcha', price: 48.00, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400', artisan: 'Tanaka Tea House', rating: 5.0, reviews: 89 },
                { id: 502, name: 'Gyokuro Premium', price: 36.00, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400', artisan: 'Tanaka Tea House', rating: 4.9, reviews: 45 },
            ]
        },
        6: {
            name: "Hans Weber",
            brand: "Alpine Cheese Co.",
            location: "Swiss Alps",
            image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?w=1200",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
            bio: "High in the Swiss Alps, Hans Weber continues a 300-year tradition of cheese making. Using only milk from his own herd of Brown Swiss cows, each wheel is aged in natural mountain caves.",
            specialty: "Cheesemaker",
            founded: "1720",
            sustainability: "Grass-Fed, Cave-Aged, Traditional Methods",
            products: [
                { id: 601, name: 'Alpine Gruyère Aged', price: 45.00, image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400', artisan: 'Alpine Cheese Co.', rating: 5.0, reviews: 34 },
            ]
        }
    };

    const artisan = artisansData[parseInt(id)] || artisansData[id];

    // Artisan not found
    if (!artisan) {
        return (
            <div className="bg-[#f8f6f0] min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-serif text-[#1a3a3a] mb-4">Artisan Not Found</h1>
                    <p className="text-gray-500 mb-8">The artisan you're looking for doesn't exist.</p>
                    <Link
                        to="/artisans"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a3a3a] text-white hover:bg-[#2a4a4a] transition-colors"
                    >
                        <ArrowLeft size={16} /> Back to Artisans
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[#f8f6f0] min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-serif italic mb-4"
                        >
                            {artisan.brand}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl uppercase tracking-widest font-light"
                        >
                            By {artisan.name}
                        </motion.p>
                    </div>
                </div>
            </div>

            <div className="container-custom py-16">
                {/* Profile Section */}
                <div className="max-w-4xl mx-auto -mt-32 relative bg-white p-8 md:p-12 shadow-xl rounded-lg mb-16">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                            <img src={artisan.avatar} alt={artisan.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                                <div>
                                    <h2 className="text-3xl font-serif text-[#1a3a3a] mb-2">{artisan.name}</h2>
                                    <div className="flex items-center gap-2 text-gray-500 justify-center md:justify-start">
                                        <MapPin size={16} />
                                        <span className="text-sm uppercase tracking-wide">{artisan.location}</span>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0">
                                    <Button variant="outline" size="sm">Follow Artisan</Button>
                                </div>
                            </div>
                            <p className="text-gray-600 leading-relaxed mb-6 font-light">
                                {artisan.bio}
                            </p>

                            <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#1a3a3a]/10 flex items-center justify-center text-[#1a3a3a]">
                                        <Award size={22} />
                                    </div>
                                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Specialty</p>
                                    <p className="font-serif text-[#1a3a3a] font-medium">{artisan.specialty}</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#1a3a3a]/10 flex items-center justify-center text-[#1a3a3a]">
                                        <Star size={22} />
                                    </div>
                                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Established</p>
                                    <p className="font-serif text-[#1a3a3a] font-medium">{artisan.founded}</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#1a3a3a]/10 flex items-center justify-center text-[#1a3a3a]">
                                        <Leaf size={22} />
                                    </div>
                                    <p className="text-[10px] uppercase text-gray-400 tracking-widest mb-1">Practice</p>
                                    <p className="font-serif text-[#1a3a3a] font-medium text-sm leading-tight">{artisan.sustainability}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Elegant Products Section */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h3 className="text-2xl font-serif text-[#1a3a3a] mb-1">Curated Collection</h3>
                            <p className="text-gray-500 text-sm">
                                Recent creations from {artisan.brand}
                            </p>
                        </div>
                        <Link to="/products" className="hidden md:flex items-center gap-2 text-[#d4af37] hover:text-[#b89530] transition-colors text-sm font-medium">
                            View All <ArrowRight size={14} />
                        </Link>
                    </div>

                    {/* Beautiful Square Product Cards */}
                    <div className="flex flex-wrap justify-center gap-6">
                        {artisan.products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                    delay: index * 0.15,
                                    duration: 0.5,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.3 }
                                }}
                                className="w-[220px]"
                            >
                                <Link
                                    to={`/products/${product.id}`}
                                    className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                                >
                                    {/* Square Image */}
                                    <div className="relative w-full aspect-square overflow-hidden">
                                        <motion.img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.08 }}
                                            transition={{ duration: 0.4 }}
                                        />
                                        {/* Subtle overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                                    </div>

                                    {/* Compact Info */}
                                    <div className="p-4">
                                        <p className="text-[9px] text-[#d4af37] uppercase tracking-[0.15em] mb-1 font-medium">
                                            {product.artisan}
                                        </p>
                                        <h4 className="font-medium text-[#1a3a3a] text-sm leading-tight mb-2 line-clamp-2">
                                            {product.name}
                                        </h4>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1">
                                                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                                <span className="text-[11px] text-gray-600 font-medium">{product.rating}</span>
                                            </div>
                                            <span className="font-bold text-[#1a3a3a] text-sm">${product.price.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-8 text-center md:hidden">
                        <Link to="/products" className="inline-flex items-center gap-2 text-[#d4af37] text-sm font-medium">
                            View All Products <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtisanDetail;
