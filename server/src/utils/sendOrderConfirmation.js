import { BrevoClient } from "@getbrevo/brevo";
import orderConfirmationTemplate from "../templates/orderConfirmation.template.js";

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

// Send order confirmation email to the customer
const sendOrderConfirmation = async ({
    email,
    subject,
    orderId,
    products,
    totalAmount,
}) => {
    try {
        // Generate the HTML email
        const html = orderConfirmationTemplate(
            orderId,
            products,
            totalAmount
        );

        // Send email through Brevo
        const result = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: process.env.BREVO_SENDER_NAME || "SkyCart",
                email: process.env.BREVO_SENDER_EMAIL,
            },

            to: [
                {
                    email: email,
                },
            ],

            subject: subject,

            // Plain-text fallback
            textContent: `
Thank you for your order from SkyCart.

Order ID: ${orderId}

Total Amount: ₹${Number(totalAmount).toFixed(2)}

Your order has been successfully placed.

Thank you for shopping with SkyCart.
            `,

            // HTML email
            htmlContent: html,
        });

        console.log(
            "Order confirmation email sent successfully:",
            result?.messageId
        );

        return result;

    } catch (error) {
        console.error(
            "Failed to send order confirmation email:",
            error
        );

        throw new Error(
            error?.message ||
            "Failed to send order confirmation email"
        );
    }
};

export default sendOrderConfirmation;