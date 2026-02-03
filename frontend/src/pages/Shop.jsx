import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Filter, Search } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = ['All', 'Vegetables', 'Fruits', 'Berries', 'Pantry'];

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
    setVisibleCount(8); // Reset pagination when category changes
    if (activeCategory === 'All') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(p => p.category === activeCategory));
    }
  }, [activeCategory, products]);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 sm:mb-10">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shop Organic</h1>
            <p className="text-sm sm:text-base text-gray-500 mt-1 sm:mt-2">Browse the freshest produce</p>
          </div>

          {/* <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${activeCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-emerald-50 border border-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div> */}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20 text-emerald-600">Loading products...</div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {displayedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Show More Button */}
            {visibleCount < filteredProducts.length && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleShowMore}
                  className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-full hover:bg-gray-50 hover:border-emerald-200 hover:text-emerald-700 transition-all shadow-sm"
                >
                  Show More
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;