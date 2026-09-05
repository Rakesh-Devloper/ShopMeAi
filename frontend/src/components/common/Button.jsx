import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Loader2 } from "lucide-react";
export const Button = ({ children, variant = "primary", size = "md", isLoading = false, leftIcon, rightIcon, className = "", disabled, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl";
    const sizeStyles = {
        sm: "px-3 py-1.5 text-xs gap-1.5",
        md: "px-4 py-2.5 text-sm gap-2",
        lg: "px-6 py-3.5 text-base gap-2.5",
    };
    const variantStyles = {
        primary: "bg-[#4F6EF7] hover:bg-[#3d5ce5] text-white shadow-md shadow-indigo-500/20 active:scale-[0.98]",
        secondary: "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200",
        outline: "border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
        ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 active:scale-[0.98]",
    };
    return (_jsxs("button", { disabled: disabled || isLoading, className: `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`, ...props, children: [isLoading ? (_jsx(Loader2, { className: "w-4 h-4 animate-spin text-current" })) : (leftIcon), _jsx("span", { children: children }), !isLoading && rightIcon] }));
};
