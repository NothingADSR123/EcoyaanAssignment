"use client";

import { useRouter } from "next/navigation";
import { useCheckout } from "@/app/context/CheckoutContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutStepper from "@/components/CheckoutStepper";
import CartItem from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import PaymentSummary from "@/components/PaymentSummary";
import { calculateSubtotal, calculateGrandTotal } from "@/lib/calculations";
import { useEffect } from "react";

export default function PaymentPage() {
  const router = useRouter();
  const { cartItems, shippingAddress, shippingFee, discountApplied } =
    useCheckout();

  useEffect(() => {
    if (!shippingAddress || cartItems.length === 0) {
      router.push("/cart");
    }
  }, [shippingAddress, cartItems, router]);

  if (!shippingAddress || cartItems.length === 0) {
    return null;
  }

  const subtotal = calculateSubtotal(cartItems);
  const grandTotal = calculateGrandTotal(subtotal, shippingFee, discountApplied);

  const handlePayment = () => {
    router.push("/success");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-stone-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <CheckoutStepper />

          <h1 className="text-3xl font-bold text-stone-900 mb-8">
            Payment Confirmation
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <PaymentSummary shippingAddress={shippingAddress} />

              <div>
                <h3 className="font-semibold text-stone-900 mb-4">
                  Order Items
                </h3>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem key={item.product_id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            <div>
              <OrderSummary
                subtotal={subtotal}
                shippingFee={shippingFee}
                discount={discountApplied}
                grandTotal={grandTotal}
              />
              <button
                onClick={handlePayment}
                className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors mt-4"
              >
                Pay Securely
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
