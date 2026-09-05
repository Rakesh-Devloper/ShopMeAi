import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { Loader2 } from "lucide-react";
export const Loader = ({ message = "Loading...", size = "md", className = "", }) => {
    const sizeClasses = {
        sm: "w-5 h-5",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    };
    return (_jsxs("div", { className: `flex flex-col items-center justify-center p-8 gap-3 text-center ${className}`, children: [_jsx(Loader2, { className: `${sizeClasses[size]} animate-spin text-[#4F6EF7]` }), message && (_jsx("p", { className: "text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse", children: message }))] }));
};
