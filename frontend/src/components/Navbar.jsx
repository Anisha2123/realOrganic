import React, { useEffect, useState, useRef } from 'react'; // Added useRef
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Heart, ChevronDown, Leaf, X } from 'lucide-react';
import axios from 'axios';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';
import LocationModal from './LocationModal';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("Select Location");
  
  // Search States
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const navigate = useNavigate();
  const { cart, wishlist, products } = useShop(); // Added products from context
  const { user, updateUser } = useAuth();

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  // 1. Initial Load & Scroll Logic
  useEffect(() => {
    if (user?.address) setDisplayLocation(user.address);
    else {
      const savedLoc = localStorage.getItem('realOrganic_location');
      if (savedLoc) setDisplayLocation(JSON.parse(savedLoc).short);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Search Logic
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
      setIsSearchOpen(false);
    } else {
      const results = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6); // Limit results for clean UI
      setFilteredProducts(results);
      setIsSearchOpen(true);
    }
  }, [searchTerm, products]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocationSelect = async (locationData) => {
    setDisplayLocation(locationData.short || locationData.full);
    localStorage.setItem('realOrganic_location', JSON.stringify(locationData));
    if (user?.token) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.patch('/api/users/address', {
          address: locationData.full,
          city: locationData.short,
        }, config);
        if (updateUser) updateUser(data); 
      } catch (error) { console.error(error); }
    }
  };

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-300 ${
      scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-3'
    } border-b border-gray-100`}>
      <div className="container mx-auto px-4 lg:px-12">
        <div className="flex items-center gap-4 lg:gap-8">
          
          {/* Logo & Location */}
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/" className="flex items-center gap-1.5">
              <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
                <Leaf size={20} fill="currentColor" />
              </div>
              <span className="text-xl font-black text-gray-900 tracking-tighter hidden lg:block">
                Real<span className="text-emerald-600">Organic</span>
              </span>
            </Link>

            <button onClick={() => setIsLocationOpen(true)} className="flex flex-col items-start group">
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Delivery in 12 mins</span>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-gray-900 max-w-[120px] truncate">{displayLocation}</span>
                <ChevronDown size={14} className="text-emerald-600" />
              </div>
            </button>
          </div>

          {/* Blinkit Style Search Bar */}
          <div className="hidden md:flex flex-grow relative" ref={searchRef}>
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => searchTerm && setIsSearchOpen(true)}
              placeholder='Search "organic millets"'
              className="w-full bg-[#f8f8f8] border border-gray-100 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-medium"
            />
            
            {/* SEARCH DROPDOWN */}
            {isSearchOpen && (
              <div className="absolute top-[110%] left-0 right-0 bg-white border border-gray-100 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {filteredProducts.length > 0 ? (
                  <div className="p-2">
                    {filteredProducts.map(product => (
                      <Link 
                        key={product._id} 
                        to={`/product/${product._id}`}
                        onClick={() => {setSearchTerm(""); setIsSearchOpen(false);}}
                        className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group"
                      >
                        <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-contain bg-gray-50 p-1" />
                        <div className="flex-grow">
                          <p className="text-[13px] font-medium text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors">{product.name}</p>
                          <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">500g</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">${product.price}</p>
                          <p className="text-[10px] font-black text-emerald-600 uppercase">View</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-sm text-gray-400 font-medium">No organic products found for "{searchTerm}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 lg:gap-6 ml-auto">
            <Link to="/wishlist" className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors relative p-1.5 sm:p-2">
              <Heart size={22} className={wishlist.length > 0 ? "text-red-500" : ""} fill={wishlist.length > 0 ? "currentColor" : "none"} />
            </Link>

            {user ? (
              <Link to="/profile" className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs sm:text-base hover:bg-emerald-600 hover:text-white transition-all uppercase">
                {user.name.charAt(0)}
              </Link>
            ) : (
              <Link to="/login" className="text-xs sm:text-sm font-bold text-gray-700">Login</Link>
            )}

            <Link to="/cart" className="bg-emerald-700 hover:bg-emerald-800 text-white px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-xl flex items-center gap-2 sm:gap-3 transition-all shadow-lg shadow-emerald-200 active:scale-95">
              <div className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-white text-emerald-700 text-[10px] font-black w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-emerald-700">{cartCount}</span>}
              </div>
              <div className="hidden lg:flex flex-col items-start leading-none">
                <span className="text-[10px] font-bold uppercase opacity-80 tracking-widest">My Cart</span>
                <span className="text-sm font-black">${cart.reduce((a, b) => a + (b.price * b.qty), 0).toFixed(2)}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <LocationModal isOpen={isLocationOpen} onClose={() => setIsLocationOpen(false)} onSelect={handleLocationSelect} />
    </nav>
  );
};

export default Navbar;