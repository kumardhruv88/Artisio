# 🎨 ARTISIO - Artisan E-Commerce Platform

<div align="center">

![Artisio Banner](https://img.shields.io/badge/ARTISIO-Handcrafted%20Excellence-8B4513?style=for-the-badge&logo=shopify&logoColor=white)

**A premium e-commerce platform celebrating handcrafted artistry**

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-008CDD?style=flat-square&logo=stripe)](https://stripe.com/)

[Live Demo](#) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Installation](#-installation)

</div>

---

## 📖 About

**ARTISIO** is a full-stack e-commerce platform designed to showcase and sell handcrafted artisan products. It features a stunning UI with glassmorphism design, smooth animations, and a complete shopping experience from browsing to checkout.

---

## ✨ Features

### 🛍️ Customer Features
- **Product Browsing** - Filter by category, price, artisan
- **Product Details** - High-quality images, reviews, ratings
- **Shopping Cart** - Add, remove, update quantities
- **Wishlist** - Save products for later
- **Secure Checkout** - Stripe payment integration
- **Order Tracking** - Track order status in real-time
- **User Accounts** - Profile management, order history
- **Email Notifications** - Order confirmation, shipping updates

### 👨‍💼 Admin Features
- **Dashboard** - Sales analytics, revenue charts
- **Product Management** - Add, edit, delete products
- **Order Management** - View and update order status
- **Inventory Tracking** - Stock level monitoring
- **Artisan Management** - Manage artisan profiles
- **Subscription Management** - Handle premium subscriptions

### 🎁 Special Features
- **Gift Cards** - Purchase and redeem gift cards
- **Promo Codes** - Apply discount codes at checkout
- **Subscription Boxes** - Monthly curated artisan boxes
- **Artisan Spotlight** - Featured artisan profiles

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| Vite | Build Tool |
| TailwindCSS | Styling |
| Framer Motion | Animations |
| GSAP | Advanced Animations |
| React Router | Navigation |
| Zustand | State Management |
| React Query | Data Fetching |
| Clerk | Authentication |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Auth Tokens |
| Stripe | Payments |
| Cloudinary | Image Storage |
| Nodemailer | Email Service |

---

## 📁 Project Structure

```
artisio/
├── client/                 # Frontend React Application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   │   ├── admin/      # Admin dashboard pages
│   │   │   └── account/    # User account pages
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service functions
│   │   └── config/         # Configuration files
│   └── package.json
│
├── server/                 # Backend Node.js Application
│   ├── config/             # Database & app config
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Helper functions
│   ├── seeds/              # Database seeders
│   └── server.js           # Entry point
│
└── scraper/                # Product data scraper
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Stripe account
- Clerk account
- Cloudinary account

### 1. Clone the Repository
```bash
git clone https://github.com/kumardhruv88/Artisio.git
cd Artisio
```

### 2. Setup Backend
```bash
cd server
npm install

# Create .env file (copy from .env.example)
cp .env.example .env
# Fill in your environment variables

npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install

# Create .env file (copy from .env.example)
cp .env.example .env
# Fill in your environment variables

npm run dev
```

### 4. Access the Application
- Frontend: `http://localhost:3002`
- Backend API: `http://localhost:5000`

---

## 🔐 Environment Variables

### Backend (`server/.env`)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:3002
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email
EMAIL_PASSWORD=your_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

---

## 📡 API Endpoints

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/:id` | Update product (Admin) |
| DELETE | `/api/products/:id` | Delete product (Admin) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Get current user |
| PUT | `/api/users/profile` | Update profile |
| GET | `/api/users/orders` | Get user orders |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order |
| GET | `/api/orders/:id` | Get order details |
| GET | `/api/orders/track/:id` | Track order |

### Cart & Wishlist
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get cart |
| POST | `/api/cart/add` | Add to cart |
| GET | `/api/wishlist` | Get wishlist |
| POST | `/api/wishlist/add` | Add to wishlist |

---

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

| Service | Platform |
|---------|----------|
| Backend | Railway |
| Frontend | Vercel |
| Database | MongoDB Atlas |
| Images | Cloudinary |

---

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Home Page
*Beautiful hero section with featured products*

### Product Listing
*Filterable product grid with smooth animations*

### Product Details
*Detailed product view with reviews*

### Shopping Cart
*Clean cart interface with promo codes*

### Admin Dashboard
*Comprehensive admin panel with analytics*

</details>

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Dhruv Kumar**
- GitHub: [@kumardhruv88](https://github.com/kumardhruv88)

---

<div align="center">

**Made with ❤️ and lots of ☕**

</div>
