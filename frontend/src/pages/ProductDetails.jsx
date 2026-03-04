import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Clock, ShieldCheck, ChevronRight, Star, Minus, Plus } from 'lucide-react';
import axios from 'axios';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, toggleWishlist, wishlist, cart } = useShop();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Get item quantity from cart if it exists
    const cartItem = cart.find(item => item._id === id);
    const quantity = cartItem ? cartItem.qty : 0;
    const isWishlisted = wishlist.some(p => p._id === id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
    );

    if (!product) return <div className="pt-32 text-center">Product not found</div>;

    return (
        <div className="min-h-screen bg-white pt-24 pb-20 antialiased">
            <div className="container mx-auto px-4 lg:px-12 max-w-7xl">
                
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-8">
                    <span className="cursor-pointer hover:text-emerald-600" onClick={() => navigate('/')}>Home</span>
                    <ChevronRight size={12} />
                    <span className="cursor-pointer hover:text-emerald-600" onClick={() => navigate('/shop')}>Shop</span>
                    <ChevronRight size={12} />
                    <span className="text-gray-900">{product.category}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    
                    {/* Left: Product Image */}
                    <div className="lg:col-span-7">
                        <div className="relative bg-[#F9F9F9] rounded-[40px] p-12 flex items-center justify-center group overflow-hidden border border-gray-50">
                            <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full max-w-md object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                            />
                            
                            {/* Wishlist Button Overlay */}
                            <button 
                                onClick={() => toggleWishlist(product)}
                                className={`absolute top-8 right-8 p-3 rounded-full shadow-lg transition-all active:scale-90 ${
                                    isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-gray-300 hover:text-red-500'
                                }`}
                            >
                                <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                            </button>

                            {product.badge && (
                                <span className="absolute top-8 left-8 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                                    {product.badge}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right: Product Meta & Actions */}
                    <div className="lg:col-span-5 flex flex-col pt-4">
                        <h1 className="text-3xl font-semibold text-gray-900 leading-tight mb-2 tracking-tight">
                            {product.name}
                        </h1>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
                                <Star size={14} className="text-emerald-600" fill="currentColor" />
                                <span className="text-xs font-bold text-emerald-700">{product.rating}</span>
                            </div>
                            <span className="text-gray-300 text-sm">|</span>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{product.category}</span>
                        </div>

                        <div className="mb-8">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="text-3xl font-bold text-gray-900 tracking-tighter">₹{product.price}</span>
                                <span className="text-sm text-gray-400 line-through">₹{product.price + 40}</span>
                            </div>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase">Inclusive of all taxes</p>
                        </div>

                        {/* Description Section */}
                        <div className="space-y-4 mb-10">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Product Description</h3>
                            <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                {product.description}
                            </p>
                        </div>

                        {/* Blinkit-style Action Area */}
                        <div className="mt-auto space-y-6">
                            
                            <div className="flex items-center gap-4">
                                {quantity > 0 ? (
                                    <div className="flex items-center justify-between bg-emerald-600 text-white w-32 px-4 py-3.5 rounded-2xl shadow-lg shadow-emerald-100 transition-all">
                                        <button onClick={() => addToCart(product, -1)} className="hover:bg-emerald-700 p-0.5 rounded-lg"><Minus size={18}/></button>
                                        <span className="font-bold text-lg">{quantity}</span>
                                        <button onClick={() => addToCart(product, 1)} className="hover:bg-emerald-700 p-0.5 rounded-lg"><Plus size={18}/></button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => addToCart(product, 1)}
                                        className="bg-emerald-600 text-white font-semibold px-12 py-4 rounded-2xl shadow-lg shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition-all flex items-center gap-3"
                                    >
                                        <ShoppingBag size={20} />
                                        Add to Cart
                                    </button>
                                )}
                            </div>

                            {/* Trust Badges (Premium Minimalist) */}
                            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-xl text-gray-400"><Clock size={18} /></div>
                                    <p className="text-[11px] font-semibold text-gray-500 leading-tight">Delivery in<br/><span className="text-gray-900">12 minutes</span></p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gray-50 rounded-xl text-gray-400"><ShieldCheck size={18} /></div>
                                    <p className="text-[11px] font-semibold text-gray-500 leading-tight">Quality<br/><span className="text-gray-900">Guaranteed</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;