import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutStepper from "@/components/CheckoutStepper";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { calculateSubtotal, calculateGrandTotal } from "@/lib/calculations";
import CartInitializer from "@/app/cart/CartInitializer";

async function getCartData() {
  // Use environment variable for production URL
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "http://localhost:3000";

  const res = await fetch(`${baseUrl}/api/cart`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch cart data");
  }

  return res.json();
}

export default async function CartPage() {
  const cartData = await getCartData();
  const subtotal = calculateSubtotal(cartData.cartItems);
  const grandTotal = calculateGrandTotal(
    subtotal,
    cartData.shipping_fee,
    cartData.discount_applied
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-stone-50 py-6 sm:py-8 pb-32">
        <div className="max-w-6xl mx-auto px-4">
          <CheckoutStepper />

          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6 sm:mb-8">
            Your Cart ({cartData.cartItems.length} {cartData.cartItems.length === 1 ? 'item' : 'items'})
          </h1>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartData.cartItems.map((item: any) => (
                <CartItem key={item.product_id} item={item} />
              ))}
            </div>

            <div className="lg:sticky lg:top-8 h-fit">
              <OrderSummary
                subtotal={subtotal}
                shippingFee={cartData.shipping_fee}
                discount={cartData.discount_applied}
                grandTotal={grandTotal}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
      
      {/* Sticky Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-lg z-50 lg:hidden">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link
            href="/checkout/shipping"
            className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm"
          >
            Proceed to Checkout - ₹{grandTotal.toFixed(2)}
          </Link>
        </div>
      </div>
      
      {/* Desktop Button */}
      <div className="hidden lg:block fixed bottom-8 right-8 z-50">
        <Link
          href="/checkout/shipping"
          className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
        >
          Proceed to Checkout
        </Link>
      </div>
      
      <CartInitializer cartData={cartData} />
    </div>
  );
}
