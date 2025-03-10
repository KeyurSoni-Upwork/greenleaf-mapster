
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import LocationMap from '@/components/LocationMap';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';

const Index = () => {
  // Smooth page transition effect on load
  useEffect(() => {
    document.body.classList.add('page-transition-in');
    return () => {
      document.body.classList.remove('page-transition-in');
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <Hero />
        <ProductSection />
        <LocationMap />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
