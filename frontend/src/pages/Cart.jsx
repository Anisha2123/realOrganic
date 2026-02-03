import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import Button from '../components/ui/Button';
import axios from 'axios';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useShop();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      // 1. Create Razorpay Order on your Backend
      const { data: orderData } = await axios.post('/api/orders/payment', { amount: total * 1.1 + 5.00 });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from Dashboard
        amount: orderData.amount,
        currency: orderData.currency,
        name: "RealOrganic",
        description: "Purchase Transaction",
        order_id: orderData.id,
        handler: async (response) => {
          // This runs after successful payment
          const paymentData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderItems: cart,
            totalPrice: total * 1.1 + 5.00,
          };

          // 2. Save the final order in your Database
          await axios.post('/api/orders', paymentData);
          clearCart();
          navigate('/profile'); // Redirect to profile to see the order
        },
        prefill: {
          name: "Guest User",
          email: "guest@example.com",
        },
        theme: { color: "#10b981" }, // Emerald-600
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-12 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
        <Button onClick={() => navigate('/shop')}>Go Shopping</Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-6 lg:px-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover bg-gray-100" />

                <div className="flex-grow">
                  <h3 className="font-bold text-gray-900 text-lg">{item.name}</h3>
                  <p className="text-emerald-600 font-medium">${item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200" onClick={() => addToCart(item, -1)} disabled={item.qty <= 1}>
                    <Minus size={16} />
                  </button>
                  <span className="font-bold w-4 text-center">{item.qty}</span>
                  <button className="p-1 rounded-full bg-gray-100 hover:bg-gray-200" onClick={() => addToCart(item, 1)}>
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-gray-400 hover:text-red-500 p-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-2xl shadow-sm h-fit">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax (10%)</span>
                <span className="font-bold text-gray-900">${(total * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="font-bold text-gray-900">$5.00</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between text-lg">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-emerald-600">${(total * 1.1 + 5).toFixed(2)}</span>
              </div>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Checkout'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;