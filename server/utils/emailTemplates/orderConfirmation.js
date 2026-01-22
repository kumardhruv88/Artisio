/**
 * Order Confirmation / Invoice Email Template
 * Designed to be clean, professional, and print-friendly
 */

export const orderConfirmationTemplate = (order, user) => {
    // Format Date
    const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const itemsHTML = order.items.map(item => `
        <tr style="border-bottom: 1px solid #eee;">
            <td style="padding: 10px 0; color: #333;">
                <div style="font-weight: 600;">${item.name}</div>
                <div style="font-size: 12px; color: #777;">Quantity: ${item.quantity}</div>
            </td>
            <td style="padding: 10px 0; text-align: right; color: #333;">
                $${(item.price * item.quantity).toFixed(2)}
            </td>
        </tr>
    `).join('');

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Invoice #${order.orderNumber} - ARTISIO</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; color: #333;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px 0;">
                <tr>
                    <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 40px; border: 1px solid #ddd; border-radius: 4px;">
                            
                            <!-- Header -->
                            <tr>
                                <td style="border-bottom: 2px solid #333; padding-bottom: 20px;">
                                    <table width="100%">
                                        <tr>
                                            <td valign="top">
                                                <h1 style="margin: 0; font-size: 24px; color: #000; letter-spacing: 1px;">ARTISIO</h1>
                                                <p style="margin: 5px 0 0; font-size: 14px; color: #666;">Artisan Food & Beverage</p>
                                            </td>
                                            <td valign="top" align="right">
                                                <h2 style="margin: 0; font-size: 20px; color: #333; text-transform: uppercase;">INVOICE</h2>
                                                <p style="margin: 5px 0 0; font-size: 14px; color: #666;">#${order.orderNumber}</p>
                                                <p style="margin: 2px 0 0; font-size: 14px; color: #666;">${orderDate}</p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Billing / Shipping Info -->
                            <tr>
                                <td style="padding: 30px 0;">
                                    <table width="100%">
                                        <tr>
                                            <td valign="top" width="50%">
                                                <h3 style="margin: 0 0 10px; font-size: 14px; text-transform: uppercase; color: #777;">Bill To / Ship To:</h3>
                                                <p style="margin: 0; font-size: 15px; line-height: 1.5;">
                                                    <strong>${order.shippingAddress.firstName} ${order.shippingAddress.lastName}</strong><br>
                                                    ${order.shippingAddress.street}<br>
                                                    ${order.shippingAddress.apartment ? order.shippingAddress.apartment + '<br>' : ''}
                                                    ${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.postalCode}<br>
                                                    ${order.shippingAddress.country}
                                                </p>
                                            </td>
                                            <td valign="top" width="50%" align="right">
                                                <h3 style="margin: 0 0 10px; font-size: 14px; text-transform: uppercase; color: #777;">Payment Method:</h3>
                                                <p style="margin: 0; font-size: 15px;">
                                                    Start Card ending in **** (Stripe)<br>
                                                    <span style="display:inline-block; margin-top:5px; padding: 4px 8px; background-color: #e6f7e6; color: #2e7d32; font-size: 12px; border-radius: 4px; font-weight: bold;">PAID</span>
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>

                            <!-- Line Items -->
                            <tr>
                                <td>
                                    <table width="100%" cellpadding="0" cellspacing="0">
                                        <thead>
                                            <tr style="background-color: #f9f9f9;">
                                                <th align="left" style="padding: 10px; font-size: 12px; text-transform: uppercase; color: #666; border-bottom: 2px solid #ddd;">Description</th>
                                                <th align="right" style="padding: 10px; font-size: 12px; text-transform: uppercase; color: #666; border-bottom: 2px solid #ddd;">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${itemsHTML}
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td style="padding-top: 15px;"></td>
                                                <td style="padding-top: 15px;"></td>
                                            </tr>
                                            <tr>
                                                <td align="right" style="padding: 5px 0; color: #666;">Subtotal:</td>
                                                <td align="right" style="padding: 5px 0; color: #333;">$${order.subtotal.toFixed(2)}</td>
                                            </tr>
                                            ${order.discount > 0 ? `
                                            <tr>
                                                <td align="right" style="padding: 5px 0; color: #666;">Discount:</td>
                                                <td align="right" style="padding: 5px 0; color: #2e7d32;">-$${order.discount.toFixed(2)}</td>
                                            </tr>` : ''}
                                            <tr>
                                                <td align="right" style="padding: 5px 0; color: #666;">Tax:</td>
                                                <td align="right" style="padding: 5px 0; color: #333;">$${order.tax.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td align="right" style="padding: 5px 0; color: #666;">Shipping:</td>
                                                <td align="right" style="padding: 5px 0; color: #333;">${order.shippingCost === 0 ? 'FREE' : '$' + order.shippingCost.toFixed(2)}</td>
                                            </tr>
                                            <tr>
                                                <td align="right" style="padding: 15px 0; font-weight: bold; font-size: 16px; border-top: 2px solid #333;">Total:</td>
                                                <td align="right" style="padding: 15px 0; font-weight: bold; font-size: 18px; border-top: 2px solid #333;">$${order.total.toFixed(2)}</td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="padding-top: 40px; border-top: 1px solid #eee; text-align: center;">
                                    <p style="margin: 0; font-size: 12px; color: #999;">
                                        Thank you for your business. If you have any questions, please contact support@artisio.com.
                                    </p>
                                    <div style="margin-top: 20px;">
                                         <a href="${process.env.FRONTEND_URL}/account/orders/${order._id}" 
                                            style="display: inline-block; padding: 10px 20px; background-color: #333; color: #fff; text-decoration: none; font-size: 14px; border-radius: 4px;">
                                            View Order Online
                                         </a>
                                    </div>
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
