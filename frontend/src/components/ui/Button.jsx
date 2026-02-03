import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/30 focus:ring-emerald-500",
        secondary: "bg-amber-100 text-amber-900 hover:bg-amber-200 focus:ring-amber-500",
        outline: "border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-500",
        ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
