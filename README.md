<div align="center">

<img src="https://img.shields.io/badge/ARTISIO-Handcrafted%20Excellence-8B4513?style=for-the-badge&logoColor=white" alt="Artisio" height="40"/>

# Artisio — Artisan E-Commerce Platform

A full-stack e-commerce platform built to showcase and sell handcrafted artisan products, featuring a premium shopping experience from discovery to delivery.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20Site-8B4513?style=flat-square)](https://github.com/kumardhruv88/Artisio)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](https://github.com/kumardhruv88/Artisio/pulls)

</div>

---

## Overview

**Artisio** is a production-ready e-commerce platform designed specifically for artisan creators and their customers. It provides a seamless storefront with advanced product discovery, a fully managed shopping cart and checkout flow via Stripe, real-time order tracking, and a comprehensive admin dashboard with analytics — all wrapped in a glassmorphic, animation-rich UI.

---

## Features

### Customer Experience
- **Product Browsing** — Filter and search by category, price, and artisan
- **Rich Product Pages** — High-quality imagery, detailed descriptions, ratings, and reviews
- **Shopping Cart** — Add, remove, and update item quantities in real time
- **Wishlist** — Save products for future purchase
- **Secure Checkout** — PCI-compliant payments powered by Stripe
- **Order Tracking** — Real-time order status updates
- **User Accounts** — Profile management and full order history
- **Email Notifications** — Automated order confirmations and shipping updates

### Admin Dashboard
- **Analytics Overview** — Revenue charts, sales metrics, and KPI summaries
- **Product Management** — Create, edit, and delete product listings
- **Order Management** — View orders and update fulfillment status
- **Inventory Tracking** — Monitor and manage stock levels
- **Artisan Management** — Curate and manage artisan profiles
- **Subscription Management** — Administer premium subscription plans

### Platform Extras
- **Gift Cards** — Issue and redeem gift cards at checkout
- **Promo Codes** — Apply discount codes with configurable rules
- **Subscription Boxes** — Monthly curated artisan product boxes
- **Artisan Spotlight** — Dedicated feature pages for artisan profiles

---

## Tech Stack

### Frontend

| Technology | Badge | Purpose |
|---|---|---|
| React 18 | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) | UI library |
| Vite | ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Build tool & dev server |
| Tailwind CSS | ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white) | Utility-first styling |
| Framer Motion | ![Framer](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) | UI animations |
| GSAP | ![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=flat-square&logo=greensock&logoColor=white) | Advanced animations |
| React Router | ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white) | Client-side routing |
| Zustand | ![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=react&logoColor=white) | Lightweight state management |
| React Query | ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white) | Server state & data fetching |
| Clerk | ![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white) | Authentication & user management |

### Backend

| Technology | Badge | Purpose |
|---|---|---|
| Node.js | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) | JavaScript runtime |
| Express.js | ![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white) | Web framework |
| MongoDB | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | NoSQL database |
| Mongoose | ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white) | MongoDB ODM |
| JWT | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white) | Stateless authentication |
| Stripe | ![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=flat-square&logo=stripe&logoColor=white) | Payment processing |
| Cloudinary | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white) | Cloud image storage |
| Nodemailer | ![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?style=flat-square&logo=gmail&logoColor=white) | Transactional email |

### Infrastructure & Deployment

| Service | Badge | Platform |
|---|---|---|
| Frontend | ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white) | Vercel |
| Backend | ![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=flat-square&logo=railway&logoColor=white) | Railway |
| Database | ![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white) | MongoDB Atlas |
| Images | ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat-square&logo=cloudinary&logoColor=white) | Cloudinary |

---

## Project Structure

```
artisio/
├── client/                         # React frontend application
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # Route-level page components
│   │   │   ├── admin/              # Admin dashboard views
│   │   │   └── account/            # User account views
│   │   ├── context/                # React context providers
│   │   ├── hooks/                  # Custom React hooks
│   │   ├── services/               # API service layer
│   │   └── config/                 # App-level configuration
│   └── package.json
│
├── server/                         # Node.js backend application
│   ├── config/                     # Database & environment config
│   ├── controllers/                # Business logic & route handlers
│   ├── middleware/                 # Custom Express middleware
│   ├── models/                     # Mongoose data models
│   ├── routes/                     # API route definitions
│   ├── utils/                      # Shared utility functions
│   ├── seeds/                      # Database seed scripts
│   └── server.js                   # Application entry point
│
└── scraper/                        # Product data scraping utilities
```

---

## Getting Started

### Prerequisites

Ensure the following are installed and configured before proceeding:

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Stripe](https://stripe.com/) account
- [Clerk](https://clerk.dev/) account
- [Cloudinary](https://cloudinary.com/) account

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/kumardhruv88/Artisio.git
cd Artisio
```

**2. Configure and start the backend**

```bash
cd server
npm install
cp .env.example .env   # Add your environment variables
npm run dev
```

**3. Configure and start the frontend**

```bash
cd client
npm install
cp .env.example .env   # Add your environment variables
npm run dev
```

**4. Access the application**

| Service | URL |
|---|---|
| Frontend | `http://localhost:3002` |
| Backend API | `http://localhost:5000` |

---

## Environment Variables

### Backend — `server/.env`

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3002

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASSWORD=your_app_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
```

### Frontend — `client/.env`

```env
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

---

## API Reference

### Products

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/products` | — | Retrieve all products |
| `GET` | `/api/products/:id` | — | Retrieve a single product |
| `POST` | `/api/products` | Admin | Create a new product |
| `PUT` | `/api/products/:id` | Admin | Update an existing product |
| `DELETE` | `/api/products/:id` | Admin | Delete a product |

### Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/users/me` | User | Get the authenticated user |
| `PUT` | `/api/users/profile` | User | Update user profile |
| `GET` | `/api/users/orders` | User | Get user's order history |

### Orders

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/orders` | User | Place a new order |
| `GET` | `/api/orders/:id` | User | Get order details |
| `GET` | `/api/orders/track/:id` | User | Track an order |

### Cart & Wishlist

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/cart` | User | Retrieve cart contents |
| `POST` | `/api/cart/add` | User | Add item to cart |
| `GET` | `/api/wishlist` | User | Retrieve wishlist |
| `POST` | `/api/wishlist/add` | User | Add item to wishlist |

---

## Deployment

For step-by-step deployment instructions, refer to [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## Contributing

Contributions are welcome and appreciated. To get started:

1. Fork the repository
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'feat: add your feature'`
4. Push to your branch — `git push origin feature/your-feature`
5. Open a Pull Request

Please ensure your code follows the existing conventions and includes relevant documentation where applicable.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Author

**Dhruv Kumar**

[![GitHub](https://img.shields.io/badge/GitHub-@kumardhruv88-181717?style=flat-square&logo=github)](https://github.com/kumardhruv88)

---

<div align="center">

*Built with care for the craft.*

</div>
