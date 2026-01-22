import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, Tag, User } from 'lucide-react';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import Input from '@components/common/Input';

/**
 * Blog - Artisan stories and recipes
 * Design: Magazine-style layout with featured posts
 */
const Blog = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'All Posts' },
        { id: 'recipes', label: 'Recipes' },
        { id: 'stories', label: 'Artisan Stories' },
        { id: 'guides', label: 'Guides' },
        { id: 'news', label: 'News' },
    ];

    const featuredPost = {
        id: 1,
        title: 'The Art of Single-Origin Coffee: A Journey Through Ethiopian Highlands',
        excerpt: 'Discover the rich heritage and complex flavors of Ethiopian coffee beans, from ancient cultivation methods to the perfect brew.',
        image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800',
        author: 'Maria Santos',
        authorImage: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=100',
        date: 'January 15, 2026',
        readTime: '8 min read',
        category: 'stories',
    };

    const posts = [
        {
            id: 2,
            title: 'Pairing Artisan Cheeses with Natural Wines',
            excerpt: 'Expert tips on creating the perfect cheese board with complementary wine selections.',
            image: 'https://images.unsplash.com/photo-1452195100486-9cc805987862?w=400',
            author: 'Chef Marco',
            date: 'January 12, 2026',
            readTime: '5 min read',
            category: 'guides',
        },
        {
            id: 3,
            title: 'Behind the Hive: A Day with Vermont Beekeeper James Mitchell',
            excerpt: 'An intimate look at sustainable beekeeping and the journey from hive to jar.',
            image: 'https://images.unsplash.com/photo-1587049352846-4a222e784ecb?w=400',
            author: 'Sarah Chen',
            date: 'January 10, 2026',
            readTime: '6 min read',
            category: 'stories',
        },
        {
            id: 4,
            title: 'Winter Comfort: Honey Glazed Root Vegetables Recipe',
            excerpt: 'A simple yet elegant recipe featuring our signature wildflower honey.',
            image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
            author: 'Chef Emma',
            date: 'January 8, 2026',
            readTime: '4 min read',
            category: 'recipes',
        },
        {
            id: 5,
            title: 'The Rise of Bean-to-Bar Chocolate Movement',
            excerpt: 'How small-batch chocolatiers are revolutionizing the industry.',
            image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=400',
            author: 'Pierre Dubois',
            date: 'January 5, 2026',
            readTime: '7 min read',
            category: 'news',
        },
        {
            id: 6,
            title: 'Olive Oil 101: Choosing the Right Oil for Every Dish',
            excerpt: 'Your complete guide to selecting and using premium olive oils.',
            image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
            author: 'Elena Rossi',
            date: 'January 3, 2026',
            readTime: '5 min read',
            category: 'guides',
        },
    ];

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-neutral">
            {/* Header */}
            <section className="bg-white py-12 border-b border-gray-200">
                <div className="container-custom">
                    <div className="text-center mb-8">
                        <h1 className="text-5xl font-serif font-bold text-primary mb-4">
                            The Artisan Journal
                        </h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Stories, recipes, and insights from the world of artisan food and beverages
                        </p>
                    </div>

                    {/* Search & Categories */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="w-full md:w-80">
                            <Input
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                leftIcon={<Search className="w-5 h-5" />}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`
                    px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all
                    ${selectedCategory === category.id
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }
                  `}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Post */}
            <section className="py-12">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Link to={`/blog/${featuredPost.id}`}>
                            <Card className="overflow-hidden group">
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    <div className="relative h-64 lg:h-auto overflow-hidden">
                                        <img
                                            src={featuredPost.image}
                                            alt={featuredPost.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-secondary text-white text-sm font-bold px-3 py-1 rounded-full">
                                                Featured
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                                        <div className="flex items-center gap-4 mb-4">
                                            <span className="text-primary text-sm font-medium uppercase tracking-wider">
                                                {featuredPost.category}
                                            </span>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-gray-500 text-sm flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {featuredPost.readTime}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl font-serif font-bold text-primary mb-4 group-hover:text-secondary transition-colors">
                                            {featuredPost.title}
                                        </h2>
                                        <p className="text-gray-600 text-lg mb-6">
                                            {featuredPost.excerpt}
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={featuredPost.authorImage}
                                                alt={featuredPost.author}
                                                className="w-12 h-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">{featuredPost.author}</p>
                                                <p className="text-sm text-gray-500">{featuredPost.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="py-12">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link to={`/blog/${post.id}`}>
                                    <Card className="overflow-hidden group h-full">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={post.image}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span className="bg-white/90 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full uppercase">
                                                    {post.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-4 h-4" />
                                                    {post.date}
                                                </span>
                                                <span>•</span>
                                                <span>{post.readTime}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-gray-600 mb-4 line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                                    <User className="w-4 h-4" />
                                                    {post.author}
                                                </span>
                                                <span className="text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                                    Read
                                                    <ArrowRight className="w-4 h-4" />
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-12">
                        <Button variant="outline" size="lg">
                            Load More Articles
                        </Button>
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section className="py-16 bg-gradient-to-r from-primary to-primary-light text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl font-serif font-bold mb-4">
                        Get Stories in Your Inbox
                    </h2>
                    <p className="text-white/80 mb-8 max-w-xl mx-auto">
                        Subscribe to our newsletter for the latest artisan stories, recipes, and exclusive content.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-secondary"
                        />
                        <Button variant="secondary">
                            Subscribe
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
