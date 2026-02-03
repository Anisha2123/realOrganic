import React from 'react';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';

const Wishlist = () => {
    const { wishlist } = useShop();

    return (
        <div className="bg-white min-h-screen pt-24 pb-12">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex items-center gap-3 mb-10">
                    <Heart className="text-emerald-600" size={32} />
                    <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                </div>

                {wishlist.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-3xl">
                        <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 text-lg">Your wishlist is empty.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
