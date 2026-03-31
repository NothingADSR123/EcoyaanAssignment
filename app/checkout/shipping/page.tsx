import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutStepper from "@/components/CheckoutStepper";
import ShippingForm from "@/components/ShippingForm";

export default function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-stone-50 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto px-4">
          <CheckoutStepper />

          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-6 sm:mb-8">
            Shipping Address
          </h1>

          <div className="max-w-3xl mx-auto">
            <ShippingForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
