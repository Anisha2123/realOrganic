import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(12);

  const location = useLocation();

  // Get category from URL
  const queryParams = new URLSearchParams(location.search);
  const categoryFromURL = queryParams.get('category') || 'All';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let url = `${import.meta.env.VITE_API_URL}/products`;

        if (categoryFromURL !== 'All') {
          url = `${import.meta.env.VITE_API_URL}/products?category=${categoryFromURL}`;
        }

        const { data } = await axios.get(url);

        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryFromURL]);

  const handleShowMore = () => setVisibleCount(prev => prev + 12);

  const displayedProducts = products.slice(0, visibleCount);

  return (
    <div className="bg-white min-h-screen pt-20 pb-12">
      <div className="container mx-auto px-3 sm:px-6 lg:px-12">

        <h2 className="text-xl font-bold mb-6">
          {categoryFromURL === 'All' ? 'All Products' : categoryFromURL}
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="w-10 h-10 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="text-gray-400 text-sm font-medium">
              Fetching fresh products...
            </p>
          </div>
        ) : (
          <>
            <div className="grid max-md:grid-cols-3 max-lg:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
              {displayedProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {visibleCount < products.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleShowMore}
                  className="group flex items-center gap-2 px-8 py-3 bg-white border border-gray-200 text-gray-900 font-bold text-sm rounded-xl hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all shadow-sm"
                >
                  See more
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-32">
            <p className="text-gray-500 font-semibold">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;