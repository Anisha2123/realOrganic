import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Package, Calendar, MapPin, Loader } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock fetching orders for now since we don't have a dedicated "myorders" endpoint yet
    // In a real app, we'd add `router.get('/myorders', protect, ...)` to backend
  // Profile.js (Update the useEffect)
useEffect(() => {
    const fetchOrders = async () => {
        try {
            // Assuming you store token in localStorage or context
            const config = { 
                headers: { Authorization: `Bearer ${user.token}` } 
            };
            const { data } = await axios.get('/api/orders/myorders', config);
            setOrders(data);
        } catch (error) {
            console.error("Error fetching orders", error);
        } finally {
            setLoading(false);
        }
    };

    if (user) fetchOrders();
}, [user]);

    if (!user) {
        return <div className="pt-32 text-center text-red-500">Please log in to view profile.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-6 lg:px-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">My Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm h-fit">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-2xl font-bold text-emerald-600">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{user.name}</h3>
                                <p className="text-sm text-gray-500 truncate max-w-[150px]">{user.email}</p>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            <button className="w-full text-left px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-medium">
                                Order History
                            </button>
                            <button className="w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                                Settings
                            </button>
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-4"
                            >
                                Logout
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Package className="text-emerald-600" />
                            Order History
                        </h2>

                        {loading ? (
                            <div className="flex justify-center p-12"><Loader className="animate-spin text-emerald-600" /></div>
                        ) : orders.length === 0 ? (
                            <div className="bg-white p-8 rounded-2xl text-center shadow-sm text-gray-500">
                                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                                <p>No orders found. Start shopping!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Order List would go here */}
                                {/* Inside the Profile Order List area */}
<div className="space-y-4">
  {orders.map((order) => (
    <div key={order._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-mono text-gray-400 uppercase">Order ID: {order._id}</p>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
          PAID
        </span>
      </div>
      <div className="flex gap-4">
        {order.orderItems.map((item, index) => (
          <img key={index} src={item.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
        ))}
      </div>
      <p className="mt-4 font-bold text-gray-900">Total: ${order.totalPrice}</p>
    </div>
  ))}
</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
