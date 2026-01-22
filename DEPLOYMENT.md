# 🚀 Artisio Deployment Guide

This guide covers deploying Artisio to **Railway** (backend) and **Vercel** (frontend).

---

## 📋 Prerequisites

- GitHub account with the Artisio repository
- Railway account ([railway.app](https://railway.app))
- Vercel account ([vercel.com](https://vercel.com))
- Your environment variable values ready (from your local `.env` files)

---

## Step 1: Deploy Backend to Railway

### 1.1 Connect to Railway

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your **Artisio** repository
4. Railway will detect it's a Node.js app

### 1.2 Configure Root Directory

Since your backend is in the `server/` folder:

1. Go to your service **Settings**
2. Under **Source**, set **Root Directory** to: `server`
3. Railway will now use `server/package.json`

### 1.3 Add Environment Variables

Go to **Variables** tab and add ALL of these (copy values from your local `server/.env`):

```
NODE_ENV=production
PORT=5000
MONGODB_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
FRONTEND_URL=https://your-app.vercel.app

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<your_email>
EMAIL_PASSWORD=<your_app_password>
EMAIL_FROM=ARTISIO <your_email>

CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>

STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>

CLERK_WEBHOOK_SECRET=<your_clerk_webhook_secret>
```

> 📝 **Tip**: Copy the actual values from your local `server/.env` file

### 1.4 Deploy

1. Railway will automatically deploy when you push to GitHub
2. Once deployed, go to **Settings** → **Networking** → **Generate Domain**
3. Copy your Railway URL (e.g., `https://artisio-server-production.up.railway.app`)

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your **Artisio** repository

### 2.2 Configure Build Settings

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `client` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

### 2.3 Add Environment Variables

Add these in **Environment Variables** section:

```
VITE_API_URL=https://your-railway-backend-url.up.railway.app
VITE_CLERK_PUBLISHABLE_KEY=<your_clerk_publishable_key>
VITE_STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>
```

> ⚠️ **Important**: Replace `your-railway-backend-url` with your actual Railway URL from Step 1.4

### 2.4 Deploy

1. Click **"Deploy"**
2. Wait for build to complete
3. Copy your Vercel URL (e.g., `https://artisio.vercel.app`)

---

## Step 3: Update CORS (Critical!)

After both are deployed, update Railway's `FRONTEND_URL`:

1. Go to Railway dashboard → Your project → **Variables**
2. Update: `FRONTEND_URL=https://your-app.vercel.app`
3. Railway will automatically redeploy

---

## Step 4: Update Clerk Settings

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Under **Domains**, add your Vercel production URL
3. If using webhooks, update the webhook URL to your Railway backend

---

## 🔧 Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in Railway matches your exact Vercel URL (no trailing slash)

### API Not Connecting
- Check browser console for the API URL being used
- Verify `VITE_API_URL` is set correctly in Vercel

### Authentication Issues
- Verify `VITE_CLERK_PUBLISHABLE_KEY` is correct
- Check Clerk dashboard for allowed domains

---

## 📊 Your Environment Variables Summary

### Railway (Backend)
| Variable | Description |
|----------|-------------|
| `NODE_ENV` | Set to `production` |
| `PORT` | `5000` (Railway uses this) |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Your JWT secret |
| `FRONTEND_URL` | Your Vercel URL |
| `EMAIL_*` | Email configuration |
| `CLOUDINARY_*` | Image upload service |
| `STRIPE_*` | Payment processing |

### Vercel (Frontend)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Your Railway backend URL |
| `VITE_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe public key |

---

## ✅ Deployment Checklist

- [ ] Push code to GitHub
- [ ] Deploy backend to Railway
- [ ] Copy Railway URL
- [ ] Deploy frontend to Vercel with Railway URL
- [ ] Copy Vercel URL
- [ ] Update Railway's FRONTEND_URL with Vercel URL
- [ ] Update Clerk allowed domains
- [ ] Test the live site!
