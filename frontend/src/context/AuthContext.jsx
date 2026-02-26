import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Your firebase config file 
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            setUser(userInfo);
            // Optional: Verify token with backend here
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await axios.post('/api/auth/login', { email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Login failed'
            };
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await axios.post('/api/auth/register', { name, email, password });
            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
            return { success: true };
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || 'Registration failed'
            };
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
        navigate('/');
    };

    const updateUser = (userData) => {
        // Merge existing user data with new updates (e.g. address)
        const updatedUser = { ...user, ...userData };
        setUser(updatedUser);
        localStorage.setItem('userInfo', JSON.stringify(updatedUser));
    };

    // Inside your AuthProvider in AuthContext.js

const registerWithOtp = async (formData, otpResult) => {
    try {
        // 1. First, call the 'check-user' API to ensure no duplicates
        // This avoids sending OTPs to existing users
        await axios.post('/api/users/check-user', { 
            email: formData.email, 
            phone: formData.phone 
        });

        // 2. Verification is handled by Firebase on the frontend.
        // Once verified, we call the final register API
        const { data } = await axios.post('/api/auth/register', {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone
        });

        // 3. Update global user state
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
        return { success: true };
    } catch (error) {
        return { 
            success: false, 
            message: error.response?.data?.message || "Registration failed" 
        };
    }
};

// ... login, register, logout, updateUser functions ...

    const sendOtp = async (phoneNumber) => {
  try {
    // If recaptcha already exists, reuse it
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            console.log("reCAPTCHA solved");
          },
        }
      );

      await window.recaptchaVerifier.render();
    }

    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      window.recaptchaVerifier
    );

    window.confirmationResult = confirmationResult;

    return { success: true };
  } catch (error) {
    console.error("Firebase SMS Error:", error);
    return {
      success: false,
      message: "Invalid Phone Number or SMS quota exceeded",
    };
  }
};

    const verifyOtpAndRegister = async (formData, otp) => {
        try {
            const result = await window.confirmationResult.confirm(otp);
            
            const { name, email, password, phone } = formData;
            const { data } = await axios.post('/api/users/register', { 
                name, email, password, phone, firebaseUid: result.user.uid 
            });

            setUser(data);
            localStorage.setItem('userInfo', JSON.stringify(data));
            return { success: true };
        } catch (error) {
            return { success: false, message: "Invalid OTP. Please try again." };
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            login, 
            register, 
            logout, 
            loading, 
            updateUser,
            sendOtp,               // --- ADD TO VALUE ---
            verifyOtpAndRegister   // --- ADD TO VALUE ---
        }}>
            {children}
        </AuthContext.Provider>
    );
};
