import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShoppingBag, Truck, CheckCircle2, Leaf, Clock, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        const res = await login(email, password);
        
        if (res.success) {
            navigate(from, { replace: true });
        } else {
            setError(res.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50 flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 -left-40 w-96 h-96 bg-emerald-300 opacity-20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2]
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 -right-40 w-96 h-96 bg-green-300 opacity-20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.2, 0.3]
                    }}
                    transition={{ duration: 8, repeat: Infinity, delay: 1 }}
                />
                
                {/* Floating Icons */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-emerald-200"
                        initial={{ 
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0
                        }}
                        animate={{
                            y: [null, -50, null],
                            opacity: [0, 0.3, 0]
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    >
                        {i % 3 === 0 ? <ShoppingBag size={20} /> : i % 3 === 1 ? <Leaf size={20} /> : <Package size={20} />}
                    </motion.div>
                ))}
            </div>

            <div className="relative w-full max-w-6xl flex items-center justify-center gap-12 lg:gap-20">
                
                {/* Left Side - Branding (Hidden on Mobile) */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="hidden lg:flex flex-col space-y-8 flex-1 max-w-xl"
                >
                    {/* Logo/Brand */}
                    <div className="space-y-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl shadow-lg shadow-emerald-500/30"
                        >
                            <Leaf size={24} className="text-white" />
                            <span className="text-white font-black text-xl tracking-tight">REAL ORGANIC</span>
                        </motion.div>
                        
                        <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                            Fresh Groceries
                            <span className="block bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                In Minutes
                            </span>
                        </h1>
                        
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Get farm-fresh organic groceries delivered to your doorstep in minutes.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        {[
                            { icon: <Clock size={20} />, text: "Delivery in 10 Minutes" },
                            { icon: <Leaf size={20} />, text: "100% Fresh & Organic" },
                            { icon: <Truck size={20} />, text: "Free Delivery on Orders ₹199+" }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="flex items-center gap-3 text-gray-700"
                            >
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    {feature.icon}
                                </div>
                                <span className="font-semibold">{feature.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-8 pt-4">
                        {[
                            { value: "50K+", label: "Happy Customers" },
                            { value: "5000+", label: "Products" },
                            { value: "10 Min", label: "Avg Delivery" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.7 + i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Right Side - Login Form */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <div className="relative">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-[2rem] blur-2xl opacity-20" />
                        
                        {/* Main Card */}
                        <div className="relative bg-white rounded-[2rem] shadow-2xl shadow-emerald-500/10 p-10 sm:p-12 space-y-8">
                            
                            {/* Header */}
                            <div className="text-center space-y-3">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/30 mb-2"
                                >
                                    <ShoppingBag size={32} className="text-white" />
                                </motion.div>
                                
                                <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                                    Welcome Back
                                </h2>
                                <p className="text-gray-600 font-medium">
                                    Sign in to start shopping fresh
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-50 border border-red-200 text-red-600 px-5 py-4 rounded-2xl text-sm font-semibold flex items-center gap-3"
                                >
                                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                                    {error}
                                </motion.div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-900 ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <Mail size={20} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            className="w-full pl-14 pr-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400 bg-gray-50 focus:bg-white"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-bold text-gray-900 ml-1">
                                        Password
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                            <Lock size={20} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            className="w-full pl-14 pr-14 py-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400 bg-gray-50 focus:bg-white"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-emerald-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember & Forgot */}
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input 
                                            type="checkbox" 
                                            className="w-5 h-5 rounded-lg border-2 border-gray-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer"
                                        />
                                        <span className="font-medium text-gray-700 group-hover:text-gray-900">
                                            Remember me
                                        </span>
                                    </label>
                                    <Link 
                                        to="/forgot-password" 
                                        className="font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="relative w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {/* Shimmer Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        animate={{ x: ["-200%", "200%"] }}
                                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                    />
                                    
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {isLoading ? (
                                            <>
                                                <motion.div
                                                    className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full"
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                />
                                                Signing In...
                                            </>
                                        ) : (
                                            <>
                                                Sign In
                                                <motion.div
                                                    animate={{ x: [0, 4, 0] }}
                                                    transition={{ duration: 1.5, repeat: Infinity }}
                                                >
                                                    <ArrowRight size={20} />
                                                </motion.div>
                                            </>
                                        )}
                                    </span>
                                </motion.button>
                            </form>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t-2 border-gray-100" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500 font-semibold">
                                        New to Real Organic?
                                    </span>
                                </div>
                            </div>

                            {/* Sign Up Link */}
                            <Link to="/register">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-emerald-300 text-gray-900 font-bold text-base rounded-2xl transition-all"
                                >
                                    Create Account
                                </motion.button>
                            </Link>

                            {/* Trust Badge */}
                            <div className="pt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
                                <CheckCircle2 size={16} className="text-emerald-600" />
                                <span className="font-medium">
                                    Safe & secure payments
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Mobile Logo - Shown only on small screens */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:hidden absolute top-8 left-1/2 -translate-x-1/2"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl shadow-lg shadow-emerald-500/30">
                    <Leaf size={20} className="text-white" />
                    <span className="text-white font-black text-lg tracking-tight">REAL ORGANIC</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;