import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

/**
 * CheckoutSteps - Visual progress indicator for multi-step checkout
 * Design: Clean step indicator with animated progress
 */
const CheckoutSteps = ({ currentStep, steps }) => {
    return (
        <div className="mb-12">
            <div className="flex items-center justify-between max-w-3xl mx-auto">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;
                    const isUpcoming = stepNumber > currentStep;

                    return (
                        <div key={step.id} className="flex items-center flex-1">
                            {/* Step Circle */}
                            <div className="flex flex-col items-center flex-1">
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: isCurrent ? 1.1 : 1 }}
                                    className={`
                    relative w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-2
                    ${isCompleted ? 'bg-green-600 text-white' : ''}
                    ${isCurrent ? 'bg-primary text-white shadow-lg' : ''}
                    ${isUpcoming ? 'bg-gray-200 text-gray-500' : ''}
                  `}
                                >
                                    {isCompleted ? (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring' }}
                                        >
                                            <Check className="w-6 h-6" />
                                        </motion.div>
                                    ) : (
                                        <span>{stepNumber}</span>
                                    )}

                                    {/* Pulse Effect for Current Step */}
                                    {isCurrent && (
                                        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></span>
                                    )}
                                </motion.div>

                                {/* Step Label */}
                                <div className="text-center">
                                    <p className={`text-sm font-medium ${isCurrent ? 'text-primary' : 'text-gray-600'}`}>
                                        {step.label}
                                    </p>
                                </div>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="flex-1 h-0.5 mx-4 relative top-[-20px]">
                                    <div className="absolute inset-0 bg-gray-200"></div>
                                    <motion.div
                                        className="absolute inset-0 bg-green-600"
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: isCompleted ? 1 : 0 }}
                                        style={{ transformOrigin: 'left' }}
                                        transition={{ duration: 0.3 }}
                                    ></motion.div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CheckoutSteps;
