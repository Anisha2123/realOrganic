import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Package, Calendar, MapPin, Loader, ExternalLink } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.token) return; // Don't fetch if no token exists

            try {
                // We use the Bearer token in the header to identify the user on the server
                const config = { 
                    headers: { 
                        Authorization: `Bearer ${user.token}` 
                    } 
                };

                // This hits the .get('/myorders', protect, ...) route you created earlier
                const { data } = await axios.get('/api/orders/myorders', config);
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders", error);
                // Optional: handle token expiration by logging out
                if (error.response?.status === 401) logout();
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user, logout]); // Added logout to dependencies for safety

    if (!user) {
        return <div className="pt-32 text-center text-red-500 font-mono underline decoration-wavy">ACCESS_DENIED: Please log in.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 selection:bg-emerald-100">
            <div className="container mx-auto px-6 lg:px-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">System Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center text-2xl font-bold text-emerald-600 shadow-inner">
                                {user.name.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <h3 className="font-bold text-gray-900 truncate">{user.name}</h3>
                                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{user.role || 'User'}</p>
                            </div>
                        </div>

                        <nav className="space-y-1">
                            <button className="w-full text-left px-4 py-2.5 bg-emerald-600 text-white rounded-xl text-sm font-medium shadow-lg shadow-emerald-200 transition-all">
                                Order History
                            </button>
                            <button className="w-full text-left px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-xl text-sm transition-colors">
                                Security Settings
                            </button>
                            <button
                                onClick={logout}
                                className="w-full text-left px-4 py-2.5 text-red-500 hover:bg-red-50 rounded-xl text-sm transition-colors mt-4 font-bold"
                            >
                                Terminate Session
                            </button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="md:col-span-3">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Package className="text-emerald-600" size={20} />
                                Deployment History
                            </h2>
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">
                                Total Orders: {orders.length}
                            </span>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center p-20 gap-4">
                                <Loader className="animate-spin text-emerald-600" size={32} />
                                <span className="text-xs font-mono text-gray-400 animate-pulse">FETCHING_DATA...</span>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="bg-white border-2 border-dashed border-gray-100 p-12 rounded-3xl text-center">
                                <Package size={48} className="mx-auto text-gray-200 mb-4" />
                                <p className="text-gray-500 font-medium">No transactions found in database.</p>
                                <button className="mt-4 text-emerald-600 font-bold text-sm hover:underline">Return to Market</button>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                {orders.map((order) => (
                                    <div key={order._id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-emerald-200 transition-colors group">
                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                                            <div>
                                                <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Transaction ID</p>
                                                <p className="text-sm font-bold text-gray-700">#{order._id.substring(0, 12)}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.isPaid ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                    {order.isPaid ? 'Success' : 'Pending'}
                                                </span>
                                                <p className="text-[9px] text-gray-400 mt-1 font-mono">
                                                    {new Date(order.createdAt).toLocaleDateString('en-GB')}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                            {order.orderItems.map((item, index) => (
                                                <div key={index} className="relative group/item shrink-0">
                                                    <img 
                                                        src={item.image} 
                                                        className="w-14 h-14 rounded-xl object-cover border border-gray-50 bg-gray-50" 
                                                        alt={item.name} 
                                                    />
                                                    <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">
                                                        {item.qty}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-gray-400">
                                                <MapPin size={12} />
                                                <span className="text-[10px] uppercase tracking-wide">{order.customerInfo.city}</span>
                                            </div>
                                            <p className="font-mono text-lg font-black text-gray-900 tracking-tighter">
                                                ${order.totalPrice.toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;