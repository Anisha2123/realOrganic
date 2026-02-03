import React from 'react';
import { ArrowRight, Star, Leaf } from 'lucide-react';
import Button from './ui/Button';

const Hero = () => {
  return (
    <section className="relative max-sm:pt-25 pb-10 lg:pt-28 lg:pb-22 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-emerald-50/50 rounded-bl-[100px] hidden lg:block" />
      <div className="absolute top-20 left-10 -z-10 text-emerald-100 animate-pulse">
        <Leaf size={120} />
      </div>

      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Content */}
          <div className="lg:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 bg-emerald-100/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-800 text-sm font-semibold tracking-wide uppercase">
                100% Organic & Fresh
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
              Nature's Best <br />
              <span className="text-emerald-600">Straight to You</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Experience the true taste of nature with our premium selection of organic fruits, vegetables, and daily essentials. Grown with care, delivered with love.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="primary" className="group">
                Shop Now
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline">
                View Promotions
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-200/50 border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop"
                alt="Fresh Organic Vegetables"
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Float Card */}
            <div className="z-10 absolute -bottom-8 -left-8 bg-white p-4 pr-8 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce hover:pause">
              <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                <Star size={24} fill="currentColor" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">4.9 Rating</p>
                <p className="text-xs text-gray-500">Trusted by thousands</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;