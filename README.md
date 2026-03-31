# Eco Checkout Flow - MVP

A minimal, functional checkout experience inspired by Ecoyaan's eco-commerce platform, built with Next.js 14, React, TypeScript, and Tailwind CSS.
<img width="1527" height="748" alt="image" src="https://github.com/user-attachments/assets/9b92145c-c36e-43e4-b4b9-466b6d35ce45" />

## 🌱 Project Overview

This is a simplified checkout flow that demonstrates:
- Server-Side Rendering (SSR) for cart data
- Multi-step checkout process
- Form validation
- State management with React Context
- Responsive design with Tailwind CSS
- Clean component architecture

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: React Context API
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
eco-checkout/
├── app/
│   ├── api/
│   │   └── cart/
│   │       └── route.ts          # Mock API endpoint for cart data
│   ├── cart/
│   │   ├── page.tsx              # Cart page with SSR
│   │   └── CartInitializer.tsx   # Client component to initialize context
│   ├── checkout/
│   │   ├── shipping/
│   │   │   └── page.tsx          # Shipping address form
│   │   └── payment/
│   │       └── page.tsx          # Payment confirmation
│   ├── success/
│   │   └── page.tsx              # Order success page
│   ├── context/
│   │   └── CheckoutContext.tsx   # Global state management
│   ├── layout.tsx                # Root layout with context provider
│   ├── globals.css               # Global styles
│   └── page.tsx                  # Home (redirects to cart)
├── components/
│   ├── Header.tsx                # Site header
│   ├── Footer.tsx                # Site footer
│   ├── CartItem.tsx              # Individual cart item
│   ├── OrderSummary.tsx          # Order totals summary
│   ├── CheckoutStepper.tsx       # Progress indicator
│   ├── ShippingForm.tsx          # Shipping address form with validation
│   └── PaymentSummary.tsx        # Shipping address display
├── lib/
│   └── calculations.ts           # Utility functions for calculations
└── package.json
```

## 🚀 Features

### 1. Server-Side Rendering (SSR)
- Cart data is fetched server-side using Next.js App Router
- Mock API endpoint at `/api/cart` returns cart items
- Data is rendered on the server for better SEO and performance

### 2. Checkout Flow
The application guides users through 4 steps:

1. **Cart Review** (`/cart`)
   - Displays cart items with images, names, quantities, and prices
   - Shows order summary with subtotal, shipping, discount, and grand total
   - "Proceed to Checkout" button

2. **Shipping Address** (`/checkout/shipping`)
   - Form with validation for:
     - Full Name (required)
     - Email (required, valid format)
     - Phone (required, exactly 10 digits)
     - PIN Code (required, numeric)
     - City (required)
     - State (required)
   - Real-time validation feedback
   - Data saved to global state

3. **Payment Confirmation** (`/checkout/payment`)
   - Displays shipping address
   - Shows all cart items
   - Order summary
   - "Pay Securely" button (simulated payment)

4. **Order Success** (`/success`)
   - Success message with icon
   - "Continue Shopping" button

### 3. State Management
- React Context API manages:
  - Cart items
  - Shipping address
  - Shipping fee
  - Discount amount
- State persists across navigation

### 4. Responsive Design
- Mobile-first approach
- Breakpoints: `sm`, `md`, `lg`
- Clean, minimal UI inspired by Ecoyaan
- Soft neutral colors (stone palette)
- Green accent color for eco-friendly theme

### 5. Form Validation
- Client-side validation with error messages
- Email format validation
- Phone number length validation (10 digits)
- PIN code numeric validation
- All fields required

## 🎨 Design Philosophy

The UI follows Ecoyaan's aesthetic:
- **Minimal**: Clean layouts, ample whitespace
- **Eco-friendly**: Green accents, nature-inspired colors
- **Modern**: Rounded corners, subtle shadows
- **Accessible**: Clear typography, good contrast

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Navigate to project directory**
```bash
cd eco-checkout
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
```
http://localhost:3000
```

The app will automatically redirect to `/cart`.

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🌐 Deployment

### Deploy to Vercel

1. Push code to GitHub repository

2. Import project in Vercel dashboard

3. Vercel will auto-detect Next.js and configure build settings

4. Deploy!

Alternatively, use Vercel CLI:
```bash
npm install -g vercel
vercel
```

## 🏗 Architecture Decisions

### Why App Router?
- Modern Next.js approach with better performance
- Server Components by default
- Simplified data fetching
- Better TypeScript support

### Why Context API?
- Lightweight solution for this MVP
- No external dependencies
- Sufficient for small-scale state management
- Easy to understand and maintain

### Why Tailwind CSS v4?
- Utility-first approach for rapid development
- Minimal custom CSS needed
- Built-in responsive design
- Easy to maintain consistent styling

### Component Structure
- **Separation of Concerns**: Each component has a single responsibility
- **Reusability**: Components like `CartItem` and `OrderSummary` are reused
- **Client/Server Split**: Server Components for data fetching, Client Components for interactivity

## 📊 Data Flow

1. **Server-side**: Cart data fetched from API route
2. **Initialization**: `CartInitializer` populates Context
3. **Navigation**: User progresses through checkout steps
4. **State Updates**: Form submissions update Context
5. **Validation**: Client-side validation before navigation
6. **Completion**: Success page confirms order

## 🔒 Security Considerations

For production, consider:
- Server-side form validation
- CSRF protection
- Rate limiting on API routes
- Secure payment gateway integration
- Environment variables for sensitive data

## 🚧 Future Enhancements

- Add Zustand for more complex state management
- Implement actual payment gateway (Stripe, Razorpay)
- Add order history and user authentication
- Implement inventory management
- Add product search and filtering
- Email confirmation system
- Order tracking

## 📝 Notes

- This is an MVP focused on demonstrating frontend skills
- Payment is simulated (no actual payment processing)
- Cart data is mocked (no database)
- No authentication system
- Designed for interview/portfolio purposes

## 📄 License

MIT License - feel free to use this project for learning and portfolio purposes.

## 👨‍💻 Author

Built as a frontend engineering interview assignment demonstrating:
- React/Next.js expertise
- TypeScript proficiency
- State management understanding
- Form handling and validation
- Responsive design skills
- Clean code practices

---

**Happy Coding! 🌱**
