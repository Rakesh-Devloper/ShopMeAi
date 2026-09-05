import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Lock, Mail, Eye, EyeOff, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
export const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, user } = useApp();
    const [email, setEmail] = useState("kondelarakesh12@gmail.com");
    const [password, setPassword] = useState("password123");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // If already logged in, redirect
    React.useEffect(() => {
        if (user) {
            const from = location.state?.from?.pathname || "/dashboard";
            navigate(from, { replace: true });
        }
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const success = await login(email, password);
            if (success) {
                const from = location.state?.from?.pathname || "/dashboard";
                navigate(from, { replace: true });
            }
            else {
                setError("Invalid email or password. Please try again.");
            }
        }
        catch {
            setError("An unexpected error occurred. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    const handleQuickDemoLogin = async (role) => {
        if (role === "admin") {
            setEmail("kondelarakesh12@gmail.com");
            setPassword("password123");
            setLoading(true);
            await login("kondelarakesh12@gmail.com", "password123");
            setLoading(false);
        }
        else {
            setEmail("customer@shopai.com");
            setPassword("password123");
            setLoading(true);
            await login("customer@shopai.com", "password123");
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-[80vh] flex items-center justify-center px-4 py-12", children: _jsxs("div", { className: "w-full max-w-md space-y-8 bg-white dark:bg-[#151824] p-8 sm:p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#4F6EF7] text-xs font-bold", children: [_jsx(Sparkles, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "ShopMe Member Access" })] }), _jsx("h2", { className: "text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight", children: "Welcome Back" }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Sign in to manage your orders, wishlist, and recommendations" })] }), error && (_jsx("div", { className: "p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" }), _jsx("input", { type: "email", required: true, value: email, onChange: e => setEmail(e.target.value), placeholder: "name@example.com", className: "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300", children: "Password" }), _jsx("button", { type: "button", className: "text-[11px] font-semibold text-[#4F6EF7] hover:underline", children: "Forgot password?" })] }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" }), _jsx("input", { type: showPassword ? "text" : "password", required: true, value: password, onChange: e => setPassword(e.target.value), placeholder: "Enter password", className: "w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200", children: showPassword ? _jsx(EyeOff, { className: "w-4 h-4" }) : _jsx(Eye, { className: "w-4 h-4" }) })] })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full py-3.5 px-6 rounded-2xl bg-[#4F6EF7] hover:bg-indigo-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer", children: loading ? (_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: "Sign In" }), _jsx(ArrowRight, { className: "w-4 h-4" })] })) })] }), _jsxs("div", { className: "pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2 text-center", children: [_jsx("span", { className: "text-[11px] text-gray-400 font-medium", children: "Quick 1-Click Demo Logins:" }), _jsxs("div", { className: "flex gap-2 justify-center", children: [_jsx("button", { type: "button", onClick: () => handleQuickDemoLogin("admin"), className: "px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-[#4F6EF7] text-xs font-bold hover:bg-indigo-100 transition-colors", children: "Demo Admin (Rakesh)" }), _jsx("button", { type: "button", onClick: () => handleQuickDemoLogin("customer"), className: "px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-200 transition-colors", children: "Demo Customer" })] })] }), _jsxs("div", { className: "text-center text-xs text-gray-500 dark:text-gray-400", children: ["Don't have an account?", " ", _jsx(Link, { to: "/register", className: "font-bold text-[#4F6EF7] hover:underline", children: "Create an account" })] }), _jsxs("div", { className: "flex items-center justify-center gap-2 text-[11px] text-gray-400", children: [_jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-500" }), _jsx("span", { children: "Secure JWT Authentication" })] })] }) }));
};
