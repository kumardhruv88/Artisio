import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ChevronLeft, ChevronRight, X } from 'lucide-react';

/**
 * ProductGallery - Premium image gallery with zoom, thumbnails, and lightbox
 * Design: Clean, modern with smooth transitions and hover effects
 */
const ProductGallery = ({ images = [] }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);

    // Default placeholder images if none provided
    const galleryImages = images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600',
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=700',
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=650',
    ];

    const handlePrevious = () => {
        setSelectedImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="space-y-4">
            {/* Main Image Display */}
            <div className="relative bg-neutral-gray rounded-2xl overflow-hidden group">
                <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-square w-full"
                >
                    <img
                        src={galleryImages[selectedImage]}
                        alt={`Product image ${selectedImage + 1}`}
                        className="w-full h-full object-cover cursor-zoom-in"
                        onClick={() => setIsLightboxOpen(true)}
                    />

                    {/* Zoom Indicator Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileHover={{ scale: 1, opacity: 1 }}
                            className="bg-white/90 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ZoomIn className="w-6 h-6 text-primary" />
                        </motion.div>
                    </div>

                    {/* Navigation Arrows */}
                    {galleryImages.length > 1 && (
                        <>
                            <button
                                onClick={handlePrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-5 h-5 text-primary" />
                            </button>
                            <button
                                onClick={handleNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-5 h-5 text-primary" />
                            </button>
                        </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                        {selectedImage + 1} / {galleryImages.length}
                    </div>
                </motion.div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {galleryImages.map((image, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index
                                ? 'border-primary shadow-md'
                                : 'border-transparent hover:border-gray-300'
                            }`}
                    >
                        <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                        {selectedImage === index && (
                            <div className="absolute inset-0 bg-primary/10"></div>
                        )}
                    </motion.button>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors"
                            aria-label="Close lightbox"
                        >
                            <X className="w-6 h-6 text-white" />
                        </button>

                        {/* Lightbox Image */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-6xl max-h-[90vh]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={galleryImages[selectedImage]}
                                alt={`Product image ${selectedImage + 1}`}
                                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                            />

                            {/* Lightbox Navigation */}
                            {galleryImages.length > 1 && (
                                <>
                                    <button
                                        onClick={handlePrevious}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors"
                                    >
                                        <ChevronLeft className="w-6 h-6 text-white" />
                                    </button>
                                    <button
                                        onClick={handleNext}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors"
                                    >
                                        <ChevronRight className="w-6 h-6 text-white" />
                                    </button>
                                </>
                            )}

                            {/* Lightbox Counter */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
                                {selectedImage + 1} / {galleryImages.length}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductGallery;
