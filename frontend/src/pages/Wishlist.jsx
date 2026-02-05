import React from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    const { wishlist } = useShop();

    return (
        <div className="bg-white min-h-screen pt-24 pb-20 antialiased">
            <div className="container mx-auto px-4 lg:px-12">
                
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-50 p-2 rounded-xl text-red-500">
                            <Heart size={24} fill="currentColor" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Saved Items</h1>
                            <p className="text-xs font-medium text-gray-500">{wishlist.length} products saved</p>
                        </div>
                    </div>
                </div>

                {wishlist.length === 0 ? (
                    /* Empty State - Zepto Style */
                    <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-gray-100 rounded-[32px] bg-gray-50/30">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                            <Heart size={32} className="text-gray-200" />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900">Your wishlist is lonely</h2>
                        <p className="text-sm text-gray-500 mt-1 mb-8 max-w-[250px] text-center leading-relaxed">
                            Save items you like so you can easily find them later.
                        </p>
                        <Link 
                            to="/shop" 
                            className="bg-emerald-600 text-white font-semibold px-8 py-3 rounded-2xl hover:bg-emerald-700 transition-all active:scale-95 shadow-lg shadow-emerald-100 flex items-center gap-2 text-sm"
                        >
                            <ShoppingBag size={18} />
                            Go to Shop
                        </Link>
                    </div>
                ) : (
                    /* High-Density Grid like Zepto Shop */
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
                        {wishlist.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;