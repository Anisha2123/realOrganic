import React from 'react';
import { Heart, Star, Plus, Minus } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import "../App.css";

const ProductCard = ({ product }) => {
  const { toggleWishlist, wishlist, addToCart, cart } = useShop();

  const cartItem = cart.find(item => item._id === product._id);
  const isWishlisted = wishlist.some(p => p._id === product._id);

  return (
    <div className="bg-white rounded-xl p-3 max-md:p-2 max-sm:p-1.5 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col h-full group relative">

      {/* Wishlist button */}
      <div className="absolute top-2 right-2 max-sm:top-1 max-sm:right-1 z-20">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`p-1.5 max-sm:p-1 rounded-full transition-colors ${
            isWishlisted ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
          }`}
        >
          <Heart size={18} className="max-sm:w-3.5 max-sm:h-3.5" fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {product.badge && (
        <div className="absolute top-0 left-0 bg-emerald-600 text-white text-[9px] max-sm:text-[7px] font-bold px-2 max-sm:px-1.5 py-0.5 rounded-tl-xl rounded-br-xl z-10 uppercase tracking-tighter">
          {product.badge}
        </div>
      )}

      {/* Link: image + text */}
      <Link to={`/product/${product._id}`} className="flex flex-col flex-1 cursor-pointer">
        <div className="relative w-full aspect-square mb-2 max-sm:mb-1 flex items-center justify-center bg-gray-50/50 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-1 mb-1">
            <div className="flex items-center text-[10px] max-sm:text-[8px] text-gray-500 font-medium bg-gray-100 px-1.5 max-sm:px-1 py-0.5 rounded">
              <Star size={10} className="max-sm:w-2 max-sm:h-2 text-amber-500 mr-0.5" fill="currentColor" />
              {product.rating}
            </div>
            <span className="text-[10px] max-sm:text-[8px] text-gray-400 font-medium uppercase tracking-tighter truncate">
              {product.category}
            </span>
          </div>

          <h3 className="text-[#1A1A1A] text-[13px] max-md:text-[12px] max-sm:text-[11px] leading-[18px] max-sm:leading-[15px] font-medium line-clamp-2 h-9 max-sm:h-[30px] mb-1 tracking-tight group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
        </div>
      </Link>

      {/* Price + Cart */}
      <div className="mt-auto pt-2 max-sm:pt-1 flex items-center justify-between relative z-20">
        <div className="flex flex-col">
          <span className="text-sm max-sm:text-xs font-bold text-gray-900">₹{product.price}</span>
        </div>

        {cartItem ? (
          <div className="flex items-center gap-3 max-sm:gap-1.5 bg-emerald-600 text-white px-2 max-sm:px-1.5 py-1 max-sm:py-0.5 rounded-lg shadow-sm">
            <button
              onClick={(e) => { e.preventDefault(); addToCart(product, -1); }}
              className="hover:bg-emerald-700 p-0.5 rounded transition-colors"
            >
              <Minus size={14} className="max-sm:w-3 max-sm:h-3" strokeWidth={3} />
            </button>

            <span className="text-xs max-sm:text-[10px] font-bold w-4 max-sm:w-3 text-center">
              {cartItem.qty}
            </span>

            <button
              onClick={(e) => { e.preventDefault(); addToCart(product, 1); }}
              className="hover:bg-emerald-700 p-0.5 rounded transition-colors"
            >
              <Plus size={14} className="max-sm:w-3 max-sm:h-3" strokeWidth={3} />
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="flex items-center justify-center gap-1 border border-emerald-600 text-emerald-600 bg-white hover:bg-emerald-600 hover:text-white px-3 max-sm:px-2 py-1.5 max-sm:py-1 rounded-lg transition-all duration-200 font-bold text-[11px] max-sm:text-[9px] shadow-sm active:scale-95"
          >
            ADD
            <Plus size={13} className="max-sm:w-2.5 max-sm:h-2.5" strokeWidth={3} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;