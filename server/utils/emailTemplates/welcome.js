/**
 * Welcome Email Template
 */

export const welcomeEmailTemplate = (user) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to ARTISIO</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Arial', sans-serif; background-color: #f8f6f0;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f6f0; padding: 40px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                            
                            <!-- Header -->
                            <tr>
                                <td style="background: linear-gradient(135deg, #1a3a3a 0%, #2a4a5a 100%); padding: 50px 40px; text-align: center;">
                                    <h1 style="margin: 0; color: #D4AF37; font-size: 42px; font-family: 'Georgia', serif; letter-spacing: 3px;">
                                        ARTISIO
                                    </h1>
                                    <p style="margin: 15px 0 0; color: #f8f6f0; font-size: 18px; letter-spacing: 1px;">
                                        Artisan Food & Beverage
                                    </p>
                                </td>
                            </tr>

                            <!-- Welcome Message -->
                            <tr>
                                <td style="padding: 50px 40px; text-align: center;">
                                    <h2 style="margin: 0 0 20px; color: #1a3a3a; font-size: 32px;">
                                        Welcome, ${user.firstName || 'Friend'}! 🎉
                                    </h2>
                                    <p style="margin: 0 0 20px; color: #666; font-size: 18px; line-height: 1.6;">
                                        Thank you for joining our community of artisan food lovers!
                                    </p>
                                    <p style="margin: 0; color: #666; font-size: 16px; line-height: 1.6;">
                                        We're excited to share our curated collection of handcrafted products with you.
                                    </p>
                                </td>
                            </tr>

                            <!-- Benefits -->
                            <tr>
                                <td style="padding: 0 40px 40px;">
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="padding: 20px; background-color: #f8f6f0; border-radius: 8px; text-align: center; width: 33%;">
                                                <div style="font-size: 32px; margin-bottom: 10px;">🎁</div>
                                                <strong style="color: #1a3a3a; display: block; margin-bottom: 5px;">Exclusive Deals</strong>
                                                <span style="color: #666; font-size: 14px;">Member-only discounts</span>
                                            </td>
                                            <td width="20"></td>
                                            <td style="padding: 20px; background-color: #f8f6f0; border-radius: 8px; text-align: center; width: 33%;">
                                                <div style="font-size: 32px; margin-bottom: 10px;">🚚</div>
                                                <strong style="color: #1a3a3a; display: block; margin-bottom: 5px;">Free Shipping</strong>
                                                <span style="color: #666; font-size: 14px;">On orders over $50</span>
                                            </td>
                                            <td width="20"></td>
                                            <td style="padding: 20px; background-color: #f8f6f0; border-radius: 8px; text-align: center; width: 33%;">
                                                <div style="font-size: 32px; margin-bottom: 10px;">⭐</div>
                                                <strong style="color: #1a3a3a; display: block; margin-bottom: 5px;">Loyalty Points</strong>
                                                <span style="color: #666; font-size: 14px;">Earn rewards</span>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Special Offer -->
                            <tr>
                                <td style="padding: 30px 40px; background-color: #fff7ed; text-align: center;">
                                    <h3 style="margin: 0 0 15px; color: #1a3a3a; font-size: 24px;">
                                        Welcome Gift! 🎊
                                    </h3>
                                    <p style="margin: 0 0 20px; color: #666; font-size: 16px;">
                                        Use code <strong style="color: #D4AF37; font-size: 20px;">WELCOME10</strong> for 10% off your first order
                                    </p>
                                    <a href="${process.env.FRONTEND_URL}/products" 
                                       style="display: inline-block; padding: 15px 40px; background-color: #D4AF37; color: #1a3a3a; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                                        Start Shopping
                                    </a>
                                </td>
                            </tr>

                            <!-- Quick Links -->
                            <tr>
                                <td style="padding: 40px 40px 30px;">
                                    <h3 style="color: #1a3a3a; margin: 0 0 20px; font-size: 20px; text-align: center;">
                                        Quick Links
                                    </h3>
                                    <table width="100%">
                                        <tr>
                                            <td align="center" style="padding: 10px;">
                                                <a href="${process.env.FRONTEND_URL}/products" style="color: #1a3a3a; text-decoration: none; font-weight: 600;">
                                                    🛍️ Browse Products
                                                </a>
                                            </td>
                                            <td align="center" style="padding: 10px;">
                                                <a href="${process.env.FRONTEND_URL}/artisans" style="color: #1a3a3a; text-decoration: none; font-weight: 600;">
                                                    👨‍🍳 Meet Artisans
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="padding: 10px;">
                                                <a href="${process.env.FRONTEND_URL}/account" style="color: #1a3a3a; text-decoration: none; font-weight: 600;">
                                                    👤 My Account
                                                </a>
                                            </td>
                                            <td align="center" style="padding: 10px;">
                                                <a href="${process.env.FRONTEND_URL}/about" style="color: #1a3a3a; text-decoration: none; font-weight: 600;">
                                                    ℹ️ About Us
                                                </a>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="padding: 30px 40px; text-align: center; background-color: #1a3a3a; color: #f8f6f0;">
                                    <p style="margin: 0 0 10px; font-size: 14px;">
                                        Questions? Email us at <a href="mailto:support@artisio.com" style="color: #D4AF37;">support@artisio.com</a>
                                    </p>
                                    <p style="margin: 0; font-size: 12px; color: #999;">
                                        © ${new Date().getFullYear()} ARTISIO. All rights reserved.
                                    </p>
                                </td>
                            </tr>

                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
    `;
};
