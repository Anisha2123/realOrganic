import React from 'react';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useShop } from '../context/ShopContext';

const ProductCard = ({ product }) => {
  const { toggleWishlist, wishlist, addToCart } = useShop();
  
  const isWishlisted = wishlist.some(p => p._id === product._id);

  return (
    <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm hover:shadow-xl transition-all duration-300 group relative border border-gray-100 flex flex-row sm:flex-col gap-4 sm:gap-0 items-center sm:items-stretch h-auto sm:h-full">
      {/* Badge */}
      {product.badge && (
        <span className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-amber-500 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-10">
          {product.badge}
        </span>
      )}

      {/* Image Container */}
      <div className="relative w-28 h-28 sm:w-full sm:h-48 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 sm:mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Quick Actions (only visible on desktop/tablet hover or always accessible via layout if needed, but keeping consistent) */}
        <div className="absolute top-2 right-2 hidden sm:flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`p-2 rounded-full shadow-md transition-colors ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-500 hover:text-red-500'
              }`}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-1 sm:space-y-2 w-full">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold text-emerald-600 uppercase tracking-wide">
              {product.category}
            </span>
            <h3 className="text-gray-900 font-bold text-sm sm:text-lg leading-tight group-hover:text-emerald-700 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </div>
          {/* Mobile Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
            }}
            className={`sm:hidden p-1.5 rounded-full shadow-sm border border-gray-100 transition-colors ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-400'}`}
          >
            <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Rating - Hidden on very small screens if needed, or kept small */}
        <div className="flex items-center gap-1 text-amber-500 text-[10px] sm:text-xs font-bold bg-amber-50 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md w-fit">
          <Star size={10} className="sm:w-3 sm:h-3" fill="currentColor" />
          <span>{product.rating}</span>
        </div>

        <p className="hidden sm:block text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between pt-1 sm:pt-2 mt-auto">
          <div className="flex flex-col">
            <span className="hidden sm:block text-xs text-gray-400 font-medium">Price</span>
            <span className="text-lg sm:text-xl font-bold text-gray-900">${product.price}</span>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="bg-emerald-100 text-emerald-700 p-2 sm:p-2.5 rounded-lg sm:rounded-xl hover:bg-emerald-600 hover:text-white transition-all duration-300"
          >
            <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;