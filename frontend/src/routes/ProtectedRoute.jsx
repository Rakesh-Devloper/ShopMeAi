import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
export const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user } = useApp();
    const location = useLocation();
    if (!user) {
        // Redirect to login page preserving previous path
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    }
    if (adminOnly && user.role !== "admin") {
        // Redirect non-admins to home or dashboard
        return _jsx(Navigate, { to: "/dashboard", replace: true });
    }
    return _jsx(_Fragment, { children: children });
};
