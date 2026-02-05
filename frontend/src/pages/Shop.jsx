import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search, ChevronRight } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12); // Increased initial count for smaller cards

  const categories = ['All', 'Vegetables', 'Fruits', 'Berries', 'Pantry', 'Millet Premix'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    setVisibleCount(12);
    if (activeCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, products]);

  const handleShowMore = () => setVisibleCount(prev => prev + 12);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-white min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-3 sm:px-6 lg:px-12">

        {/* Search Bar - Zepto Style */}
        <div className="sticky top-[72px] z-20 bg-white py-3 -mx-3 px-3 border-b border-gray-50 mb-4 sm:hidden">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search for organic groceries..." 
                    className="w-full bg-gray-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500"
                />
            </div>
        </div>

        {/* Category Pills - Sticky & Compact */}
        <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar mb-6 sticky top-0 sm:relative bg-white z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap border transition-all ${
                activeCategory === cat
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-700 shadow-sm'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid - High Density */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
             <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
             <p className="text-gray-400 text-sm font-medium">Fetching fresh produce...</p>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* 2 columns on mobile, 6 on large desktop - True Zepto Style */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
              {displayedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination Button */}
            {visibleCount < filteredProducts.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleShowMore}
                  className="group flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 text-gray-900 font-bold text-sm rounded-xl hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm"
                >
                  See more {activeCategory === 'All' ? 'products' : activeCategory}
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-32 border-2 border-dashed border-gray-100 rounded-3xl">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <Search size={32} className="text-gray-300" />
            </div>
            <p className="text-gray-900 font-bold">Item not found</p>
            <p className="text-gray-400 text-sm mt-1">Try selecting a different category or search term.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;