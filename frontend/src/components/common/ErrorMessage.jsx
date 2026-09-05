import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./Button";
export const ErrorMessage = ({ message, onRetry, className = "", }) => {
    return (_jsxs("div", { className: `p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-red-700 dark:text-red-400 ${className}`, children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(AlertCircle, { className: "w-5 h-5 shrink-0 text-red-500" }), _jsx("p", { className: "text-sm font-medium", children: message })] }), onRetry && (_jsx(Button, { size: "sm", variant: "outline", onClick: onRetry, leftIcon: _jsx(RefreshCw, { className: "w-3.5 h-3.5" }), className: "border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40", children: "Try Again" }))] }));
};
