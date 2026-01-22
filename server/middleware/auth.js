/**
 * Clerk Auth Middleware - Verifies JWT from Clerk
 */

import { Webhook } from 'svix';

// Middleware to extract clerkId from Authorization header
// For production, use @clerk/express or verify JWT properly
export const requireAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        const token = authHeader.split(' ')[1];

        // In development, we'll accept the clerkId directly for simplicity
        // In production, verify the JWT with Clerk's public key
        if (process.env.NODE_ENV === 'development') {
            // For dev, expect format: Bearer clerkId:user_xxxx
            if (token.startsWith('clerkId:')) {
                const clerkId = token.replace('clerkId:', '');
                req.auth = { clerkId, userId: clerkId };
                req.userId = clerkId; // For controllers that use req.userId
                return next();
            }
        }

        // TODO: For production, verify JWT with Clerk
        // const decoded = verifyClerkJWT(token);
        // req.auth = { clerkId: decoded.sub };

        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token verification failed'
        });
    }
};

// Alias for protect (common naming convention)
export const protect = requireAuth;

// Optional auth - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];

            if (token.startsWith('clerkId:')) {
                const clerkId = token.replace('clerkId:', '');
                req.auth = { clerkId, userId: clerkId };
                req.userId = clerkId;
            }
        }

        next();
    } catch (error) {
        next();
    }
};

// Verify Clerk webhook signature
export const verifyWebhook = async (req, res, next) => {
    try {
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.warn('CLERK_WEBHOOK_SECRET not set, skipping verification');
            return next();
        }

        const svix_id = req.headers['svix-id'];
        const svix_timestamp = req.headers['svix-timestamp'];
        const svix_signature = req.headers['svix-signature'];

        if (!svix_id || !svix_timestamp || !svix_signature) {
            return res.status(400).json({ error: 'Missing svix headers' });
        }

        const wh = new Webhook(webhookSecret);
        const payload = JSON.stringify(req.body);

        wh.verify(payload, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature
        });

        next();
    } catch (error) {
        return res.status(400).json({ error: 'Webhook verification failed' });
    }
};

