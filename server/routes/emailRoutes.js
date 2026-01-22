/**
 * Email Test Route
 */

import express from 'express';
import { sendTestEmail, sendWelcomeEmail } from '../utils/emailService.js';

const router = express.Router();

// @desc    Send test email
// @route   POST /api/email/test
// @access  Public (for testing only - remove in production)
router.post('/test', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email address is required'
            });
        }

        const result = await sendTestEmail(email);

        if (result.success) {
            res.json({
                success: true,
                message: 'Test email sent successfully!',
                messageId: result.messageId
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to send email',
                error: result.error
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @desc    Send welcome email
// @route   POST /api/email/welcome
// @access  Public (for testing)
router.post('/welcome', async (req, res) => {
    try {
        const { email, firstName } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email address is required'
            });
        }

        const result = await sendWelcomeEmail(email, { firstName: firstName || 'Friend' });

        if (result.success) {
            res.json({
                success: true,
                message: 'Welcome email sent successfully!',
                messageId: result.messageId
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Failed to send email',
                error: result.error
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// @desc    Send contact form email
// @route   POST /api/email/contact
// @access  Public
router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, orderNumber, message } = req.body;

        if (!email || !name || !message) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and message are required'
            });
        }

        // Build email content
        const emailContent = `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
            ${orderNumber ? `<p><strong>Order Number:</strong> ${orderNumber}</p>` : ''}
            <hr>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `;

        // For now, just log the contact form (email service may not be configured)
        console.log('Contact Form Received:', { name, email, subject, orderNumber, message });

        // Return success (in production, this would send an email)
        res.json({
            success: true,
            message: 'Message received! We will get back to you soon.'
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send message. Please try again.'
        });
    }
});

export default router;
