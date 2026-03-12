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
      <main className="flex-1 bg-stone-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <CheckoutStepper />

          <h1 className="text-3xl font-bold text-stone-900 mb-8">
            Your Cart
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cartData.cartItems.map((item: any) => (
                <CartItem key={item.product_id} item={item} />
              ))}
            </div>

            <div>
              <OrderSummary
                subtotal={subtotal}
                shippingFee={cartData.shipping_fee}
                discount={cartData.discount_applied}
                grandTotal={grandTotal}
              />
              <Link
                href="/checkout/shipping"
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-4"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartInitializer cartData={cartData} />
    </div>
  );
}
