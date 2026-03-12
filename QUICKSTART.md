# Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies
```bash
cd eco-checkout
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Open Browser
Navigate to: `http://localhost:3000`

The app will automatically redirect you to the cart page.

## Test the Checkout Flow

1. **Cart Page** - Review the pre-loaded cart items
2. Click "Proceed to Checkout"
3. **Shipping Page** - Fill in the form:
   - Full Name: John Doe
   - Email: john@example.com
   - Phone: 1234567890
   - PIN Code: 123456
   - City: Mumbai
   - State: Maharashtra
4. Click "Continue to Payment"
5. **Payment Page** - Review order and click "Pay Securely"
6. **Success Page** - See confirmation message

## Project Structure Overview

```
eco-checkout/
├── app/
│   ├── api/cart/          # Mock API endpoint
│   ├── cart/              # Cart page (SSR)
│   ├── checkout/
│   │   ├── shipping/      # Shipping form
│   │   └── payment/       # Payment confirmation
│   ├── success/           # Success page
│   └── context/           # State management
├── components/            # Reusable UI components
└── lib/                   # Utility functions
```

## Key Features

✅ Server-Side Rendering (SSR)
✅ Form Validation
✅ State Management (Context API)
✅ Responsive Design
✅ TypeScript
✅ Tailwind CSS v4

## Build for Production

```bash
npm run build
npm run start
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel dashboard for automatic deployments.

---

Need help? Check the main README.md for detailed documentation.
