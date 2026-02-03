import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, X, Leaf, Heart, LogOut } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { cart, wishlist } = useShop();
  const { user, logout } = useAuth(); // Auth Hook

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Wishlist', path: '/wishlist' }, // Added Wishlist link
    { name: 'About Us', path: '/about' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/80 backdrop-blur-md shadow-sm py-4'
        : 'bg-transparent py-6'
        }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-emerald-600 p-2 rounded-xl text-white group-hover:bg-emerald-700 transition-colors">
              <Leaf size={24} fill="currentColor" />
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              Real<span className="text-emerald-600">Organic</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${location.pathname === link.path ? 'text-emerald-600' : 'text-gray-600'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-600 hover:text-emerald-600 transition-colors">
              <Search size={22} />
            </button>

            <Link to="/wishlist" className="text-gray-600 hover:text-emerald-600 transition-colors relative">
              <Heart size={22} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="text-gray-600 hover:text-emerald-600 transition-colors relative">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile / Login */}
            {user ? (
              <div className="relative group">
                <Link to="/profile" className="flex items-center gap-2 text-gray-600 hover:text-emerald-600 font-medium">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold border border-emerald-200">
                    {user.name.charAt(0)}
                  </div>
                </Link>
              </div>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-emerald-600 transition-colors">
                <User size={22} />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-6 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-600 font-medium hover:text-emerald-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center space-x-6 pt-4 border-t border-gray-100">
              <Link to="/cart" className="text-gray-600 hover:text-emerald-600 font-medium">
                Cart ({cartCount})
              </Link>
              {user ? (
                <Link to="/profile" className="text-emerald-600 font-bold hover:text-emerald-700">
                  Profile
                </Link>
              ) : (
                <Link to="/login" className="text-gray-600 hover:text-emerald-600 font-medium">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav >
  );
};

export default Navbar;