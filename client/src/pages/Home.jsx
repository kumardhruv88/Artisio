import React from 'react';
import Hero from '@components/home/Hero';
import FeaturedProducts from '@components/home/FeaturedProducts';
import CategoryShowcase from '@components/home/CategoryShowcase';
import ArtisanSpotlight from '@components/home/ArtisanSpotlight';
import Testimonials from '@components/home/Testimonials';
import ImpactCounter from '@components/home/ImpactCounter';

const Home = () => {
    return (
        <div className="min-h-screen">
            <Hero />
            <FeaturedProducts />
            <CategoryShowcase />
            <ArtisanSpotlight />
            <Testimonials />
            <ImpactCounter />
        </div>
    );
};

export default Home;
