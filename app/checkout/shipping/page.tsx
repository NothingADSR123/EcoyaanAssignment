import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutStepper from "@/components/CheckoutStepper";
import ShippingForm from "@/components/ShippingForm";

export default function ShippingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-stone-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <CheckoutStepper />

          <h1 className="text-3xl font-bold text-stone-900 mb-8">
            Shipping Address
          </h1>

          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-8 border border-stone-200">
              <ShippingForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
