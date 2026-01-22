import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Award, Leaf, Heart } from 'lucide-react';

/**
 * ProductStory - Immersive artisan story section with expandable details
 * Design: Magazine-style layout with rich imagery and storytelling
 */
const ProductStory = ({ artisan = {} }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Default demo artisan if none provided
    const artisanData = Object.keys(artisan).length > 0 ? artisan : {
        name: 'Maria Santos',
        business: 'Santos Family Vineyards',
        location: 'Napa Valley, California',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        story: 'For three generations, the Santos family has poured their hearts into crafting exceptional wines using traditional methods passed down through the ages. Our vineyard, nestled in the rolling hills of Napa Valley, has been producing world-class wines since 1952.',
        fullStory: `Our journey began when my grandfather, Antonio Santos, immigrated from Portugal with nothing but a dream and a deep love for winemaking. He planted the first vines with his own hands, nurturing each one as if it were his own child.

Today, we continue his legacy using the same traditional methods he taught us, combined with modern sustainable practices. Every bottle tells the story of our land, our family, and our unwavering commitment to excellence.`,
        certifications: ['Organic Certified', 'Sustainable Farming', 'Family Owned'],
        sustainability: [
            'Solar-powered winery operations',
            'Water conservation systems',
            'Biodiversity preservation',
            'Carbon-neutral shipping',
        ],
        makingProcess: [
            {
                step: 1,
                title: 'Hand-Harvesting',
                description: 'Each grape is carefully selected at peak ripeness',
                image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400',
            },
            {
                step: 2,
                title: 'Traditional Fermentation',
                description: 'Using natural yeasts in oak barrels',
                image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400',
            },
            {
                step: 3,
                title: 'Aging',
                description: 'Matured for 18 months in French oak',
                image: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400',
            },
        ],
    };

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex items-start gap-6">
                {/* Artisan Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex-shrink-0"
                >
                    <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-secondary/20">
                        <img
                            src={artisanData.image}
                            alt={artisanData.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>

                {/* Artisan Info */}
                <div className="flex-1">
                    <h3 className="text-2xl font-serif font-bold text-primary mb-1">
                        {artisanData.name}
                    </h3>
                    <p className="text-lg text-secondary font-medium mb-2">
                        {artisanData.business}
                    </p>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{artisanData.location}</span>
                    </div>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-2">
                        {artisanData.certifications?.map((cert, index) => (
                            <span
                                key={index}
                                className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium"
                            >
                                <Award className="w-3 h-3" />
                                {cert}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Story Preview */}
            <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                    {artisanData.story}
                </p>
            </div>

            {/* Expand/Collapse Button */}
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors"
            >
                <span>{isExpanded ? 'Show Less' : 'Read Full Story'}</span>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </button>

            {/* Expanded Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-8 overflow-hidden"
                    >
                        {/* Full Story */}
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                {artisanData.fullStory}
                            </p>
                        </div>

                        {/* Making Process */}
                        {artisanData.makingProcess && (
                            <div>
                                <h4 className="text-xl font-serif font-bold text-primary mb-6">
                                    Our Craft Process
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {artisanData.makingProcess.map((step) => (
                                        <motion.div
                                            key={step.step}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: step.step * 0.1 }}
                                            className="relative bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow"
                                        >
                                            <div className="aspect-video overflow-hidden">
                                                <img
                                                    src={step.image}
                                                    alt={step.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <div className="inline-flex items-center justify-center w-8 h-8 bg-secondary text-white rounded-full text-sm font-bold mb-3">
                                                    {step.step}
                                                </div>
                                                <h5 className="font-semibold text-primary mb-2">
                                                    {step.title}
                                                </h5>
                                                <p className="text-sm text-gray-600">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Sustainability Practices */}
                        {artisanData.sustainability && (
                            <div className="bg-green-50 rounded-xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <Leaf className="w-6 h-6 text-green-600" />
                                    <h4 className="text-lg font-semibold text-primary">
                                        Sustainability Commitment
                                    </h4>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {artisanData.sustainability.map((practice, index) => (
                                        <div key={index} className="flex items-start gap-2">
                                            <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-gray-700">{practice}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Support Artisan CTA */}
                        <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-xl font-serif font-bold mb-2">
                                        Support {artisanData.name}
                                    </h4>
                                    <p className="text-white/90">
                                        Show your appreciation with a direct tip
                                    </p>
                                </div>
                                <button className="flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors">
                                    <Heart className="w-5 h-5" />
                                    Send Tip
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductStory;
