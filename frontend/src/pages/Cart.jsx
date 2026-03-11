import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import axios from 'axios';
import { Trash2, Plus, Minus, ChevronRight, Clock, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeFromCart, addToCart, clearCart } = useShop();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const itemsPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const taxPrice = itemsPrice * 0.1;
  const shippingPrice = 0.00;
  const grandTotal = itemsPrice + taxPrice + shippingPrice;

  const handleCheckout = async () => {
    if (!user) {
      return navigate('/login', { state: { from: '/cart' } });
    }
    const savedLocation = JSON.parse(
  localStorage.getItem("realOrganic_location")
);
   if (!savedLocation) {
  alert("Please select delivery location before checkout.");
  setLoading(false);
  return;
}
const extractZip = (address) => {
  const match = address?.match(/\b\d{6}\b/);
  return match ? match[0] : null;
};
const zipCode = extractZip(savedLocation.full);

if (!zipCode) {
  alert("Pincode not found in selected address.");
  setLoading(false);
  return;
}
console.log(`zipCode is ${zipCode}`);
 console.log(savedLocation);

    setLoading(true);
    try {
      const { data: orderData } = await axios.post('/orders/payment', { 
        amount: grandTotal 
      });
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "RealOrganic",
        description: "Purchase Transaction",
        order_id: orderData.id,
        handler: async (response) => {
          
          // FIX 1: Ensure product ID mapping is correct for MongoDB ObjectId
          const mappedItems = cart.map(item => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item._id || item.product 
          }));

          // FIX 2: Restore original PaymentData payload structure
          const paymentData = {
            orderItems: mappedItems,
            itemsPrice: itemsPrice,
            taxPrice: taxPrice,
            shippingPrice: shippingPrice,
            totalPrice: grandTotal,
            paymentResult: {
              id: response.razorpay_payment_id,
              order_id: response.razorpay_order_id,    // Added back
              signature: response.razorpay_signature, // Added back
              status: 'paid',
              update_time: new Date().toISOString(),
            },
            customerInfo: {
              name: user.name,
              email: user.email,
              userId: user._id,
              phone:user.phone,
              address: savedLocation?.full || "Address not selected",
              city: savedLocation?.short || "",
              zip: savedLocation?.zipCode || "",
            }
            
          };
          console.log(paymentData);
          

          const config = {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          };
          
          try {
            await axios.post('/orders', paymentData, config);
            clearCart();
            navigate('/profile'); 
          } catch (err) {
            console.error("Order saving failed:", err.response?.data || err.message);
            alert("Payment successful, but order failed to save in Database.");
          }
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: "#059669" },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment initialization failed", error);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white antialiased">
        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="text-gray-200" size={32} />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Your cart is empty</h2>
        <button 
          onClick={() => navigate('/shop')}
          className="mt-4 text-emerald-600 font-semibold text-sm hover:underline"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FA] min-h-screen pt-24 pb-32 antialiased">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white p-4 rounded-2xl flex items-center gap-4 border border-emerald-50 shadow-sm">
              <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                <Clock size={20} />
              </div>
              <p className="text-sm font-semibold text-gray-900">Delivery in 10-15 minutes</p>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {cart.map((item, index) => (
                <div key={item._id} className={`p-4 flex items-center gap-4 ${index !== cart.length - 1 ? 'border-b border-gray-50' : ''}`}>
                  <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-sm font-semibold text-gray-900 leading-tight">{item.name}</h3>
                    <p className="text-[11px] text-gray-400 font-medium mt-0.5">Organic • 500g</p>
                    <p className="text-sm font-bold text-gray-900 mt-1">₹ {item.price}</p>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="flex items-center gap-3 border border-gray-100 rounded-lg px-2 py-1">
                      <button onClick={() => addToCart(item, -1)} className="text-gray-400 hover:text-emerald-600"><Minus size={12}/></button>
                      <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                      <button onClick={() => addToCart(item, 1)} className="text-gray-400 hover:text-emerald-600"><Plus size={12}/></button>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="text-gray-300 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-28">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-6">Bill Summary</h3>
              
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between text-gray-500">
                  <span>Item Total</span>
                  <span className="text-gray-900">₹ {itemsPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="text-gray-900">₹ {shippingPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Taxes (10%)</span>
                  <span className="text-gray-900">₹ {taxPrice.toFixed(2)}</span>
                </div>
                
                <div className="border-t border-gray-50 pt-4 flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-900">Total to Pay</span>
                  <span className="text-xl font-bold text-gray-900 tracking-tighter">₹ {grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={loading}
                className="hidden lg:flex mt-8 w-full bg-emerald-600 text-white items-center justify-center gap-2 py-4 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-50"
              >
                {loading ? 'Processing...' : 'Place Order'}
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-40">
        <button 
          onClick={handleCheckout}
          disabled={loading}
          className="w-full bg-emerald-600 text-white flex items-center justify-between px-6 py-4 rounded-2xl font-semibold shadow-xl shadow-emerald-50"
        >
          <div className="text-left">
            <p className="text-lg font-bold">₹ {grandTotal.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-1">
            {loading ? 'Processing...' : 'Place Order'}
            <ChevronRight size={20} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Cart;