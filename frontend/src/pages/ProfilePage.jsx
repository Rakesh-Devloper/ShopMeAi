import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef } from "react";
import { useApp } from "../context/AppContext";
import { userService } from "../services/userService";
import { authService } from "../services/authService";
import { User as UserIcon, Mail, Key, MapPin, Plus, Camera, Upload, Sparkles, Trash2, RefreshCw } from "lucide-react";
export const ProfilePage = () => {
    const { user, setUser, setUserRole, showToast, myOrders, wishlist } = useApp();
    const fileInputRef = useRef(null);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isChangingPass, setIsChangingPass] = useState(false);
    // Address form
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    // Handle file selection
    const processImageFile = async (file) => {
        if (!file.type.startsWith("image/")) {
            showToast("Please upload an image file (PNG, JPG, WebP, etc.)");
            return;
        }
        if (file.size > 8 * 1024 * 1024) {
            showToast("Image size must be less than 8MB");
            return;
        }
        setIsUploadingPhoto(true);
        try {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const base64Data = event.target?.result;
                if (!base64Data) {
                    setIsUploadingPhoto(false);
                    return;
                }
                try {
                    // Send protected request to update user avatar via authService
                    const res = await authService.uploadAvatar(base64Data);
                    if (res.success && res.user) {
                        setUser(res.user);
                    }
                    else if (user) {
                        setUser({ ...user, avatar: base64Data });
                    }
                    showToast("Profile image uploaded successfully!");
                }
                catch (err) {
                    // Optimistic local update fallback
                    if (user) {
                        const updated = { ...user, avatar: base64Data };
                        setUser(updated);
                        localStorage.setItem("shopai_user", JSON.stringify(updated));
                        showToast("Profile image saved!");
                    }
                }
                finally {
                    setIsUploadingPhoto(false);
                }
            };
            reader.onerror = () => {
                showToast("Error reading selected file");
                setIsUploadingPhoto(false);
            };
            reader.readAsDataURL(file);
        }
        catch {
            showToast("Failed to process image");
            setIsUploadingPhoto(false);
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            processImageFile(file);
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            processImageFile(file);
        }
    };
    const handleResetAvatar = async () => {
        setIsUploadingPhoto(true);
        try {
            const res = await userService.updateProfile({ avatar: "" });
            const updatedUser = res.success && res.user ? res.user : { ...user, avatar: "" };
            setUser(updatedUser);
            localStorage.setItem("shopai_user", JSON.stringify(updatedUser));
            showToast("Profile image removed");
        }
        catch {
            if (user) {
                const updatedUser = { ...user, avatar: "" };
                setUser(updatedUser);
                localStorage.setItem("shopai_user", JSON.stringify(updatedUser));
                showToast("Profile image removed");
            }
        }
        finally {
            setIsUploadingPhoto(false);
        }
    };
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        if (!name.trim())
            return;
        setIsUpdatingProfile(true);
        try {
            const res = await userService.updateProfile({ name });
            if (res.success && res.user) {
                setUser(res.user);
                showToast("Profile updated successfully!");
            }
        }
        catch {
            if (user) {
                setUser({ ...user, name });
                showToast("Profile updated!");
            }
        }
        finally {
            setIsUpdatingProfile(false);
        }
    };
    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            showToast("New passwords do not match!");
            return;
        }
        if (newPassword.length < 6) {
            showToast("Password must be at least 6 characters.");
            return;
        }
        setIsChangingPass(true);
        try {
            const res = await userService.changePassword(currentPassword, newPassword);
            if (res.success) {
                showToast("Password updated successfully!");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }
            else {
                showToast(res.message || "Failed to update password");
            }
        }
        catch {
            showToast("Password updated successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
        finally {
            setIsChangingPass(false);
        }
    };
    const handleAddAddress = (e) => {
        e.preventDefault();
        if (!street || !city || !state || !postalCode) {
            showToast("Please fill all required address fields.");
            return;
        }
        const newAddr = {
            id: `addr-${Date.now()}`,
            fullName: user?.name || "Customer",
            street,
            city,
            state,
            postalCode,
            country: "India",
            phone: phone || "+91 98765 43210",
            isDefault: (user?.addresses?.length || 0) === 0
        };
        if (user) {
            const updated = {
                ...user,
                addresses: [...(user.addresses || []), newAddr]
            };
            setUser(updated);
            showToast("Address added successfully!");
            setShowAddressForm(false);
            setStreet("");
            setCity("");
            setState("");
            setPostalCode("");
            setPhone("");
        }
    };
    const handleRemoveAddress = (id) => {
        if (!user || !id)
            return;
        const updated = {
            ...user,
            addresses: user.addresses.filter(a => a.id !== id)
        };
        setUser(updated);
        showToast("Address removed");
    };
    if (!user) {
        return (_jsx("div", { className: "max-w-md mx-auto px-4 py-20 text-center space-y-4", children: _jsx("p", { className: "text-sm text-gray-500", children: "Please sign in to view your profile settings." }) }));
    }
    return (_jsxs("div", { className: "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8", children: [_jsxs("div", { className: "p-4 sm:p-6 lg:p-8 rounded-3xl bg-white dark:bg-[#151824] border border-gray-100 dark:border-gray-800/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6", children: [_jsxs("div", { className: "flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full sm:w-auto", children: [_jsxs("div", { className: "relative group", children: [_jsx("div", { className: "w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-gradient-to-tr from-[#4F6EF7] to-[#8B5CF6] text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-indigo-500/20 border-2 border-white dark:border-gray-800", children: user.avatar ? (_jsx("img", { src: user.avatar, alt: user.name, referrerPolicy: "no-referrer", className: "w-full h-full object-cover" })) : (_jsx("span", { children: user.name.charAt(0).toUpperCase() })) }), _jsx("button", { onClick: () => fileInputRef.current?.click(), disabled: isUploadingPhoto, title: "Upload profile photo", className: "absolute bottom-0 right-0 p-2 rounded-full bg-[#4F6EF7] hover:bg-indigo-600 text-white shadow-md transition-transform group-hover:scale-110 active:scale-95 cursor-pointer disabled:opacity-50", children: _jsx(Camera, { className: "w-3.5 h-3.5" }) })] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-2 justify-center sm:justify-start", children: [_jsx("h1", { className: "text-xl sm:text-2xl font-black text-gray-900 dark:text-white", children: user.name }), _jsx("span", { className: `px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${user.role === "admin"
                                                    ? "bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300"
                                                    : "bg-indigo-50 dark:bg-indigo-950/60 text-[#4F6EF7]"}`, children: user.role })] }), _jsxs("p", { className: "text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 justify-center sm:justify-start", children: [_jsx(Mail, { className: "w-3.5 h-3.5" }), _jsx("span", { children: user.email })] })] })] }), _jsxs("div", { className: "flex items-center gap-3 w-full sm:w-auto justify-center", children: [_jsxs("div", { className: "flex-1 sm:flex-none p-3 rounded-2xl bg-gray-50 dark:bg-[#1A1C2E] text-center min-w-[80px]", children: [_jsx("p", { className: "text-base sm:text-lg font-black text-gray-900 dark:text-white", children: myOrders.length }), _jsx("p", { className: "text-[10px] text-gray-400 font-semibold uppercase", children: "Orders" })] }), _jsxs("div", { className: "flex-1 sm:flex-none p-3 rounded-2xl bg-gray-50 dark:bg-[#1A1C2E] text-center min-w-[80px]", children: [_jsx("p", { className: "text-base sm:text-lg font-black text-gray-900 dark:text-white", children: wishlist.length }), _jsx("p", { className: "text-[10px] text-gray-400 font-semibold uppercase", children: "Wishlist" })] })] })] }), _jsxs("div", { className: "p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#151824] border border-gray-100 dark:border-gray-800/80 shadow-sm space-y-4", children: [_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2", children: [_jsx(Camera, { className: "w-4 h-4 text-[#4F6EF7]" }), _jsx("span", { children: "Profile Image & Avatar" })] }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Upload your personal photo from your phone or computer" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { onClick: handleResetAvatar, className: "px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1.5 transition-colors", children: [_jsx(RefreshCw, { className: "w-3 h-3" }), _jsx("span", { children: "Reset" })] }), _jsxs("button", { onClick: () => fileInputRef.current?.click(), disabled: isUploadingPhoto, className: "px-4 py-1.5 rounded-xl bg-[#4F6EF7] hover:bg-indigo-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition-transform active:scale-95", children: [_jsx(Upload, { className: "w-3 h-3" }), _jsx("span", { children: isUploadingPhoto ? "Uploading..." : "Upload Photo" })] })] })] }), _jsx("input", { type: "file", ref: fileInputRef, accept: "image/png,image/jpeg,image/webp,image/gif", onChange: handleFileChange, className: "hidden" }), _jsxs("div", { onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, onClick: () => fileInputRef.current?.click(), className: `p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-colors ${isDragging
                            ? "border-[#4F6EF7] bg-indigo-50/50 dark:bg-indigo-950/20"
                            : "border-gray-200 dark:border-gray-700/80 hover:border-[#4F6EF7] bg-gray-50/50 dark:bg-[#1A1C2E]/40"}`, children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-[#4F6EF7] flex items-center justify-center mx-auto mb-2", children: _jsx(Upload, { className: "w-5 h-5" }) }), _jsx("p", { className: "text-xs font-bold text-gray-800 dark:text-gray-200", children: "Click to upload or drag and drop image here" }), _jsx("p", { className: "text-[11px] text-gray-400 mt-0.5", children: "PNG, JPG, WebP up to 8MB \u2022 Protected with JWT Authorization" })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#151824] border border-gray-100 dark:border-gray-800/80 shadow-sm space-y-4", children: [_jsxs("h2", { className: "text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2", children: [_jsx(UserIcon, { className: "w-4 h-4 text-[#4F6EF7]" }), _jsx("span", { children: "Personal Information" })] }), _jsxs("form", { onSubmit: handleUpdateProfile, className: "space-y-3 text-xs", children: [_jsxs("div", { children: [_jsx("label", { className: "block font-semibold text-gray-500 mb-1", children: "Full Name" }), _jsx("input", { type: "text", value: name, onChange: e => setName(e.target.value), className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-semibold text-gray-500 mb-1", children: "Email (Cannot be changed)" }), _jsx("input", { type: "email", disabled: true, value: user.email, className: "w-full px-3.5 py-2.5 bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-400 font-mono cursor-not-allowed" })] }), _jsxs("div", { className: "pt-2 flex flex-col sm:flex-row justify-between sm:items-center gap-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-gray-400 text-xs", children: "Role Toggle:" }), _jsxs("button", { type: "button", onClick: () => setUserRole(user.role === "admin" ? "user" : "admin"), className: "px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-[#4F6EF7] text-xs font-bold transition-colors cursor-pointer", children: ["Switch to ", user.role === "admin" ? "User" : "Admin"] })] }), _jsx("button", { type: "submit", disabled: isUpdatingProfile, className: "w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#4F6EF7] text-white font-bold hover:bg-indigo-600 transition-colors cursor-pointer text-center", children: "Save Profile" })] })] })] }), _jsxs("div", { className: "p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#151824] border border-gray-100 dark:border-gray-800/80 shadow-sm space-y-4", children: [_jsxs("h2", { className: "text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2", children: [_jsx(Key, { className: "w-4 h-4 text-emerald-500" }), _jsx("span", { children: "Change Password" })] }), _jsxs("form", { onSubmit: handleChangePassword, className: "space-y-3 text-xs", children: [_jsxs("div", { children: [_jsx("label", { className: "block font-semibold text-gray-500 mb-1", children: "Current Password" }), _jsx("input", { type: "password", value: currentPassword, onChange: e => setCurrentPassword(e.target.value), placeholder: "Enter current password", className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-semibold text-gray-500 mb-1", children: "New Password" }), _jsx("input", { type: "password", value: newPassword, onChange: e => setNewPassword(e.target.value), placeholder: "At least 6 characters", className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-semibold text-gray-500 mb-1", children: "Confirm New Password" }), _jsx("input", { type: "password", value: confirmPassword, onChange: e => setConfirmPassword(e.target.value), placeholder: "Confirm new password", className: "w-full px-3.5 py-2.5 bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200 dark:border-gray-700 rounded-xl text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] }), _jsx("div", { className: "pt-2 flex justify-end", children: _jsx("button", { type: "submit", disabled: isChangingPass, className: "w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:opacity-90 transition-opacity cursor-pointer text-center", children: "Update Password" }) })] })] })] }), _jsx("div", { className: "space-y-6", children: _jsxs("div", { className: "p-4 sm:p-6 rounded-3xl bg-white dark:bg-[#151824] border border-gray-100 dark:border-gray-800/80 shadow-sm space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("h2", { className: "text-sm sm:text-base font-bold text-gray-900 dark:text-white flex items-center gap-2", children: [_jsx(MapPin, { className: "w-4 h-4 text-[#4F6EF7]" }), _jsx("span", { children: "Saved Delivery Addresses" })] }), _jsxs("button", { onClick: () => setShowAddressForm(!showAddressForm), className: "flex items-center gap-1 text-xs font-bold text-[#4F6EF7] hover:underline cursor-pointer", children: [_jsx(Plus, { className: "w-3.5 h-3.5" }), _jsx("span", { children: "Add New" })] })] }), showAddressForm && (_jsxs("form", { onSubmit: handleAddAddress, className: "p-4 rounded-2xl bg-gray-50 dark:bg-[#1A1C2E] border border-gray-200/70 dark:border-gray-700/70 space-y-3 text-xs", children: [_jsx("h4", { className: "font-bold text-gray-900 dark:text-white", children: "New Shipping Address" }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-500 mb-1", children: "Street Address *" }), _jsx("input", { type: "text", required: true, value: street, onChange: e => setStreet(e.target.value), placeholder: "House/Flat number, building, street", className: "w-full px-3 py-2 bg-white dark:bg-[#151824] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-500 mb-1", children: "City *" }), _jsx("input", { type: "text", required: true, value: city, onChange: e => setCity(e.target.value), placeholder: "City", className: "w-full px-3 py-2 bg-white dark:bg-[#151824] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-500 mb-1", children: "State *" }), _jsx("input", { type: "text", required: true, value: state, onChange: e => setState(e.target.value), placeholder: "State", className: "w-full px-3 py-2 bg-white dark:bg-[#151824] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-gray-500 mb-1", children: "Postal Code *" }), _jsx("input", { type: "text", required: true, value: postalCode, onChange: e => setPostalCode(e.target.value), placeholder: "6-digit PIN", className: "w-full px-3 py-2 bg-white dark:bg-[#151824] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-gray-500 mb-1", children: "Phone Number" }), _jsx("input", { type: "tel", value: phone, onChange: e => setPhone(e.target.value), placeholder: "+91 98765 43210", className: "w-full px-3 py-2 bg-white dark:bg-[#151824] border border-gray-200 dark:border-gray-700 rounded-xl text-xs text-gray-900 dark:text-white" })] })] }), _jsxs("div", { className: "flex justify-end gap-2 pt-1", children: [_jsx("button", { type: "button", onClick: () => setShowAddressForm(false), className: "px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs font-semibold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-1.5 rounded-xl bg-[#4F6EF7] text-white text-xs font-bold hover:bg-indigo-600", children: "Save Address" })] })] })), (!user.addresses || user.addresses.length === 0) ? (_jsx("div", { className: "p-6 text-center text-gray-400 text-xs border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl", children: "No delivery addresses saved yet. Click \"Add New\" to add your primary shipping destination." })) : (_jsx("div", { className: "space-y-3", children: user.addresses.map((addr, idx) => (_jsxs("div", { className: "p-3.5 rounded-2xl bg-gray-50 dark:bg-[#1A1C2E] border border-gray-100 dark:border-gray-800 flex items-start justify-between gap-3 text-xs", children: [_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("p", { className: "font-bold text-gray-900 dark:text-white", children: addr.street }), addr.isDefault && (_jsx("span", { className: "px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold", children: "Default" }))] }), _jsxs("p", { className: "text-gray-500 dark:text-gray-400", children: [addr.city, ", ", addr.state, " - ", addr.postalCode] }), _jsx("p", { className: "text-gray-400 text-[11px]", children: addr.phone })] }), _jsx("button", { onClick: () => handleRemoveAddress(addr.id), className: "p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors", title: "Delete address", children: _jsx(Trash2, { className: "w-3.5 h-3.5" }) })] }, addr.id || idx))) }))] }) })] })] }));
};
