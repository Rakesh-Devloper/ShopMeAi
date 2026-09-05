import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../common/Button";
import { ErrorMessage } from "../common/ErrorMessage";
export const LoginForm = ({ onSuccess, redirectTo = "/" }) => {
    const navigate = useNavigate();
    const { login } = useApp();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const success = await login(email, password);
            if (success) {
                if (onSuccess)
                    onSuccess();
                navigate(redirectTo);
            }
            else {
                setError("Invalid credentials. Please try again.");
            }
        }
        catch (err) {
            setError(err.message || "Failed to sign in. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    const handleDemoFill = (demoEmail) => {
        setEmail(demoEmail);
        setPassword("password123");
        setError(null);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 w-full", children: [error && _jsx(ErrorMessage, { message: error }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7] transition-all" })] })] }), _jsxs("div", { children: [_jsx("div", { className: "flex items-center justify-between mb-1.5", children: _jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300", children: "Password" }) }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: showPassword ? "text" : "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "w-full pl-11 pr-11 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7] transition-all" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200", children: showPassword ? _jsx(EyeOff, { className: "w-4 h-4" }) : _jsx(Eye, { className: "w-4 h-4" }) })] })] }), _jsx(Button, { type: "submit", isLoading: loading, className: "w-full py-3.5 mt-2", size: "lg", children: "Sign In" }), _jsxs("div", { className: "pt-2 border-t border-gray-100 dark:border-gray-800", children: [_jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400 text-center mb-2 font-medium", children: "Quick Demo Login" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsx("button", { type: "button", onClick: () => handleDemoFill("alex@shopai.com"), className: "px-3 py-2 text-xs font-medium rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors", children: "Customer (Alex)" }), _jsx("button", { type: "button", onClick: () => handleDemoFill("admin@shopai.com"), className: "px-3 py-2 text-xs font-medium rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 transition-colors", children: "Admin (Store)" })] })] })] }));
};
