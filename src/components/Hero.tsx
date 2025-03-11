
import React from 'react';
import AnimatedText from './AnimatedText';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-nature-50/50 to-white z-0"></div>
      
      {/* Background image - fixing URL and increasing opacity */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1536195892759-c8a3c8acd89d?q=80&w=2340')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)'
        }}
      ></div>

      <div className="container mx-auto relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-20">
        <div className="w-full md:w-1/2 space-y-6 md:pr-10">
          <div className="inline-block rounded-full bg-nature-100 px-4 py-1.5 text-sm font-medium text-nature-600 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Premium Quality Products
          </div>
          
          <AnimatedText
            text="Nature's Finest Selections"
            tag="h1"
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight text-foreground"
            delay={200}
          />
          
          <AnimatedText
            text="Discover our carefully curated collection of premium marijuana products. Grown with care, delivered with precision."
            tag="p"
            className="text-lg text-muted-foreground max-w-lg"
            delay={400}
          />
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
            <a 
              href="#products" 
              className="btn-hover-effect px-8 py-3 bg-nature-500 text-white font-medium rounded-md inline-flex items-center justify-center transition-all hover:bg-nature-600"
            >
              Explore Products
            </a>
            <a 
              href="#locations" 
              className="btn-hover-effect px-8 py-3 bg-transparent border border-nature-200 text-nature-700 font-medium rounded-md inline-flex items-center justify-center transition-all hover:bg-nature-50"
            >
              Find Locations
            </a>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}>
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-nature-200/50 border border-white/50">
            {/* Main product image - fixing URL */}
            <div 
              className="absolute inset-0 bg-cover bg-center transform transition-transform duration-700 hover:scale-105"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1585669060258-2dc6a3979dc7?q=80&w=1280')"
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="font-display font-bold text-2xl mb-2">Premium Grade</h3>
              <p className="text-white/80">Organic, lab-tested, and sustainably grown</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a 
          href="#products" 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-nature-100 shadow-md"
          aria-label="Scroll down"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m-7-7l7 7 7-7"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
