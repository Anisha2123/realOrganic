import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // --- NEW: Products State for Search ---
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initialize Cart from LocalStorage
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('realOrganic_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    
    const [wishlist, setWishlist] = useState([]);

    // --- NEW: Fetch All Products on Mount ---
    // This allows the Search bar in the Navbar to access all items
    useEffect(() => {
        const fetchAllProducts = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get('/api/products'); // Ensure this route exists
                setProducts(data);
            } catch (error) {
                console.error("Error loading products for search:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllProducts();
    }, []);

    // Sync Cart to LocalStorage
    useEffect(() => {
        localStorage.setItem('realOrganic_cart', JSON.stringify(cart));
    }, [cart]);

    // Fetch Wishlist only if user is logged in
    useEffect(() => {
        const fetchWishlist = async () => {
            if (user?._id) {
                try {
                    const { data } = await axios.get(`/api/wishlist/${user._id}`);
                    setWishlist(data);
                } catch (error) {
                    console.error("Failed to fetch wishlist", error);
                }
            }
        };
        fetchWishlist();
    }, [user]);

    const addToCart = (product, qty = 1) => {
        setCart((prev) => {
            const exist = prev.find((x) => x._id === product._id);
            if (exist) {
                if (exist.qty + qty <= 0) {
                    return prev.filter((x) => x._id !== product._id);
                }
                return prev.map((x) =>
                    x._id === product._id ? { ...x, qty: x.qty + qty } : x
                );
            } else {
                return qty > 0 ? [...prev, { ...product, qty }] : prev;
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((x) => x._id !== id));
    };

    const toggleWishlist = async (product) => {
        if (!user) return navigate('/login');
        try {
            const isExist = wishlist.find(p => p._id === product._id);
            if (isExist) {
                setWishlist(prev => prev.filter(p => p._id !== product._id));
            } else {
                setWishlist(prev => [...prev, product]);
            }
            await axios.post('/api/wishlist/toggle', { userId: user._id, productId: product._id });
        } catch (error) {
            console.error("Wishlist toggle error", error);
        }
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('realOrganic_cart');
    };

    return (
        <ShopContext.Provider value={{ 
            products,     // Exporting products for the Search bar
            loading,      // Exporting loading state
            cart, 
            wishlist, 
            addToCart, 
            removeFromCart, 
            clearCart, 
            toggleWishlist 
        }}>
            {children}
        </ShopContext.Provider>
    );
};