import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, Filter } from 'lucide-react';
import Button from '@components/common/Button';

/**
 * ProductReviews - Comprehensive review system with filtering and helpful votes
 * Design: Clean card layout with rating breakdown and user interactions
 */
const ProductReviews = ({ productId, initialReviews = [] }) => {
    const [sortBy, setSortBy] = useState('recent');
    const [filterRating, setFilterRating] = useState(null);

    // Demo reviews if none provided
    const demoReviews = [
        {
            id: 1,
            user: { name: 'Sarah Johnson', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
            rating: 5,
            title: 'Absolutely Amazing Quality!',
            comment: 'This is hands down the best artisan coffee I\'ve ever had. The flavor profile is incredible, and you can really taste the care that goes into every batch. Will definitely be ordering again!',
            date: '2024-01-15',
            helpful: 24,
            verified: true,
            images: [],
        },
        {
            id: 2,
            user: { name: 'Michael Chen', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
            rating: 5,
            title: 'Worth Every Penny',
            comment: 'As a coffee enthusiast, I\'m very particular about my beans. These exceeded all expectations. Rich, smooth, and the perfect morning brew.',
            date: '2024-01-12',
            helpful: 18,
            verified: true,
            images: ['https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=200'],
        },
        {
            id: 3,
            user: { name: 'Emily Rodriguez', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
            rating: 4,
            title: 'Great, but a bit pricey',
            comment: 'The quality is undeniable, but the price point is a bit high for everyday drinking. That said, it\'s perfect for special occasions.',
            date: '2024-01-10',
            helpful: 12,
            verified: false,
            images: [],
        },
    ];

    const reviews = initialReviews.length > 0 ? initialReviews : demoReviews;

    // Calculate rating statistics
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
    const ratingBreakdown = [5, 4, 3, 2, 1].map(rating => ({
        rating,
        count: reviews.filter(r => r.rating === rating).length,
        percentage: (reviews.filter(r => r.rating === rating).length / reviews.length) * 100,
    }));

    return (
        <div className="space-y-8">
            {/* Rating Summary */}
            <div className="bg-neutral-gray rounded-2xl p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Overall Rating */}
                    <div className="text-center md:border-r border-gray-300">
                        <div className="text-5xl font-serif font-bold text-primary mb-2">
                            {avgRating.toFixed(1)}
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-5 h-5 ${i < Math.floor(avgRating)
                                            ? 'text-secondary fill-secondary'
                                            : 'text-gray-300'
                                        }`}
                                />
                            ))}
                        </div>
                        <p className="text-gray-600">Based on {reviews.length} reviews</p>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="md:col-span-2 space-y-3">
                        {ratingBreakdown.map(({ rating, count, percentage }) => (
                            <div key={rating} className="flex items-center gap-4">
                                <div className="flex items-center gap-1 w-20">
                                    <span className="text-sm font-medium text-gray-700">{rating}</span>
                                    <Star className="w-4 h-4 text-secondary fill-secondary" />
                                </div>
                                <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percentage}%` }}
                                        transition={{ duration: 0.5, delay: (5 - rating) * 0.1 }}
                                        className="h-full bg-secondary rounded-full"
                                    />
                                </div>
                                <span className="text-sm text-gray-600 w-12 text-right">
                                    {count}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Write Review Button */}
                <div className="mt-8 flex justify-center">
                    <Button variant="primary" size="lg">
                        Write a Review
                    </Button>
                </div>
            </div>

            {/* Filters and Sorting */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Rating Filter */}
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-gray-500" />
                    <select
                        value={filterRating || ''}
                        onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                        <option value="">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>

                {/* Sort */}
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                >
                    <option value="recent">Most Recent</option>
                    <option value="helpful">Most Helpful</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                </select>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
                {reviews.map((review, index) => (
                    <motion.div
                        key={review.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-card"
                    >
                        {/* Review Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4">
                                {/* User Avatar */}
                                <img
                                    src={review.user.avatar}
                                    alt={review.user.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />

                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold text-primary">{review.user.name}</h4>
                                        {review.verified && (
                                            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                                Verified Purchase
                                            </span>
                                        )}
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-4 h-4 ${i < review.rating
                                                            ? 'text-secondary fill-secondary'
                                                            : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-500">
                                            {new Date(review.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Review Content */}
                        <div className="space-y-3">
                            {review.title && (
                                <h5 className="font-semibold text-lg text-primary">
                                    {review.title}
                                </h5>
                            )}

                            <p className="text-gray-700 leading-relaxed">
                                {review.comment}
                            </p>

                            {/* Review Images */}
                            {review.images && review.images.length > 0 && (
                                <div className="flex gap-2">
                                    {review.images.map((image, idx) => (
                                        <div key={idx} className="w-24 h-24 rounded-lg overflow-hidden">
                                            <img
                                                src={image}
                                                alt={`Review image ${idx + 1}`}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform cursor-pointer"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Review Actions */}
                        <div className="flex items-center gap-6 mt-4 pt-4 border-t border-gray-200">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-sm">Helpful ({review.helpful})</span>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Load More */}
            {reviews.length >= 3 && (
                <div className="text-center">
                    <Button variant="outline" size="lg">
                        Load More Reviews
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProductReviews;
