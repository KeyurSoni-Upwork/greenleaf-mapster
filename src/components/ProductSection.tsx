
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import AnimatedText from './AnimatedText';

// Sample product data
const PRODUCTS = [
  {
    id: 1,
    name: "Premium Bud Collection",
    description: "Our finest selection of premium flower, carefully cultivated for maximum potency and flavor profile.",
    image: "https://images.unsplash.com/photo-1585669060258-2dc6a3979dc7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "flower",
    price: 49.99,
    rating: 4.9,
    labels: ["Premium", "High THC", "Organic"]
  },
  {
    id: 2,
    name: "Relaxation Tincture",
    description: "A balanced CBD/THC tincture designed to provide relief and relaxation without the intense high.",
    image: "https://images.unsplash.com/photo-1579091372931-309dd6daaa7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
    category: "tincture",
    price: 39.99,
    rating: 4.7,
    labels: ["CBD", "Balance", "Sleep"]
  },
  {
    id: 3,
    name: "Energizing Edibles",
    description: "Delicious gummies infused with sativa-dominant strains to provide an uplifting and energetic experience.",
    image: "https://images.unsplash.com/photo-1578522304830-1a4749855ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
    category: "edible",
    price: 24.99,
    rating: 4.5,
    labels: ["Sativa", "Energizing", "Tasty"]
  },
  {
    id: 4,
    name: "Ultimate Vape Cartridge",
    description: "High-potency vape cartridges made with premium distillate and natural terpenes for a smooth experience.",
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
    category: "vape",
    price: 34.99,
    rating: 4.8,
    labels: ["Potent", "Discreet", "Strain Specific"]
  },
  {
    id: 5,
    name: "Calming Topical Cream",
    description: "Fast-acting topical cream with a blend of CBD and botanical extracts to soothe muscle aches and pains.",
    image: "https://images.unsplash.com/photo-1595954426700-280d446b1dbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
    category: "topical",
    price: 29.99,
    rating: 4.6,
    labels: ["Pain Relief", "CBD", "No High"]
  },
  {
    id: 6,
    name: "Concentrate Collection",
    description: "High-potency concentrates for experienced users looking for maximum effect and flavor intensity.",
    image: "https://images.unsplash.com/photo-1556928045-16f7f50be0f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
    category: "concentrate",
    price: 54.99,
    rating: 4.9,
    labels: ["Potent", "Premium", "Artisanal"]
  }
];

const CATEGORIES = [
  { id: "all", name: "All Products" },
  { id: "flower", name: "Flower" },
  { id: "tincture", name: "Tinctures" },
  { id: "edible", name: "Edibles" },
  { id: "vape", name: "Vapes" },
  { id: "topical", name: "Topicals" },
  { id: "concentrate", name: "Concentrates" }
];

const ProductSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const filteredProducts = activeCategory === "all" 
    ? PRODUCTS 
    : PRODUCTS.filter(product => product.category === activeCategory);

  return (
    <section id="products" className="py-24 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <AnimatedText
            tag="h2"
            text="Explore Our Products"
            className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4"
          />
          <AnimatedText
            tag="p"
            text="Discover our premium collection of marijuana products, carefully curated for quality, potency, and exceptional experience."
            className="text-muted-foreground text-lg"
            delay={200}
          />
        </div>
        
        <div className="flex justify-center mb-12 overflow-x-auto soft-border rounded-full bg-white p-1 shadow-sm no-scrollbar">
          <div className="flex space-x-1">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                className={cn(
                  "px-5 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap",
                  activeCategory === category.id
                    ? "bg-nature-500 text-white shadow-sm"
                    : "text-foreground hover:bg-nature-100"
                )}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id}
              className="group rounded-xl soft-border bg-white shadow-sm overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md opacity-0 animate-fade-in"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {product.labels.map((label) => (
                    <span 
                      key={label} 
                      className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full text-nature-700"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display font-medium text-xl">{product.name}</h3>
                  <div className="flex items-center space-x-1 text-sm">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="font-medium">{product.rating}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                  <button 
                    className="px-4 py-2 bg-nature-100 text-nature-700 rounded-md font-medium text-sm transition-colors hover:bg-nature-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-nature-500 text-white rounded-md hover:bg-nature-600 transition-colors"
          >
            <span>Contact Us About Bulk Orders</span>
            <svg className="w-5 h-5 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
