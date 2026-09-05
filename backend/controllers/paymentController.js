export async function createPaymentIntent(req, res) {
    try {
        const { amount, currency = "INR", provider = "card" } = req.body;
        const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        // Return structured payload for Stripe / Razorpay checkout handlers
        return res.json({
            success: true,
            provider,
            paymentId,
            amount,
            currency,
            clientSecret: `pi_test_${paymentId}_secret`,
            orderId: `order_rzp_${paymentId}`,
            keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_shopai_mock_key"
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
export async function verifyPayment(req, res) {
    try {
        const { paymentId, orderId } = req.body;
        // Simulate verification
        return res.json({
            success: true,
            verified: true,
            paymentId,
            orderId,
            status: "paid",
            transactionRef: `TXN-${Date.now()}`
        });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message });
    }
}
