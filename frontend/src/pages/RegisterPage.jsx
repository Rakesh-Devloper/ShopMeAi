import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, user } = useApp();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    React.useEffect(() => {
        if (user) {
            navigate("/dashboard", { replace: true });
        }
    }, [user]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }
        setLoading(true);
        try {
            const success = await register(name, email, password);
            if (success) {
                navigate("/dashboard", { replace: true });
            }
            else {
                setError("Registration failed. Please check your details or try another email.");
            }
        }
        catch {
            setError("An unexpected error occurred. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("div", { className: "min-h-[80vh] flex items-center justify-center px-4 py-12", children: _jsxs("div", { className: "w-full max-w-md space-y-8 bg-white dark:bg-[#151824] p-8 sm:p-10 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl", children: [_jsxs("div", { className: "text-center space-y-2", children: [_jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#4F6EF7] text-xs font-bold", children: [_jsx(Sparkles, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Join ShopMe" })] }), _jsx("h2", { className: "text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight", children: "Create Account" }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Get personalized smart recommendations & exclusive member deals" })] }), error && (_jsx("div", { className: "p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium", children: error })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx(UserIcon, { className: "w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" }), _jsx("input", { type: "text", required: true, value: name, onChange: e => setName(e.target.value), placeholder: "Rakesh Kondela", className: "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" }), _jsx("input", { type: "email", required: true, value: email, onChange: e => setEmail(e.target.value), placeholder: "name@example.com", className: "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" }), _jsx("input", { type: "password", required: true, value: password, onChange: e => setPassword(e.target.value), placeholder: "At least 6 characters", className: "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" }), _jsx("input", { type: "password", required: true, value: confirmPassword, onChange: e => setConfirmPassword(e.target.value), placeholder: "Confirm password", className: "w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] })] }), _jsx("button", { type: "submit", disabled: loading, className: "w-full py-3.5 px-6 rounded-2xl bg-[#4F6EF7] hover:bg-indigo-600 disabled:opacity-50 text-white font-bold text-xs sm:text-sm shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer", children: loading ? (_jsx("div", { className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: "Create Account" }), _jsx(ArrowRight, { className: "w-4 h-4" })] })) })] }), _jsxs("div", { className: "text-center text-xs text-gray-500 dark:text-gray-400", children: ["Already have an account?", " ", _jsx(Link, { to: "/login", className: "font-bold text-[#4F6EF7] hover:underline", children: "Sign In" })] }), _jsxs("div", { className: "flex items-center justify-center gap-2 text-[11px] text-gray-400", children: [_jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-500" }), _jsx("span", { children: "Encrypted with SHA-256 JWT Security" })] })] }) }));
};
