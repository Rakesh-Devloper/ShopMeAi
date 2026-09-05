import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from "react";
import { X, ShieldCheck, CreditCard, Truck, CheckCircle2, ArrowRight, Lock, Smartphone, Building2, Banknote } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatPrice } from "../../utils/formatPrice";
export const CheckoutModal = () => {
    const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotal, user, addOrder, openOrderTracking, showToast } = useApp();
    const [step, setStep] = useState("address");
    const [isProcessing, setIsProcessing] = useState(false);
    const [createdOrderNumber, setCreatedOrderNumber] = useState("");
    // Address fields
    const [fullName, setFullName] = useState(user?.addresses[0]?.fullName || "Rakesh Kondela");
    const [phone, setPhone] = useState(user?.addresses[0]?.phone || "+91 98765 43210");
    const [street, setStreet] = useState(user?.addresses[0]?.street || "Flat 402, Silicon Heights, Hitech City");
    const [city, setCity] = useState(user?.addresses[0]?.city || "Hyderabad");
    const [state, setState] = useState(user?.addresses[0]?.state || "Telangana");
    const [postalCode, setPostalCode] = useState(user?.addresses[0]?.postalCode || "500081");
    // Payment fields
    const [paymentMethod, setPaymentMethod] = useState("upi");
    const [upiId, setUpiId] = useState("rakesh@okaxis");
    const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
    const [cardExp, setCardExp] = useState("12/28");
    const [cardCvv, setCardCvv] = useState("888");
    const shippingFee = cartTotal > 1000 ? 0 : 99;
    const finalTotal = cartTotal + shippingFee;
    if (!isCheckoutOpen)
        return null;
    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        try {
            // 1. Payment Intent
            const paymentRes = await fetch("/api/payment/create-intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: finalTotal, paymentMethod })
            });
            const paymentData = await paymentRes.json();
            // 2. Create Order
            const orderRes = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: cart,
                    shippingAddress: {
                        fullName,
                        phone,
                        street,
                        city,
                        state,
                        postalCode,
                        country: "India"
                    },
                    paymentMethod,
                    paymentResult: {
                        transactionId: paymentData.paymentId || `TXN-${Date.now()}`,
                        status: "success",
                        paidAt: new Date().toISOString()
                    },
                    totalAmount: finalTotal,
                    deliveryFee: shippingFee
                })
            });
            const orderData = await orderRes.json();
            if (orderData.order) {
                setCreatedOrderNumber(orderData.order.orderNumber);
                addOrder(orderData.order);
                setStep("success");
                showToast("Order placed successfully!");
            }
        }
        catch {
            // Fallback local order
            const fallbackNum = `SAI-2026-${Math.floor(10000 + Math.random() * 90000)}`;
            setCreatedOrderNumber(fallbackNum);
            setStep("success");
            showToast("Order placed successfully!");
        }
        finally {
            setIsProcessing(false);
        }
    };
    return (_jsxs("div", { className: "fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6", children: [_jsx("div", { onClick: () => {
                    if (!isProcessing)
                        setIsCheckoutOpen(false);
                }, className: "fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" }), _jsxs("div", { className: "relative w-full max-w-2xl bg-white dark:bg-[#151728] rounded-[28px] shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden z-10 animate-in zoom-in-95 duration-150", children: [_jsxs("div", { className: "p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Lock, { className: "w-5 h-5 text-[#4F6EF7]" }), _jsx("h3", { className: "text-lg font-extrabold text-gray-900 dark:text-white", children: step === "success" ? "Order Confirmed" : "Secure Checkout" })] }), step !== "success" && (_jsx("button", { onClick: () => setIsCheckoutOpen(false), className: "p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800", children: _jsx(X, { className: "w-5 h-5" }) }))] }), _jsxs("div", { className: "p-6 sm:p-8", children: [step === "address" && (_jsxs("div", { className: "space-y-5", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Truck, { className: "w-4 h-4 text-[#4F6EF7]" }), _jsx("h4", { className: "text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider", children: "1. Delivery Address" })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1", children: "Full Name" }), _jsx("input", { type: "text", value: fullName, onChange: e => setFullName(e.target.value), required: true, className: "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2238] text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1", children: "Phone Number" }), _jsx("input", { type: "text", value: phone, onChange: e => setPhone(e.target.value), required: true, className: "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2238] text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] }), _jsxs("div", { className: "sm:col-span-2", children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1", children: "Street Address / Flat / Building" }), _jsx("input", { type: "text", value: street, onChange: e => setStreet(e.target.value), required: true, className: "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2238] text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1", children: "City" }), _jsx("input", { type: "text", value: city, onChange: e => setCity(e.target.value), required: true, className: "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2238] text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1", children: "State" }), _jsx("input", { type: "text", value: state, onChange: e => setState(e.target.value), required: true, className: "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2238] text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1", children: "PIN Code" }), _jsx("input", { type: "text", value: postalCode, onChange: e => setPostalCode(e.target.value), required: true, className: "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2238] text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none focus:border-[#4F6EF7]" })] })] })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-gray-50 dark:bg-[#1E2034] flex items-center justify-between text-xs", children: [_jsxs("div", { children: [_jsx("span", { className: "text-gray-500 dark:text-gray-400", children: "Total payable:" }), _jsx("span", { className: "text-base font-extrabold text-gray-900 dark:text-white ml-2", children: formatPrice(finalTotal) })] }), _jsxs("button", { type: "button", onClick: () => setStep("payment"), className: "px-6 py-2.5 bg-[#4F6EF7] hover:bg-blue-600 text-white rounded-full font-bold text-xs flex items-center gap-1.5 transition-transform hover:scale-105", children: [_jsx("span", { children: "Continue to Payment" }), _jsx(ArrowRight, { className: "w-3.5 h-3.5" })] })] })] })), step === "payment" && (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(CreditCard, { className: "w-4 h-4 text-[#4F6EF7]" }), _jsx("h4", { className: "text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider", children: "2. Select Payment Method" })] }), _jsx("button", { onClick: () => setStep("address"), className: "text-xs text-[#4F6EF7] font-semibold hover:underline", children: "\u2190 Edit Address" })] }), _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [_jsxs("button", { type: "button", onClick: () => setPaymentMethod("upi"), className: `p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${paymentMethod === "upi"
                                                    ? "border-[#4F6EF7] bg-indigo-50/50 dark:bg-indigo-950/30 text-[#4F6EF7] ring-1 ring-[#4F6EF7]"
                                                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2238] text-gray-700 dark:text-gray-300"}`, children: [_jsx(Smartphone, { className: "w-5 h-5 mb-2" }), _jsx("span", { className: "text-xs font-bold", children: "UPI / GPay" })] }), _jsxs("button", { type: "button", onClick: () => setPaymentMethod("card"), className: `p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${paymentMethod === "card"
                                                    ? "border-[#4F6EF7] bg-indigo-50/50 dark:bg-indigo-950/30 text-[#4F6EF7] ring-1 ring-[#4F6EF7]"
                                                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2238] text-gray-700 dark:text-gray-300"}`, children: [_jsx(CreditCard, { className: "w-5 h-5 mb-2" }), _jsx("span", { className: "text-xs font-bold", children: "Credit/Debit" })] }), _jsxs("button", { type: "button", onClick: () => setPaymentMethod("netbanking"), className: `p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${paymentMethod === "netbanking"
                                                    ? "border-[#4F6EF7] bg-indigo-50/50 dark:bg-indigo-950/30 text-[#4F6EF7] ring-1 ring-[#4F6EF7]"
                                                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2238] text-gray-700 dark:text-gray-300"}`, children: [_jsx(Building2, { className: "w-5 h-5 mb-2" }), _jsx("span", { className: "text-xs font-bold", children: "Net Banking" })] }), _jsxs("button", { type: "button", onClick: () => setPaymentMethod("cod"), className: `p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${paymentMethod === "cod"
                                                    ? "border-[#4F6EF7] bg-indigo-50/50 dark:bg-indigo-950/30 text-[#4F6EF7] ring-1 ring-[#4F6EF7]"
                                                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1F2238] text-gray-700 dark:text-gray-300"}`, children: [_jsx(Banknote, { className: "w-5 h-5 mb-2" }), _jsx("span", { className: "text-xs font-bold", children: "Cash on Delivery" })] })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-gray-50 dark:bg-[#1E2034] border border-gray-200 dark:border-gray-800", children: [paymentMethod === "upi" && (_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300", children: "Enter UPI ID / VPA" }), _jsx("input", { type: "text", value: upiId, onChange: e => setUpiId(e.target.value), placeholder: "e.g. yourname@okaxis or @okhdfcbank", className: "w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#121422] text-xs sm:text-sm text-gray-900 dark:text-white" }), _jsx("p", { className: "text-[11px] text-gray-400", children: "Supports Google Pay, PhonePe, Paytm, and BHIM UPI" })] })), paymentMethod === "card" && (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1", children: "Card Number" }), _jsx("input", { type: "text", value: cardNumber, onChange: e => setCardNumber(e.target.value), className: "w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#121422] text-xs sm:text-sm text-gray-900 dark:text-white" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1", children: "Expiry" }), _jsx("input", { type: "text", value: cardExp, onChange: e => setCardExp(e.target.value), className: "w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#121422] text-xs sm:text-sm text-gray-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1", children: "CVV" }), _jsx("input", { type: "password", value: cardCvv, onChange: e => setCardCvv(e.target.value), className: "w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#121422] text-xs sm:text-sm text-gray-900 dark:text-white" })] })] })] })), paymentMethod === "netbanking" && (_jsx("p", { className: "text-xs text-gray-600 dark:text-gray-300", children: "You will be redirected to your authorized bank portal for secure two-factor authentication." })), paymentMethod === "cod" && (_jsx("p", { className: "text-xs text-gray-600 dark:text-gray-300", children: "Pay with cash or UPI QR on doorstep delivery. A verification OTP will be sent to your phone." }))] }), _jsx("button", { type: "button", onClick: handlePlaceOrder, disabled: isProcessing, className: "w-full py-4 bg-[#111827] dark:bg-white text-white dark:text-[#111827] hover:bg-black dark:hover:bg-gray-100 rounded-2xl font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 cursor-pointer", children: isProcessing ? (_jsx("span", { children: "Processing Secure Payment..." })) : (_jsxs(_Fragment, { children: [_jsx(ShieldCheck, { className: "w-5 h-5 text-emerald-500" }), _jsxs("span", { children: ["Pay ", formatPrice(finalTotal), " & Complete Order"] })] })) })] })), step === "success" && (_jsxs("div", { className: "text-center py-6 space-y-5", children: [_jsx("div", { className: "w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 flex items-center justify-center mx-auto shadow-inner", children: _jsx(CheckCircle2, { className: "w-10 h-10" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-2xl font-extrabold text-gray-900 dark:text-white", children: "Order Successfully Placed!" }), _jsxs("p", { className: "text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1", children: ["Thank you, ", fullName, ". A confirmation SMS has been sent to ", phone, "."] })] }), _jsxs("div", { className: "p-4 rounded-2xl bg-gray-50 dark:bg-[#1E2034] max-w-md mx-auto space-y-2 text-xs", children: [_jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Order Tracking Number:" }), _jsx("span", { className: "font-bold text-gray-900 dark:text-white font-mono", children: createdOrderNumber })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Estimated Delivery:" }), _jsx("span", { className: "font-bold text-emerald-600 dark:text-emerald-400", children: "Tomorrow by 8:00 PM" })] }), _jsxs("div", { className: "flex justify-between", children: [_jsx("span", { className: "text-gray-400", children: "Delivery Address:" }), _jsxs("span", { className: "font-medium text-gray-800 dark:text-gray-200 text-right truncate max-w-[200px]", children: [street, ", ", city] })] })] }), _jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center gap-3 pt-3", children: [_jsxs("button", { onClick: () => {
                                                    setIsCheckoutOpen(false);
                                                    openOrderTracking(createdOrderNumber);
                                                }, className: "w-full sm:w-auto px-6 py-3 rounded-full bg-[#4F6EF7] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-blue-600 flex items-center justify-center gap-2", children: [_jsx(Truck, { className: "w-4 h-4" }), _jsx("span", { children: "Track Order in Real-Time" })] }), _jsx("button", { onClick: () => setIsCheckoutOpen(false), className: "w-full sm:w-auto px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs sm:text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700", children: "Continue Shopping" })] })] }))] })] })] }));
};
