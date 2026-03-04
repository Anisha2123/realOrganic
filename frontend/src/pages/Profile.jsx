import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import { Package, MapPin, Loader2, ChevronRight, LogOut, ShoppingBag, Clock } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.token) return;
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                const { data } = await axios.get('/orders/myorders', config);
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders", error);
                if (error.response?.status === 401) logout();
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [user, logout]);

    if (!user) {
    return <Navigate to="/login" replace />;
}

    return (
        <div className="min-h-screen bg-gray-50/50 pt-28 pb-24">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Premium Header Card with Glassmorphism/Gradient */}
                {/* Premium Header Card - Fully Responsive */}
<div className="relative overflow-hidden bg-white rounded-3xl p-5 sm:p-8 mb-8 sm:mb-10 shadow-xl shadow-slate-200/40 border border-slate-100 group">
    
    {/* Background Glow */}
    <div className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-40 sm:opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>

    <div className="relative flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8 z-10">
        
        {/* Avatar */}
        <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-black text-white shadow-2xl shadow-emerald-500/20 ring-4 ring-white">
                {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-sm">
                <div className="bg-emerald-500 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white"></div>
            </div>
        </div>

        {/* User Info */}
        <div className="flex-1 text-center lg:text-left space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight break-words">
                {user.name}
            </h1>
            <p className="text-sm sm:text-base text-slate-500 font-medium break-all">
                {user.email}
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 pt-2">
                <span className="bg-slate-100 text-slate-600 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                    {user.role || 'Member'}
                </span>

                <span className="bg-emerald-50 text-emerald-700 px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider border border-emerald-100">
                    Verified
                </span>
            </div>
        </div>

        {/* Logout Button */}
        <button
            onClick={logout}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-50 text-slate-600 hover:bg-rose-50 hover:text-rose-600 font-bold text-sm rounded-2xl transition-all duration-300 border border-slate-200 hover:border-rose-100 group/btn"
        >
            <LogOut size={18} className="group-hover/btn:scale-110 transition-transform" />
            Logout
        </button>

    </div>
</div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    

                    {/* Right Column: Order Feed */}
                     <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6 px-2">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <div className="bg-emerald-100 p-2 rounded-lg text-emerald-600">
                                    <ShoppingBag size={20} />
                                </div>
                                Past Orders
                            </h2>
                            <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                                {orders.length} Orders
                            </span>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-slate-100 shadow-sm">
                                <Loader2 className="animate-spin text-emerald-500 mb-4" size={40} />
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Syncing your history...</p>
                            </div>
                        ) : orders.length === 0 ? (
                            <div className="bg-white p-16 rounded-[2rem] border border-slate-100 text-center shadow-sm">
                                <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                                    <Package size={40} className="text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">No orders yet</h3>
                                <p className="text-slate-500 text-sm font-medium mb-8 max-w-xs mx-auto">Your order history will appear here once you start shopping with us.</p>
                                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-emerald-200 active:scale-95 transition-all">
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order._id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/20 hover:shadow-xl hover:shadow-slate-200/40 hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden">
                                        {/* Status Line */}
                                        <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`flex h-2.5 w-2.5 rounded-full  ${order.isPaid ? 'bg-emerald-500 shadow-md shadow-emerald-500/30' : 'bg-amber-500'}`}></span>
                                                    <span className={`text-[11px] font-black uppercase tracking-widest ${order.isPaid ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                        {order.isPaid ? 'Delivered' : 'Pending'}
                                                    </span>
                                                </div>
                                                <h4 className="font-bold text-slate-900 text-sm tracking-tight">
                                                    Order <span className="font-mono text-slate-400">#</span>{order._id.substring(order._id.length - 6).toUpperCase()}
                                                </h4>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xl font-black text-slate-900 tracking-tight">Rs {order.totalPrice.toFixed(2)}</p>
                                                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold justify-end mt-1">
                                                    <Clock size={12} />
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Items Strip */}
                                        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 mask-linear">
                                            {order.orderItems.map((item, idx) => (
                                                <div key={idx} className="relative flex-shrink-0 group/item">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-14 h-14 rounded-2xl object-cover bg-slate-50 border border-slate-100 group-hover/item:scale-105 transition-transform duration-300"
                                                    />
                                                    <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                                        {item.qty}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-slate-400 bg-slate-50 px-3 py-1.5 rounded-lg">
                                                <MapPin size={14} className="text-emerald-500" />
                                                <span className="text-[11px] font-bold uppercase truncate max-w-[150px]">
                                                    {order.customerInfo?.city || "Delivered"}
                                                </span>
                                            </div>
                                            <button className="text-emerald-600 font-bold text-xs hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-xl transition-colors">
                                                View Receipt
                                            </button>
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