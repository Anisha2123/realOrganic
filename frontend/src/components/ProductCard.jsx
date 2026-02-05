import React from 'react';
import { Heart, Star, Plus, Minus } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom'; // Added Link
import "../App.css";

const ProductCard = ({ product }) => {
  const { toggleWishlist, wishlist, addToCart, cart } = useShop();
  
  const cartItem = cart.find(item => item._id === product._id);
  const isWishlisted = wishlist.some(p => p._id === product._id);

  return (
    <div className="bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 flex flex-col h-full group relative">
      
      {/* 1. Top Section: Wishlist (Stays clickable without navigating) */}
      <div className="absolute top-2 right-2 z-20">
        <button
          onClick={(e) => {
            e.preventDefault(); // Prevents navigation
            e.stopPropagation(); // Prevents event bubbling
            toggleWishlist(product);
          }}
          className={`p-1.5 rounded-full transition-colors ${
            isWishlisted ? 'text-red-500' : 'text-gray-300 hover:text-red-400'
          }`}
        >
          <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {product.badge && (
        <div className="absolute top-0 left-0 bg-emerald-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-tl-xl rounded-br-xl z-10 uppercase tracking-tighter">
          {product.badge}
        </div>
      )}

      {/* 2. Link Wrapper: Only wraps the image and text */}
      <Link to={`/product/${product._id}`} className="flex flex-col flex-1 cursor-pointer">
        <div className="relative w-full aspect-square mb-2 flex items-center justify-center bg-gray-50/50 rounded-lg overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-4/5 h-4/5 object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-1 mb-1">
             <div className="flex items-center text-[10px] text-gray-500 font-medium bg-gray-100 px-1.5 py-0.5 rounded">
              <Star size={10} className="text-amber-500 mr-0.5" fill="currentColor" />
              {product.rating}
            </div>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
              {product.category}
            </span>
          </div>

          <h3 className="text-[#1A1A1A] text-[13px] leading-[18px] font-medium line-clamp-2 h-9 mb-1 tracking-tight group-hover:text-emerald-700 transition-colors">
            {product.name}
          </h3>
        </div>
      </Link>

      {/* 3. Bottom Section: Price & Buttons (Outside the Link for button safety) */}
      <div className="mt-auto pt-2 flex items-center justify-between relative z-20">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900">₹{product.price}</span>
        </div>

        {cartItem ? (
          <div className="flex items-center gap-3 bg-emerald-600 text-white px-2 py-1 rounded-lg shadow-sm">
            <button 
              onClick={(e) => { e.preventDefault(); addToCart(product, -1); }}
              className="hover:bg-emerald-700 p-0.5 rounded transition-colors"
            >
              <Minus size={14} strokeWidth={3} />
            </button>
            
            <span className="text-xs font-bold w-4 text-center">
              {cartItem.qty}
            </span>

            <button 
              onClick={(e) => { e.preventDefault(); addToCart(product, 1); }}
              className="hover:bg-emerald-700 p-0.5 rounded transition-colors"
            >
              <Plus size={14} strokeWidth={3} />
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault(); // Prevents Link navigation
              addToCart(product, 1);
            }}
            className="flex items-center justify-center gap-1 border border-emerald-600 text-emerald-600 bg-white hover:bg-emerald-600 hover:text-white px-3 py-1.5 rounded-lg transition-all duration-200 font-bold text-[11px] shadow-sm active:scale-95"
          >
            ADD
            <Plus size={13} strokeWidth={3} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;