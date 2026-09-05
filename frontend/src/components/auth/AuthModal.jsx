import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { X, Lock, Mail, User, ShoppingBag, Sparkles, ShieldCheck } from "lucide-react";
import { useApp } from "../../context/AppContext";
export const AuthModal = () => {
    const { isAuthOpen, setIsAuthOpen, authMode, setAuthMode, login, register } = useApp();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    if (!isAuthOpen)
        return null;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (authMode === "login") {
            await login(email, password);
        }
        else {
            await register(name, email, password);
        }
        setLoading(false);
    };
    const handleDemoUserLogin = () => {
        login("kondelarakesh12@gmail.com", "password123");
    };
    const handleDemoAdminLogin = () => {
        login("admin@shopai.store", "admin123");
    };
    return (_jsxs("div", { className: "fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6", children: [_jsx("div", { onClick: () => setIsAuthOpen(false), className: "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" }), _jsxs("div", { className: "relative w-full max-w-md bg-white dark:bg-[#151728] rounded-[28px] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-10 animate-in zoom-in-95 duration-150 p-6 sm:p-8", children: [_jsx("button", { onClick: () => setIsAuthOpen(false), className: "absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full", children: _jsx(X, { className: "w-5 h-5" }) }), _jsxs("div", { className: "text-center space-y-2 mb-6", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-[#4F6EF7] via-[#8B5CF6] to-[#EC4899] text-white flex items-center justify-center mx-auto shadow-md", children: _jsx(ShoppingBag, { className: "w-6 h-6" }) }), _jsx("h3", { className: "text-2xl font-extrabold text-gray-900 dark:text-white", children: authMode === "login" ? "Welcome Back" : "Join ShopMe" }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: authMode === "login"
                                    ? "Sign in to access personalized AI picks & orders"
                                    : "Experience personalized AI-driven shopping" })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [authMode === "register" && (_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx(User, { className: "w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" }), _jsx("input", { type: "text", value: name, onChange: e => setName(e.target.value), placeholder: "Rakesh Kondela", required: true, className: "w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-[#1E2034] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" }), _jsx("input", { type: "email", value: email, onChange: e => setEmail(e.target.value), placeholder: "name@example.com", required: true, className: "w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-[#1E2034] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" }), _jsx("input", { type: "password", value: password, onChange: e => setPassword(e.target.value), placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", required: true, className: "w-full pl-9 pr-3 py-2.5 bg-gray-50 dark:bg-[#1E2034] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full py-3 bg-[#111827] dark:bg-white text-white dark:text-[#111827] rounded-xl font-bold text-xs hover:bg-black dark:hover:bg-gray-100 transition-colors shadow-md disabled:opacity-50", children: loading ? "Please wait..." : authMode === "login" ? "Sign In" : "Create Account" })] }), _jsxs("div", { className: "pt-5 border-t border-gray-100 dark:border-gray-800 mt-5 space-y-2", children: [_jsx("p", { className: "text-[11px] font-bold text-gray-400 uppercase tracking-wider text-center", children: "One-Click Demo Logins" }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("button", { onClick: handleDemoUserLogin, className: "px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 text-[#4F6EF7] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors", children: [_jsx(Sparkles, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Demo Customer" })] }), _jsxs("button", { onClick: handleDemoAdminLogin, className: "px-3 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors", children: [_jsx(ShieldCheck, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Demo Admin" })] })] })] }), _jsx("div", { className: "text-center pt-4 text-xs text-gray-500", children: authMode === "login" ? (_jsxs("p", { children: ["Don't have an account?", " ", _jsx("button", { onClick: () => setAuthMode("register"), className: "text-[#4F6EF7] font-bold hover:underline", children: "Sign up" })] })) : (_jsxs("p", { children: ["Already have an account?", " ", _jsx("button", { onClick: () => setAuthMode("login"), className: "text-[#4F6EF7] font-bold hover:underline", children: "Sign in" })] })) })] })] }));
};
