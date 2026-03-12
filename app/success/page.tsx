import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutStepper from "@/components/CheckoutStepper";

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-stone-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <CheckoutStepper />

          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="bg-white rounded-lg p-12 border border-stone-200 shadow-sm">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-stone-900 mb-4">
                Order Successful!
              </h1>

              <p className="text-lg text-stone-600 mb-8">
                Thank you for choosing sustainable products 🌱
              </p>

              <p className="text-stone-600 mb-8">
                Your order has been placed successfully. You will receive a
                confirmation email shortly.
              </p>

              <Link
                href="/cart"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
