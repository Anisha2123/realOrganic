import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Hero from '../components/Hero';
import { Truck, ShieldCheck, Leaf, Phone } from 'lucide-react';
import Shop from './Shop';
import HomeCategories from '../components/HomeCategories';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // Mock data for design demonstration
  const mockProducts = [
    {
      _id: '1',
      name: 'Organic Red Bell Pepper',
      category: 'Vegetables',
      price: 4.99,
      rating: 4.8,
      badge: 'Fresh',
      image: 'https://images.unsplash.com/photo-1563565375-f3fdf5ca2e87?q=80&w=2574&auto=format&fit=crop',
      description: 'Grown without pesticides, these red bell peppers are sweet, crunchy, and packed with vitamins.'
    },
    {
      _id: '2',
      name: 'Fresh Avocados',
      category: 'Fruits',
      price: 6.50,
      rating: 4.9,
      badge: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=2575&auto=format&fit=crop',
      description: 'Creamy, rich, and perfect for guacamole or toast. Sourced from organic farms.'
    },
    {
      _id: '3',
      name: 'Organic Strawberries',
      category: 'Berries',
      price: 5.99,
      rating: 4.7,
      badge: 'Seasonal',
      image: 'https://images.unsplash.com/photo-1464965911861-746a04b4b0a2?q=80&w=2671&auto=format&fit=crop',
      description: 'Sweet, juicy, and 100% organic strawberries. Perfect for desserts or healthy snacking.'
    },
    {
      _id: '4',
      name: 'Raw Honey Jar',
      category: 'Pantry',
      price: 12.99,
      rating: 5.0,
      badge: 'Limited',
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2680&auto=format&fit=crop',
      description: 'Pure, unfiltered raw honey. A natural sweetener with potent antioxidant properties.'
    }
  ];

  const features = [
    { icon: <Truck size={32} />, title: 'Free Shipping', desc: 'On all orders over $50' },
    { icon: <ShieldCheck size={32} />, title: 'Secure Payment', desc: '100% secure transaction' },
    { icon: <Leaf size={32} />, title: '100% Organic', desc: 'Certified organic products' },
    { icon: <Phone size={32} />, title: '24/7 Support', desc: 'Dedicated support team' },
  ];
     const navigate = useNavigate();
  return (

    <div className="bg-white min-h-screen">
      {/* <Hero /> */}
      <HomeCategories />
      {/* Features Section */}
      {/* <section className="py-10 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-emerald-50 hover:shadow-md transition-all duration-300 group">
                <div className="text-gray-40 group-hover:text-emerald-600 transition-colors">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Best Sellers Section */}
      <Shop/>

      {/* Banner Section */}
      {/* <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="bg-emerald-900 rounded-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
            <div className="relative z-10 px-8 py-16 lg:py-24 text-center lg:text-left lg:px-20 lg:w-1/2">
              <span className="text-amber-400 font-bold uppercase tracking-wider mb-2 block">Special Offer</span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Get 50% Off On All Vegetables</h2>
              <p className="text-emerald-100 text-lg mb-8 max-w-md">Join the organic movement today and start eating healthy for a better tomorrow.</p>
              <button onClick={() => navigate(`/shop`)} 
              className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-amber-400 transition-colors duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Home;