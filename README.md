# 🛒 UltraMart AI — Full-Stack Multi-Vendor E-Commerce Marketplace

> A professional global marketplace powered by AI — similar to Amazon, Daraz, and Shopify.

## 📁 Project Structure

```
ultramart-ai/
├── backend/          # Node.js + Express REST API
├── frontend/         # Next.js customer-facing store
├── admin-dashboard/  # Next.js admin panel
├── seller-dashboard/ # Next.js seller panel
└── database/         # MongoDB schemas & seed data
```

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm or yarn

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env   # Edit with your values
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

### 3. Seller Dashboard
```bash
cd seller-dashboard
npm install
npm run dev
```

### 4. Admin Dashboard
```bash
cd admin-dashboard
npm install
npm run dev
```

## 🔑 Default Credentials

| Role       | Email                    | Password    |
|------------|--------------------------|-------------|
| Super Admin| superadmin@ultramart.com | Admin@12345 |
| Admin      | admin@ultramart.com      | Admin@12345 |
| Seller     | seller@ultramart.com     | Seller@1234 |
| Customer   | customer@ultramart.com   | User@123456 |

## 🌐 Running Ports

| Service          | Port |
|------------------|------|
| Backend API      | 5000 |
| Frontend         | 3000 |
| Seller Dashboard | 3001 |
| Admin Dashboard  | 3002 |

## 🤖 AI Features
- Smart product recommendations
- Personalized homepage
- AI-powered search
- Fraud detection
- AI chatbot (customer support)

## 💳 Payment Methods
- Cash on Delivery
- Credit/Debit Cards (Stripe)
- JazzCash
- Easypaisa

## 🛡️ Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt
- **AI**: OpenAI API
- **Payments**: Stripe
- **Storage**: Cloudinary (images)
