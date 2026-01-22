import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

/**
 * VariantSelector - Elegant variant selection with visual feedback
 * Supports size, color, and custom variant types
 * Design: Clean button groups with active states and smooth transitions
 */
const VariantSelector = ({ variants = [], selectedVariants = {}, onVariantChange }) => {
    const [selected, setSelected] = useState(selectedVariants);

    const handleSelect = (variantType, value) => {
        const newSelected = { ...selected, [variantType]: value };
        setSelected(newSelected);
        onVariantChange && onVariantChange(newSelected);
    };

    // Default demo variants if none provided
    const displayVariants = variants.length > 0 ? variants : [
        {
            type: 'size',
            label: 'Size',
            required: true,
            options: [
                { value: '250g', label: '250g', available: true },
                { value: '500g', label: '500g', available: true },
                { value: '1kg', label: '1kg', available: false },
            ],
        },
        {
            type: 'roast',
            label: 'Roast Level',
            required: true,
            options: [
                { value: 'light', label: 'Light', available: true },
                { value: 'medium', label: 'Medium', available: true },
                { value: 'dark', label: 'Dark', available: true },
            ],
        },
    ];

    return (
        <div className="space-y-6">
            {displayVariants.map((variant) => (
                <div key={variant.type} className="space-y-3">
                    {/* Variant Label */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-semibold text-primary uppercase tracking-wide">
                            {variant.label}
                            {variant.required && <span className="text-secondary ml-1">*</span>}
                        </label>
                        {selected[variant.type] && (
                            <span className="text-sm text-gray-600">
                                Selected: {selected[variant.type]}
                            </span>
                        )}
                    </div>

                    {/* Variant Options */}
                    <div className="flex flex-wrap gap-3">
                        {variant.options.map((option) => {
                            const isSelected = selected[variant.type] === option.value;
                            const isAvailable = option.available !== false;

                            return (
                                <motion.button
                                    key={option.value}
                                    onClick={() => isAvailable && handleSelect(variant.type, option.value)}
                                    disabled={!isAvailable}
                                    whileHover={isAvailable ? { scale: 1.05 } : {}}
                                    whileTap={isAvailable ? { scale: 0.95 } : {}}
                                    className={`
                    relative px-6 py-3 rounded-lg font-medium transition-all duration-200
                    ${isSelected
                                            ? 'bg-primary text-white shadow-md'
                                            : isAvailable
                                                ? 'bg-white border-2 border-gray-300 text-gray-700 hover:border-primary hover:text-primary'
                                                : 'bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed'
                                        }
                  `}
                                >
                                    {/* Selected Checkmark */}
                                    {isSelected && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-2 -right-2 bg-secondary rounded-full p-1"
                                        >
                                            <Check className="w-3 h-3 text-white" />
                                        </motion.div>
                                    )}

                                    <span>{option.label}</span>

                                    {/* Unavailable Strikethrough */}
                                    {!isAvailable && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-full h-0.5 bg-gray-400 rotate-12"></div>
                                        </div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Helper Text */}
                    {variant.helperText && (
                        <p className="text-sm text-gray-500 mt-2">{variant.helperText}</p>
                    )}
                </div>
            ))}

            {/* Selection Summary (if multiple variants) */}
            {displayVariants.length > 1 && Object.keys(selected).length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-gray rounded-lg p-4 mt-6"
                >
                    <p className="text-sm font-medium text-primary mb-2">Your Selection:</p>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(selected).map(([type, value]) => (
                            <span
                                key={type}
                                className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full text-sm"
                            >
                                <span className="text-gray-600 capitalize">{type}:</span>
                                <span className="font-medium text-primary">{value}</span>
                            </span>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default VariantSelector;
