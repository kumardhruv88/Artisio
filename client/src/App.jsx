import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CustomerLayout from '@components/layout/CustomerLayout';
import AccountLayout from '@components/layout/AccountLayout';

// Customer Pages
import Home from '@pages/Home';
import Products from '@pages/Products';
import ProductDetail from '@pages/ProductDetail';
import Cart from '@pages/Cart';
import Checkout from '@pages/Checkout';
import OrderConfirmation from '@pages/OrderConfirmation';
import OrderTracking from '@pages/OrderTracking';
import WishlistPage from '@pages/WishlistPage';

// Auth Pages
import Login from '@pages/Login';
import Register from '@pages/Register';
import ForgotPassword from '@pages/ForgotPassword';
import SSOCallback from '@pages/SSOCallback';

// Additional Customer Pages
import Subscription from '@pages/Subscription';
import Artisans from '@pages/Artisans';
import ArtisanDetail from '@pages/ArtisanDetail';
import Blog from '@pages/Blog';
import BlogPost from '@pages/BlogPost';
import GiftCards from '@pages/GiftCards';
import FAQ from '@pages/FAQ';
import Contact from '@pages/Contact';
import About from '@pages/About';
import Shipping from '@pages/Shipping';
import Returns from '@pages/Returns';
import Privacy from '@pages/Privacy';
import Terms from '@pages/Terms';
import NotFound from '@pages/NotFound';

// Account Pages
import AccountDashboard from '@pages/account/AccountDashboard';
import Orders from '@pages/account/Orders';
import Wishlist from '@pages/account/Wishlist';
import Addresses from '@pages/account/Addresses';
import PaymentMethods from '@pages/account/PaymentMethods';
import LoyaltyProgram from '@pages/account/LoyaltyProgram';
import ProfileSettings from '@pages/account/ProfileSettings';

// Admin Pages
import AdminLayout from '@components/layout/AdminLayout';
import AdminLogin from '@pages/admin/AdminLogin';
import Dashboard from '@pages/admin/Dashboard';
import AdminProducts from '@pages/admin/Products';
import AdminOrders from '@pages/admin/Orders';
import AdminCustomers from '@pages/admin/Customers';
import AdminCategories from '@pages/admin/Categories';
import AdminArtisans from '@pages/admin/Artisans';
import AdminSubscriptions from '@pages/admin/Subscriptions';
import AdminInventory from '@pages/admin/Inventory';
import AdminSettings from '@pages/admin/Settings';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Admin Routes - OUTSIDE CustomerLayout for isolation */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="customers" element={<AdminCustomers />} />
                    <Route path="categories" element={<AdminCategories />} />
                    <Route path="artisans" element={<AdminArtisans />} />
                    <Route path="subscriptions" element={<AdminSubscriptions />} />
                    <Route path="inventory" element={<AdminInventory />} />
                    <Route path="settings" element={<AdminSettings />} />
                </Route>

                {/* Customer Pages */}
                <Route element={<CustomerLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/sso-callback" element={<SSOCallback />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:slug" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/track-order/:orderId" element={<OrderTracking />} />
                    <Route path="/track-order" element={<OrderTracking />} />
                    <Route path="/wishlist" element={<WishlistPage />} />

                    {/* Additional Pages */}
                    <Route path="/subscriptions" element={<Subscription />} />
                    <Route path="/subscription" element={<Subscription />} />
                    <Route path="/artisans" element={<Artisans />} />
                    <Route path="/artisans/:id" element={<ArtisanDetail />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route path="/gift-cards" element={<GiftCards />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />

                    {/* Account Routes */}
                    <Route path="/account" element={<AccountLayout />}>
                        <Route index element={<AccountDashboard />} />
                        <Route path="orders" element={<Orders />} />
                        <Route path="orders/:orderId" element={<Orders />} />
                        <Route path="wishlist" element={<Wishlist />} />
                        <Route path="addresses" element={<Addresses />} />
                        <Route path="payment-methods" element={<PaymentMethods />} />
                        <Route path="loyalty" element={<LoyaltyProgram />} />
                        <Route path="settings" element={<ProfileSettings />} />
                    </Route>

                    {/* 404 - Catch all */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
