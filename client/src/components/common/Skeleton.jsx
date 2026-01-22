import React from 'react';

const Skeleton = ({ className = '', variant = 'rect', ...props }) => {
    const baseStyles = 'animate-pulse bg-gray-200 rounded';

    const variants = {
        rect: '',
        circle: 'rounded-full',
        text: 'h-4',
    };

    return (
        <div
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        />
    );
};

const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-card p-4 space-y-4">
        <Skeleton className="w-full h-48" />
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
    </div>
);

const SkeletonTable = () => (
    <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                    <Skeleton variant="circle" className="w-10 h-10" />
                    <div className="flex-1 space-y-2">
                        <Skeleton variant="text" className="w-full" />
                        <Skeleton variant="text" className="w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

Skeleton.Card = SkeletonCard;
Skeleton.Table = SkeletonTable;

export default Skeleton;
