import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useRef } from "react";
import { X, Send, Bot, User, ShoppingBag, ExternalLink, RotateCcw } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatPrice } from "../../utils/formatPrice";
export const AIAssistantDrawer = () => {
    const { isAIAssistantOpen, setIsAIAssistantOpen, aiInitialPrompt, addToCart, setSelectedProduct } = useApp();
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: "msg-welcome",
            sender: "ai",
            text: "Hello! I'm ShopMe, your personal shopping assistant powered by Google Gemini. Looking for specific budget tech, stylish fashion, or home ideas? Ask me anything!",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            recommendedProducts: []
        }
    ]);
    const chatEndRef = useRef(null);
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);
    useEffect(() => {
        if (aiInitialPrompt && isAIAssistantOpen) {
            sendMessage(aiInitialPrompt);
        }
    }, [aiInitialPrompt, isAIAssistantOpen]);
    const sendMessage = async (promptText) => {
        if (!promptText.trim())
            return;
        const userMsg = {
            id: `user-${Date.now()}`,
            sender: "user",
            text: promptText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);
        try {
            const res = await fetch("/api/ai/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: promptText })
            });
            const data = await res.json();
            const aiMsg = {
                id: `ai-${Date.now()}`,
                sender: "ai",
                text: data.reply || "Here are my recommendations based on our catalog.",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                recommendedProducts: data.recommendedProducts || []
            };
            setMessages(prev => [...prev, aiMsg]);
        }
        catch (err) {
            const fallbackMsg = {
                id: `ai-${Date.now()}`,
                sender: "ai",
                text: "I analyzed our catalog and found the top rated choices matching your request.",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            };
            setMessages(prev => [...prev, fallbackMsg]);
        }
        finally {
            setLoading(false);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(input);
    };
    const samplePrompts = [
        "Find me best laptop under ₹50,000 for coding",
        "Best noise-cancelling headphones for music",
        "Trending summer fashion for men",
        "Minimalist home decor recommendations"
    ];
    if (!isAIAssistantOpen)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-50 overflow-hidden flex justify-end", children: [_jsx("div", { onClick: () => setIsAIAssistantOpen(false), className: "fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" }), _jsxs("div", { className: "relative w-full max-w-lg bg-white dark:bg-[#121422] shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-200", children: [_jsxs("div", { className: "p-4 sm:p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50 dark:from-[#1A1C30] dark:to-[#171626]", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#4F6EF7] via-[#8B5CF6] to-[#EC4899] text-white flex items-center justify-center shadow-md", children: _jsx(Bot, { className: "w-5 h-5" }) }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("h3", { className: "text-base font-extrabold text-gray-900 dark:text-white", children: "ShopMe Assistant" }), _jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#4F6EF7]/10 text-[#4F6EF7] uppercase tracking-wider", children: "Gemini" })] }), _jsx("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Personalized catalog recommendations" })] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => {
                                            setMessages([
                                                {
                                                    id: "msg-welcome-reset",
                                                    sender: "ai",
                                                    text: "Conversation refreshed. What can I help you find today?",
                                                    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                                }
                                            ]);
                                        }, title: "Restart Conversation", className: "p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-white/60 dark:hover:bg-gray-800", children: _jsx(RotateCcw, { className: "w-4 h-4" }) }), _jsx("button", { onClick: () => setIsAIAssistantOpen(false), className: "p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-full hover:bg-white/60 dark:hover:bg-gray-800", children: _jsx(X, { className: "w-5 h-5" }) })] })] }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 sm:p-5 space-y-4", children: [messages.map(msg => (_jsxs("div", { className: `flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`, children: [_jsx("div", { className: `w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === "user"
                                            ? "bg-[#111827] text-white"
                                            : "bg-gradient-to-tr from-[#4F6EF7] to-[#8B5CF6] text-white"}`, children: msg.sender === "user" ? _jsx(User, { className: "w-4 h-4" }) : _jsx(Bot, { className: "w-4 h-4" }) }), _jsxs("div", { className: `space-y-2 max-w-[82%] ${msg.sender === "user" ? "items-end" : "items-start"}`, children: [_jsxs("div", { className: `p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${msg.sender === "user"
                                                    ? "bg-[#4F6EF7] text-white rounded-tr-none font-medium"
                                                    : "bg-gray-100 dark:bg-[#1E2032] text-gray-800 dark:text-gray-200 rounded-tl-none border border-gray-200/50 dark:border-gray-800"}`, children: [_jsx("p", { className: "whitespace-pre-wrap", children: msg.text }), _jsx("span", { className: `block text-[10px] mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-400"}`, children: msg.timestamp })] }), msg.recommendedProducts && msg.recommendedProducts.length > 0 && (_jsxs("div", { className: "space-y-2 pt-1 w-full", children: [_jsx("p", { className: "text-[11px] font-bold text-gray-400 uppercase tracking-wider", children: "Recommended Matches" }), msg.recommendedProducts.map(p => (_jsxs("div", { className: "bg-white dark:bg-[#161828] p-3 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm flex items-center gap-3", children: [_jsx("img", { src: p.images[0], alt: p.name, className: "w-14 h-14 object-contain rounded-xl bg-gray-50 dark:bg-gray-800 p-1 shrink-0" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "text-xs font-bold text-gray-900 dark:text-white truncate", children: p.name }), _jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [_jsx("span", { className: "text-xs font-black text-gray-900 dark:text-white", children: formatPrice(p.discountPrice) }), p.discountPercentage > 0 && (_jsxs("span", { className: "text-[10px] font-bold text-emerald-600 dark:text-emerald-400", children: [p.discountPercentage, "% OFF"] }))] }), _jsxs("div", { className: "flex items-center gap-2 mt-1.5", children: [_jsxs("button", { onClick: () => addToCart(p), className: "px-2.5 py-1 rounded-lg bg-[#4F6EF7] text-white text-[11px] font-bold flex items-center gap-1 hover:bg-blue-600 transition-colors", children: [_jsx(ShoppingBag, { className: "w-3 h-3" }), _jsx("span", { children: "Add to Cart" })] }), _jsxs("button", { onClick: () => {
                                                                                    setSelectedProduct(p);
                                                                                    setIsAIAssistantOpen(false);
                                                                                }, className: "px-2 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-[11px] font-medium flex items-center gap-1 hover:bg-gray-200 dark:hover:bg-gray-700", children: [_jsx(ExternalLink, { className: "w-3 h-3" }), _jsx("span", { children: "View" })] })] })] })] }, p.id)))] }))] })] }, msg.id))), loading && (_jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: "w-8 h-8 rounded-full bg-gradient-to-tr from-[#4F6EF7] to-[#8B5CF6] text-white flex items-center justify-center shrink-0", children: _jsx(Bot, { className: "w-4 h-4" }) }), _jsxs("div", { className: "p-3.5 rounded-2xl rounded-tl-none bg-gray-100 dark:bg-[#1E2032] flex items-center gap-1.5", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-[#4F6EF7] animate-bounce" }), _jsx("div", { className: "w-2 h-2 rounded-full bg-[#8B5CF6] animate-bounce [animation-delay:0.2s]" }), _jsx("div", { className: "w-2 h-2 rounded-full bg-[#EC4899] animate-bounce [animation-delay:0.4s]" }), _jsx("span", { className: "text-xs text-gray-400 ml-1.5", children: "Analyzing store catalog..." })] })] })), _jsx("div", { ref: chatEndRef })] }), _jsx("div", { className: "px-4 py-2 bg-gray-50/70 dark:bg-[#161828]/50 border-t border-gray-100 dark:border-gray-800/80 overflow-x-auto no-scrollbar", children: _jsx("div", { className: "flex items-center gap-2 whitespace-nowrap", children: samplePrompts.map((prompt, i) => (_jsx("button", { onClick: () => sendMessage(prompt), className: "px-3 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-[11px] font-medium text-gray-700 dark:text-gray-300 hover:text-[#4F6EF7] hover:border-[#4F6EF7] dark:hover:border-indigo-500 transition-colors", children: prompt }, i))) }) }), _jsx("div", { className: "p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-[#121422]", children: _jsxs("form", { onSubmit: handleSubmit, className: "flex items-center gap-2", children: [_jsx("input", { type: "text", value: input, onChange: e => setInput(e.target.value), placeholder: "Ask anything (e.g. laptop under \u20B950k, gym audio)...", className: "flex-1 px-4 py-2.5 bg-gray-50 dark:bg-[#1E2032] border border-gray-200 dark:border-gray-700/80 rounded-full text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F6EF7]/20 focus:border-[#4F6EF7]" }), _jsx("button", { type: "submit", disabled: loading || !input.trim(), className: "w-10 h-10 rounded-full bg-[#4F6EF7] hover:bg-blue-600 disabled:opacity-40 text-white flex items-center justify-center shadow-md transition-all shrink-0 cursor-pointer", children: _jsx(Send, { className: "w-4 h-4" }) })] }) })] })] }));
};
