import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
    children,
    hoverable = false,
    className = '',
    onClick,
    ...props
}) => {
    const baseStyles = 'bg-white rounded-xl shadow-card transition-shadow duration-200';
    const hoverStyles = hoverable ? 'hover:shadow-card-hover cursor-pointer' : '';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={hoverable ? { y: -4 } : {}}
            className={`${baseStyles} ${hoverStyles} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default Card;
