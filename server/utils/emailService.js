/**
 * Email Service - Send emails using templates
 */

import transporter from '../config/email.js';
import { orderConfirmationTemplate } from './emailTemplates/orderConfirmation.js';
import { welcomeEmailTemplate } from './emailTemplates/welcome.js';

// Send order confirmation email
export const sendOrderConfirmation = async (order, userEmail, user) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: userEmail,
            subject: `Order Confirmation - ${order.orderNumber} | ARTISIO`,
            html: orderConfirmationTemplate(order, user)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Order confirmation email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending order confirmation email:', error);
        return { success: false, error: error.message };
    }
};

// Send welcome email
export const sendWelcomeEmail = async (userEmail, user) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: userEmail,
            subject: 'Welcome to ARTISIO - Your Artisan Food Journey Begins! 🎉',
            html: welcomeEmailTemplate(user)
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Welcome email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending welcome email:', error);
        return { success: false, error: error.message };
    }
};

// Send shipping notification
export const sendShippingNotification = async (order, userEmail, trackingNumber) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: userEmail,
            subject: `Your Order is on the Way! - ${order.orderNumber}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1a3a3a;">Your Order Has Shipped! 📦</h2>
                    <p>Good news! Your order <strong>${order.orderNumber}</strong> is on its way!</p>
                    
                    <div style="background-color: #f8f6f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0;"><strong>Tracking Number:</strong></p>
                        <p style="font-size: 18px; color: #D4AF37; font-weight: bold; margin: 10px 0;">${trackingNumber}</p>
                    </div>
                    
                    <p>Track your package here:</p>
                    <a href="${process.env.FRONTEND_URL}/account/orders/${order._id}" 
                       style="display: inline-block; padding: 12px 30px; background-color: #1a3a3a; color: white; text-decoration: none; border-radius: 6px;">
                        Track Order
                    </a>
                    
                    <p style="margin-top: 30px; color: #666; font-size: 14px;">
                        Thank you for choosing ARTISIO!
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Shipping notification sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending shipping notification:', error);
        return { success: false, error: error.message };
    }
};

// Send order delivered notification
export const sendDeliveryNotification = async (order, userEmail) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: userEmail,
            subject: `Order Delivered - ${order.orderNumber} | ARTISIO`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #10b981;">Your Order Has Been Delivered! ✅</h2>
                    <p>Great news! Your order <strong>${order.orderNumber}</strong> has been delivered.</p>
                    
                    <p>We hope you love your artisan products! We'd love to hear your feedback.</p>
                    
                    <a href="${process.env.FRONTEND_URL}/account/orders/${order._id}" 
                       style="display: inline-block; padding: 12px 30px; background-color: #D4AF37; color: #1a3a3a; text-decoration: none; border-radius: 6px; margin: 20px 0;">
                        Leave a Review
                    </a>
                    
                    <p style="color: #666; font-size: 14px; margin-top: 30px;">
                        Thank you for supporting artisan makers!<br>
                        - The ARTISIO Team
                    </p>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Delivery notification sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending delivery notification:', error);
        return { success: false, error: error.message };
    }
};

// Test email function
export const sendTestEmail = async (toEmail) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: toEmail,
            subject: 'Test Email from ARTISIO',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #f8f6f0;">
                    <h1 style="color: #1a3a3a; text-align: center;">✅ Email Service is Working!</h1>
                    <p style="color: #666; text-align: center; font-size: 16px;">
                        Your ARTISIO email service is configured correctly and ready to send emails.
                    </p>
                    <div style="background-color: #1a3a3a; color: #D4AF37; padding: 20px; border-radius: 8px; text-align: center; margin-top: 20px;">
                        <strong>Test Successful!</strong>
                    </div>
                </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Test email sent:', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('❌ Error sending test email:', error);
        return { success: false, error: error.message };
    }
};
