export function formatPrice(amount) {
    return "₹" + amount.toLocaleString("en-IN");
}
export function calculateDiscount(original, discounted) {
    if (!original || original <= discounted)
        return 0;
    return Math.round(((original - discounted) / original) * 100);
}
