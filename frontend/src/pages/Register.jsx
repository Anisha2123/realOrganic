import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Smartphone, ArrowRight, Loader2, Mail, Lock, User, Phone, Eye, EyeOff, Sparkles, Zap, Clock, CheckCircle2, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Register = () => {
    const [step, setStep] = useState(1); // 1: Details, 2: OTP
    const [formData, setFormData] = useState({ 
        name: '', 
        // email: '', 
        phone: '', 
        password: '', 
        confirmPassword: '' 
    });
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmationResult, setConfirmationResult] = useState(null);
    const { sendOtp, verifyOtpAndRegister } = useAuth();
    const navigate = useNavigate();
     const [timer, setTimer] = useState(0);

     useEffect(() => {
  if (timer > 0) {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }
}, [timer]);

    const handleSendOtp = async (e) => {
  e.preventDefault();
  setError("");

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    await axios.post("/auth/send-email-otp", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });

    setStep(2);
    setTimer(60); // 🔥 start resend timer

  } catch (err) {
    setError(err.response?.data?.message || "Failed to send OTP");
  }

  setLoading(false);
};

    const handleVerify = async (e) => {
  e.preventDefault();
  setError("");

  const otpCode = otp.join("");

  if (otpCode.length !== 6) {
    setError("Please enter a valid 6-digit OTP");
    return;
  }

  setLoading(true);

  try {
    const { data } = await axios.post("/auth/verify-email-otp", {
      email: formData.email,
      otp: otpCode,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
    navigate("/profile");

  } catch (err) {
    setError(err.response?.data?.message || "Invalid OTP");
  }

  setLoading(false);
};
const handleResendOtp = async () => {
  if (timer > 0) return;

  try {
    await axios.post("/auth/send-email-otp", formData);
    setTimer(60);
  } catch (err) {
    setError(err.response?.data?.message || "Failed to resend OTP");
  }
};

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return;
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus();
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
                
                {/* Floating Icons - Grocery Theme */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-emerald-200"
                        initial={{ 
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
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
                        {i % 3 === 0 ? <Package size={20} /> : i % 3 === 1 ? <Zap size={20} /> : <Clock size={20} />}
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
                            <Sparkles size={24} className="text-white" />
                            <span className="text-white font-black text-xl tracking-tight">FreshCart</span>
                        </motion.div>
                        
                        <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
                            Fresh Groceries
                            <span className="block bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                                In Minutes
                            </span>
                        </h1>
                        
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Get fresh fruits, vegetables, and daily essentials delivered to your doorstep in 10 minutes or less.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                        {[
                            { icon: <Clock size={20} />, text: "10-Minute Delivery", color: "from-blue-500 to-cyan-500" },
                            { icon: <Package size={20} />, text: "Farm-Fresh Products", color: "from-emerald-500 to-green-500" },
                            { icon: <CheckCircle2 size={20} />, text: "Quality Guaranteed", color: "from-purple-500 to-pink-500" }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                                className="flex items-center gap-4 group"
                            >
                                <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-[2px]`}>
                                    <div className="w-full h-full rounded-xl bg-white flex items-center justify-center text-emerald-600 group-hover:bg-transparent group-hover:text-white transition-all">
                                        {feature.icon}
                                    </div>
                                </div>
                                <span className="font-bold text-gray-700">{feature.text}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-8 pt-4">
                        {[
                            { value: "50+", label: "Happy Users" },
                            { value: "500+", label: "Products" },
                            { value: "20min", label: "Avg Delivery" }
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

                    {/* Trust Badge */}
                    <div className="flex items-center gap-3 px-6 py-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                        <ShieldCheck size={24} className="text-emerald-600 flex-shrink-0" />
                        <p className="text-sm text-gray-700 font-medium">
                            <strong className="text-emerald-600">100% Safe & Secure</strong> • Your data is encrypted and protected
                        </p>
                    </div>
                </motion.div>

                {/* Right Side - Register Form */}
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
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg shadow-emerald-500/30 mb-2"
                                >
                                    {step === 1 ? <User size={32} className="text-white" /> : <Smartphone size={32} className="text-white" />}
                                </motion.div>
                                
                                <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
                                    {step === 1 ? 'Join FreshCart' : 'Verify Email'}
                                </h2>
                                <p className="text-gray-600 font-medium">
                                    {step === 1 ? 'Start getting fresh groceries delivered' : `OTP sent to ${formData.email}`}
                                </p>
                            </div>

                            {/* Error Message */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="bg-red-50 border-2 border-red-200 text-red-600 px-5 py-4 rounded-2xl text-sm font-bold flex items-center gap-3"
                                    >
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                        {error}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Step 1: Registration Form */}
                            <AnimatePresence mode="wait">
                                {step === 1 ? (
                                    <motion.form
                                        key="step1"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        onSubmit={handleSendOtp}
                                        className="space-y-5"
                                    >
                                        {/* Name Input */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-900 ml-1">
                                                Full Name
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                                    <User size={20} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                                </div>
                                                <input
                                                    type="text"
                                                    required
                                                    className="w-full pl-14 pr-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400 bg-gray-50 focus:bg-white"
                                                    placeholder="John Doe"
                                                    value={formData.name}
                                                    onChange={e => setFormData({...formData, name: e.target.value})}
                                                />
                                            </div>
                                        </div>

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
                                                    value={formData.email}
                                                    onChange={e => setFormData({...formData, email: e.target.value})}
                                                />
                                            </div>
                                        </div>

                                        {/* Phone Input */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-900 ml-1">
                                                Phone Number
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                                    <Phone size={20} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                                </div>
                                                <input
                                                    type="tel"
                                                    maxLength={10}
                                                    pattern='[6-9]{1}[0-9]{9}'
                                                    required
                                                    className="w-full pl-14 pr-5 py-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400 bg-gray-50 focus:bg-white"
                                                    placeholder="Enter 10-digit mobile number"
                                                    value={formData.phone}
                                                    onChange={e => setFormData({...formData, phone: e.target.value})}
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
                                                    value={formData.password}
                                                    onChange={e => setFormData({...formData, password: e.target.value})}
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

                                        {/* Confirm Password Input */}
                                        <div className="space-y-2">
                                            <label className="block text-sm font-bold text-gray-900 ml-1">
                                                Confirm Password
                                            </label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                                    <Lock size={20} className="text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
                                                </div>
                                                <input
                                                    type={showConfirmPassword ? "text" : "password"}
                                                    required
                                                    className="w-full pl-14 pr-14 py-4 rounded-2xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all text-gray-900 font-medium placeholder:text-gray-400 bg-gray-50 focus:bg-white"
                                                    placeholder="••••••••"
                                                    value={formData.confirmPassword}
                                                    onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                    className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-emerald-600 transition-colors"
                                                >
                                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="relative w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                                        >
                                            {/* Shimmer Effect */}
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                animate={{ x: loading ? 0 : ["-200%", "200%"] }}
                                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                            />
                                            
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="animate-spin" size={20} />
                                                        Sending OTP...
                                                    </>
                                                ) : (
                                                    <>
                                                        Get OTP
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
                                    </motion.form>
                                ) : (
                                    /* Step 2: OTP Verification */
                                    <motion.form
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        onSubmit={handleVerify}
                                        className="space-y-8"
                                    >
                                       {/* OTP Input Boxes */}
<div>
  <label className="block text-sm sm:text-base font-bold text-gray-900 text-center mb-3 sm:mb-4">
    Enter 6-Digit Code
  </label>

  <div className="flex justify-center gap-2 sm:gap-3 px-2">
    {otp.map((digit, index) => (
      <input
        key={index}
        id={`otp-${index}`}
        type="text"
        maxLength="1"
        className="
          w-10 h-12
          xs:w-11 xs:h-14
          sm:w-12 sm:h-14
          md:w-14 md:h-16
          text-lg sm:text-xl md:text-2xl
          font-black
          text-center
          border-2 border-gray-200
          rounded-xl sm:rounded-2xl
          bg-gray-50
          text-emerald-600
          outline-none
          transition-all
          focus:border-emerald-500
          focus:ring-2 sm:focus:ring-4
          focus:ring-emerald-500/10
          focus:bg-white
        "
        value={digit}
        onChange={(e) => handleOtpChange(index, e.target.value)}
        onKeyDown={(e) => handleOtpKeyDown(index, e)}
      />
    ))}
  </div>
</div>

                                        {/* Verify Button */}
                                        <motion.button
                                            type="submit"
                                            disabled={loading}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="relative w-full py-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-base rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                animate={{ x: loading ? 0 : ["-200%", "200%"] }}
                                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                                            />
                                            
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="animate-spin" size={20} />
                                                        Verifying...
                                                    </>
                                                ) : (
                                                    <>
                                                        <CheckCircle2 size={20} />
                                                        Verify & Register
                                                    </>
                                                )}
                                            </span>
                                        </motion.button>

                                        {/* Back Button */}
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="w-full text-sm font-bold text-gray-500 hover:text-emerald-600 transition-colors"
                                        >
                                            ← Edit Email
                                        </button>
                                    </motion.form>
                                )}
                            </AnimatePresence>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t-2 border-gray-100" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500 font-semibold">
                                        Already a member?
                                    </span>
                                </div>
                            </div>

                            {/* Sign In Link */}
                            <Link to="/login">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-gray-50 hover:bg-gray-100 border-2 border-gray-200 hover:border-emerald-300 text-gray-900 font-bold text-base rounded-2xl transition-all"
                                >
                                    Sign In Instead
                                </motion.button>
                            </Link>

                            {/* Trust Badge */}
                            <div className="pt-2 flex items-center justify-center gap-2 text-sm text-gray-500">
                                <ShieldCheck size={16} className="text-emerald-600" />
                                <span className="font-medium">
                                    Your data is safe & encrypted
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Mobile Logo */}
<motion.div
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="lg:hidden absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20"
>
  <div className="
      inline-flex items-center gap-2
      px-3 sm:px-4
      py-1.5 sm:py-2
      bg-gradient-to-r from-emerald-500 to-green-500
      rounded-lg sm:rounded-xl
      shadow-md sm:shadow-lg shadow-emerald-500/30
    "
  >
    <Sparkles
      size={18}
      className="text-white sm:w-5 sm:h-5"
    />
    <span className="text-white font-black text-base sm:text-lg tracking-tight">
      FreshCart
    </span>
  </div>
</motion.div>
        </div>
    );
};

export default Register;