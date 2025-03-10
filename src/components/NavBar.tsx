
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-6 py-4",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="text-nature-500 text-2xl font-display font-bold tracking-tight">
            <span className="text-nature-500">Green</span>
            <span className="text-earth-400">Leaf</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: 'Products', href: '#products' },
            { name: 'Locations', href: '#locations' },
            { name: 'About', href: '#about' },
            { name: 'Contact', href: '#contact' },
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-nature-500 text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-nature-500 after:origin-center after:scale-x-0 after:transition-transform hover:after:scale-x-100"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex flex-col space-y-1.5 items-center justify-center w-10 h-10 rounded-md focus:outline-none"
          aria-label="Toggle menu"
        >
          <span className={cn(
            "w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out",
            isMobileMenuOpen && "translate-y-2 rotate-45"
          )} />
          <span className={cn(
            "w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out",
            isMobileMenuOpen && "opacity-0"
          )} />
          <span className={cn(
            "w-6 h-0.5 bg-foreground transition-all duration-300 ease-in-out",
            isMobileMenuOpen && "-translate-y-2 -rotate-45"
          )} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white/95 backdrop-blur-sm transition-all duration-300 ease-in-out flex flex-col items-center justify-center space-y-8 md:hidden",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {[
          { name: 'Products', href: '#products' },
          { name: 'Locations', href: '#locations' },
          { name: 'About', href: '#about' },
          { name: 'Contact', href: '#contact' },
        ].map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-medium text-foreground hover:text-nature-500 transition-colors duration-200"
          >
            {item.name}
          </a>
        ))}
      </div>
    </header>
  );
};

export default NavBar;
