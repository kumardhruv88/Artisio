import React, { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import Button from '@components/common/Button';

const ProductFilters = ({ onFilterChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: [0, 200],
        categories: [],
        dietary: [],
        certifications: [],
        inStockOnly: false,
    });

    const categories = ['Coffee & Tea', 'Chocolates', 'Honey & Jams', 'Oils & Vinegars', 'Baked Goods', 'Beverages'];
    const dietaryTags = ['Vegan', 'Gluten-Free', 'Organic', 'Sugar-Free', 'Keto'];
    const certifications = ['USDA Organic', 'Fair Trade', 'Non-GMO', 'Kosher'];

    const handleFilterChange = (type, value) => {
        const newFilters = { ...filters };

        if (type === 'category' || type === 'dietary' || type === 'certification') {
            const key = type === 'category' ? 'categories' : type === 'dietary' ? 'dietary' : 'certifications';
            if (newFilters[key].includes(value)) {
                newFilters[key] = newFilters[key].filter(item => item !== value);
            } else {
                newFilters[key] = [...newFilters[key], value];
            }
        } else if (type === 'priceRange') {
            newFilters.priceRange = value;
        } else if (type === 'inStockOnly') {
            newFilters.inStockOnly = value;
        }

        setFilters(newFilters);
        onFilterChange && onFilterChange(newFilters);
    };

    const clearAllFilters = () => {
        const clearedFilters = {
            priceRange: [0, 200],
            categories: [],
            dietary: [],
            certifications: [],
            inStockOnly: false,
        };
        setFilters(clearedFilters);
        onFilterChange && onFilterChange(clearedFilters);
    };

    const FilterContent = () => (
        <div className="space-y-6">
            {/* Price Range */}
            <div>
                <h3 className="font-semibold text-primary mb-3">Price Range</h3>
                <div className="space-y-2">
                    <input
                        type="range"
                        min="0"
                        max="200"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div>
                <h3 className="font-semibold text-primary mb-3">Categories</h3>
                <div className="space-y-2">
                    {categories.map((category) => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.categories.includes(category)}
                                onChange={() => handleFilterChange('category', category)}
                                className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/20"
                            />
                            <span className="text-sm text-gray-700">{category}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Dietary Tags */}
            <div>
                <h3 className="font-semibold text-primary mb-3">Dietary Preferences</h3>
                <div className="flex flex-wrap gap-2">
                    {dietaryTags.map((tag) => (
                        <button
                            key={tag}
                            onClick={() => handleFilterChange('dietary', tag)}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${filters.dietary.includes(tag)
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* Certifications */}
            <div>
                <h3 className="font-semibold text-primary mb-3">Certifications</h3>
                <div className="space-y-2">
                    {certifications.map((cert) => (
                        <label key={cert} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filters.certifications.includes(cert)}
                                onChange={() => handleFilterChange('certification', cert)}
                                className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/20"
                            />
                            <span className="text-sm text-gray-700">{cert}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* In Stock Only */}
            <div>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={filters.inStockOnly}
                        onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)}
                        className="w-4 h-4 text-primary rounded focus:ring-2 focus:ring-primary/20"
                    />
                    <span className="text-sm font-medium text-gray-700">In Stock Only</span>
                </label>
            </div>

            {/* Clear Filters */}
            <Button variant="outline" onClick={clearAllFilters} className="w-full">
                Clear All Filters
            </Button>
        </div>
    );

    return (
        <>
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-4">
                <Button
                    variant="outline"
                    onClick={() => setIsOpen(!isOpen)}
                    leftIcon={<SlidersHorizontal className="w-5 h-5" />}
                >
                    Filters
                </Button>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block sticky top-24">
                <div className="bg-white rounded-xl shadow-card p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-serif font-bold text-primary">Filters</h2>
                    </div>
                    <FilterContent />
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsOpen(false)}>
                    <div
                        className="absolute right-0 top-0 h-full w-full max-w-sm bg-white p-6 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-serif font-bold text-primary">Filters</h2>
                            <button onClick={() => setIsOpen(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <FilterContent />
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductFilters;
