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
  const { cartItems, selectedAddress, shippingFee, discountApplied } =
    useCheckout();

  useEffect(() => {
    if (!selectedAddress || cartItems.length === 0) {
      router.push("/cart");
    }
  }, [selectedAddress, cartItems, router]);

  if (!selectedAddress || cartItems.length === 0) {
    return null;
  }

  const subtotal = calculateSubtotal(cartItems);
  const grandTotal = calculateGrandTotal(subtotal, shippingFee, discountApplied);

  const handlePayment = () => {
    router.push("/success");
  };

  const handleBack = () => {
    router.push("/checkout/shipping");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-stone-50 py-8 pb-32">
        <div className="max-w-6xl mx-auto px-4">
          <CheckoutStepper />

          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6 sm:mb-8">
            Payment Confirmation
          </h1>

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <PaymentSummary shippingAddress={selectedAddress} />

              <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-6">
                <h3 className="font-semibold text-stone-900 mb-4">
                  Order Items ({cartItems.length})
                </h3>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem key={item.product_id} item={item} />
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-8 h-fit">
              <OrderSummary
                subtotal={subtotal}
                shippingFee={shippingFee}
                discount={discountApplied}
                grandTotal={grandTotal}
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={handleBack}
              className="flex-1 sm:flex-none sm:px-8 bg-white border-2 border-stone-300 text-stone-700 py-3 rounded-lg font-semibold hover:bg-stone-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handlePayment}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm"
            >
              Pay Securely ₹{grandTotal.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
