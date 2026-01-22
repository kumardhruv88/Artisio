/**
 * Gift Card Controller - Handle gift card operations
 */

import GiftCard from '../models/GiftCard.js';
import { sendOrderConfirmation } from '../utils/emailService.js';

// @desc    Purchase a gift card
// @route   POST /api/gift-cards
// @access  Private
export const purchaseGiftCard = async (req, res) => {
    try {
        const {
            amount,
            senderName,
            senderEmail,
            recipientName,
            recipientEmail,
            message,
            deliveryMethod,
            scheduledDelivery,
            designTemplate
        } = req.body;

        // Validate amount
        if (!amount || amount < 5 || amount > 500) {
            return res.status(400).json({
                success: false,
                message: 'Gift card amount must be between $5 and $500'
            });
        }

        // Create expiry date (1 year from now)
        const expiresAt = new Date();
        expiresAt.setFullYear(expiresAt.getFullYear() + 1);

        // Create gift card
        const giftCard = await GiftCard.create({
            initialBalance: amount,
            currentBalance: amount,
            senderName: senderName || 'Anonymous',
            senderEmail: senderEmail || req.user?.emailAddresses?.[0]?.emailAddress || 'customer@example.com',
            recipientName: recipientName || 'Friend',
            recipientEmail,
            message,
            deliveryMethod: deliveryMethod || 'email',
            scheduledDelivery: scheduledDelivery ? new Date(scheduledDelivery) : null,
            designTemplate: designTemplate || 'classic',
            purchasedBy: req.userId,
            expiresAt,
            status: scheduledDelivery ? 'pending' : 'active',
            isDelivered: !scheduledDelivery
        });

        // TODO: Send gift card email if immediate delivery
        // if (!scheduledDelivery && deliveryMethod === 'email') {
        //     await sendGiftCardEmail(giftCard);
        // }

        res.status(201).json({
            success: true,
            message: 'Gift card created successfully',
            data: {
                id: giftCard._id,
                code: giftCard.code,
                amount: giftCard.initialBalance,
                recipientEmail: giftCard.recipientEmail,
                expiresAt: giftCard.expiresAt
            }
        });
    } catch (error) {
        console.error('Purchase gift card error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create gift card',
            error: error.message
        });
    }
};

// @desc    Check gift card balance
// @route   GET /api/gift-cards/balance/:code
// @access  Public
export const checkBalance = async (req, res) => {
    try {
        const { code } = req.params;

        const giftCard = await GiftCard.findOne({
            code: code.toUpperCase().trim()
        });

        if (!giftCard) {
            return res.status(404).json({
                success: false,
                message: 'Gift card not found. Please check the code and try again.'
            });
        }

        // Check if expired
        if (giftCard.isExpired()) {
            return res.status(400).json({
                success: false,
                message: 'This gift card has expired',
                data: {
                    code: giftCard.code,
                    balance: 0,
                    status: 'expired',
                    expiredAt: giftCard.expiresAt
                }
            });
        }

        res.json({
            success: true,
            data: {
                code: giftCard.code,
                balance: giftCard.currentBalance,
                initialBalance: giftCard.initialBalance,
                status: giftCard.status,
                expiresAt: giftCard.expiresAt,
                isUsable: giftCard.isUsable()
            }
        });
    } catch (error) {
        console.error('Check balance error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to check gift card balance',
            error: error.message
        });
    }
};

// @desc    Redeem gift card (apply to order)
// @route   POST /api/gift-cards/redeem
// @access  Private
export const redeemGiftCard = async (req, res) => {
    try {
        const { code, amount, orderId, orderNumber } = req.body;

        if (!code || !amount) {
            return res.status(400).json({
                success: false,
                message: 'Gift card code and amount are required'
            });
        }

        const giftCard = await GiftCard.findOne({
            code: code.toUpperCase().trim()
        });

        if (!giftCard) {
            return res.status(404).json({
                success: false,
                message: 'Gift card not found'
            });
        }

        if (!giftCard.isUsable()) {
            return res.status(400).json({
                success: false,
                message: giftCard.isExpired()
                    ? 'This gift card has expired'
                    : 'This gift card cannot be used',
                data: {
                    status: giftCard.status,
                    balance: giftCard.currentBalance
                }
            });
        }

        if (amount > giftCard.currentBalance) {
            return res.status(400).json({
                success: false,
                message: `Insufficient balance. Available: $${giftCard.currentBalance.toFixed(2)}`,
                data: {
                    availableBalance: giftCard.currentBalance,
                    requestedAmount: amount
                }
            });
        }

        // Apply gift card to order
        const remainingBalance = await giftCard.applyToOrder(orderId, orderNumber, amount);

        res.json({
            success: true,
            message: `$${amount.toFixed(2)} applied from gift card`,
            data: {
                code: giftCard.code,
                amountApplied: amount,
                remainingBalance,
                status: giftCard.status
            }
        });
    } catch (error) {
        console.error('Redeem gift card error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to redeem gift card',
            error: error.message
        });
    }
};

// @desc    Get user's purchased gift cards
// @route   GET /api/gift-cards/my-cards
// @access  Private
export const getMyGiftCards = async (req, res) => {
    try {
        const giftCards = await GiftCard.find({ purchasedBy: req.userId })
            .sort({ createdAt: -1 })
            .select('-usageHistory');

        res.json({
            success: true,
            count: giftCards.length,
            data: giftCards.map(card => ({
                id: card._id,
                code: card.code,
                balance: card.currentBalance,
                initialBalance: card.initialBalance,
                recipientName: card.recipientName,
                recipientEmail: card.recipientEmail,
                status: card.status,
                expiresAt: card.expiresAt,
                createdAt: card.createdAt
            }))
        });
    } catch (error) {
        console.error('Get gift cards error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch gift cards',
            error: error.message
        });
    }
};

// @desc    Validate gift card (for checkout)
// @route   POST /api/gift-cards/validate
// @access  Private
export const validateGiftCard = async (req, res) => {
    try {
        const { code } = req.body;

        const giftCard = await GiftCard.findOne({
            code: code.toUpperCase().trim()
        });

        if (!giftCard) {
            return res.status(404).json({
                success: false,
                valid: false,
                message: 'Gift card not found'
            });
        }

        const isValid = giftCard.isUsable();

        res.json({
            success: true,
            valid: isValid,
            data: {
                code: giftCard.code,
                balance: giftCard.currentBalance,
                status: giftCard.status,
                message: isValid
                    ? `Gift card valid with $${giftCard.currentBalance.toFixed(2)} balance`
                    : giftCard.isExpired()
                        ? 'Gift card has expired'
                        : 'Gift card is not usable'
            }
        });
    } catch (error) {
        console.error('Validate gift card error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to validate gift card',
            error: error.message
        });
    }
};
