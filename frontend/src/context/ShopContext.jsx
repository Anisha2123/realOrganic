import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    // Mock user ID for now
    const userId = "guest_user_123";

    // Fetch Wishlist on Mount
    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                const { data } = await axios.get(`/api/wishlist/${userId}`);
                setWishlist(data);
            } catch (error) {
                console.error("Failed to fetch wishlist", error);
            }
        };
        fetchWishlist();
    }, []);

    const addToCart = (product, qty = 1) => {
        setCart((prev) => {
            const exist = prev.find((x) => x._id === product._id);
            if (exist) {
                return prev.map((x) =>
                    x._id === product._id ? { ...x, qty: x.qty + qty } : x
                );
            } else {
                return [...prev, { ...product, qty }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((x) => x._id !== id));
    };

    const toggleWishlist = async (product) => {
        try {
            // Optimistic update
            const isExist = wishlist.find(p => p._id === product._id);
            if (isExist) {
                setWishlist(prev => prev.filter(p => p._id !== product._id));
            } else {
                setWishlist(prev => [...prev, product]);
            }

            // API Call
            await axios.post('/api/wishlist/toggle', { userId, productId: product._id });
        } catch (error) {
            console.error("Wishlist toggle error", error);
            // Revert if needed (skipped for simplicity)
        }
    };

    const clearCart = () => setCart([]);

    return (
        <ShopContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, clearCart, toggleWishlist, userId }}>
            {children}
        </ShopContext.Provider>
    );
};
