const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Payment = async (req, res) => {
    try {
        // Validate line_items format
        if (!Array.isArray(req.body.line_items)) {
            throw new Error('Invalid line_items format');
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.line_items.map(item => ({
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: item.itemDisplayName,  // Changed item.name to item.itemDisplayName
                    },
                    unit_amount: item.price * 100 , // Price should be in cents
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${req.body.success_url}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: req.body.cancel_url,
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).send({ error: 'Failed to create Stripe session.' });
    }
};

module.exports = { Payment };
