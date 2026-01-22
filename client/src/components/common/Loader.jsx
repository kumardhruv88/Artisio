import React from 'react';

const Loader = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className={`inline-block ${sizes[size]} ${className}`}>
            <div className="w-full h-full border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
