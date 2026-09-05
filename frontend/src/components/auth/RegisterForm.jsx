import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User as UserIcon, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { Button } from "../common/Button";
import { ErrorMessage } from "../common/ErrorMessage";
export const RegisterForm = ({ onSuccess, redirectTo = "/" }) => {
    const navigate = useNavigate();
    const { register } = useApp();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        setLoading(true);
        try {
            const success = await register(name, email, password);
            if (success) {
                if (onSuccess)
                    onSuccess();
                navigate(redirectTo);
            }
            else {
                setError("Registration failed. Please check your details.");
            }
        }
        catch (err) {
            setError(err.message || "Failed to create account. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 w-full", children: [error && _jsx(ErrorMessage, { message: error }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5", children: "Full Name" }), _jsxs("div", { className: "relative", children: [_jsx(UserIcon, { className: "w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "text", required: true, value: name, onChange: (e) => setName(e.target.value), placeholder: "John Doe", className: "w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7] transition-all" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5", children: "Email Address" }), _jsxs("div", { className: "relative", children: [_jsx(Mail, { className: "w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7] transition-all" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5", children: "Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: showPassword ? "text" : "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "At least 6 characters", className: "w-full pl-11 pr-11 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7] transition-all" }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200", children: showPassword ? _jsx(EyeOff, { className: "w-4 h-4" }) : _jsx(Eye, { className: "w-4 h-4" }) })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-1.5", children: "Confirm Password" }), _jsxs("div", { className: "relative", children: [_jsx(Lock, { className: "w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" }), _jsx("input", { type: showPassword ? "text" : "password", required: true, value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), placeholder: "Repeat password", className: "w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-[#4F6EF7] transition-all" })] })] }), _jsx(Button, { type: "submit", isLoading: loading, className: "w-full py-3.5 mt-2", size: "lg", children: "Create Account" })] }));
};
