/**
 * Email Configuration using Nodemailer
 * Non-blocking configuration - server starts even if email service is unavailable
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Track email service status
let emailServiceReady = false;

// Create reusable transporter with connection timeout
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    },
    // Add connection timeout to prevent hanging
    connectionTimeout: 10000, // 10 seconds
    greetingTimeout: 5000,    // 5 seconds
    socketTimeout: 10000      // 10 seconds
});

// Non-blocking async verification (doesn't block server startup)
const verifyEmailService = async () => {
    try {
        await transporter.verify();
        emailServiceReady = true;
        console.log('✅ Email service is ready to send messages');
    } catch (error) {
        emailServiceReady = false;
        console.warn('⚠️  Email service unavailable (non-critical):', error.message);
        console.log('   Server will continue without email functionality.');
        console.log('   Emails will be queued and logged instead of sent.');
    }
};

// Start verification in background (non-blocking)
verifyEmailService();

// Export helper to check if email is available
export const isEmailReady = () => emailServiceReady;

export default transporter;
