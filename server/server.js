/**
 * Artisio API Server
 * Full-stack e-commerce backend with Clerk auth, Stripe payments
 */

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Route imports
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import emailRoutes from './routes/emailRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import giftCardRoutes from './routes/giftCardRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Connect to database
connectDB();

const app = express();

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3002',
    credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging in development
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.path}`);
        next();
    });
}

// Health check
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Artisio API',
        version: '2.0.0',
        status: 'running'
    });
});

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/gift-cards', giftCardRoutes);
app.use('/api/admin', adminRoutes);

// 404 handler
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   🚀 Artisio API Server v2.0                           ║
║                                                        ║
║   Environment: ${process.env.NODE_ENV?.padEnd(38)}║
║   Port: ${String(PORT).padEnd(46)}║
║                                                        ║
║   Endpoints:                                           ║
║   • GET  /api/products     - Products                  ║
║   • GET  /api/users/me     - User profile              ║
║   • POST /api/orders       - Create order              ║
║   • GET  /api/cart         - Shopping cart             ║
║   • GET  /api/wishlist     - Wishlist                  ║
║   • GET  /api/reviews      - Reviews & Ratings         ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
    `);
});

export default app;
