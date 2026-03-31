"use client";

import { usePathname } from "next/navigation";

const steps = [
  { name: "Cart", path: "/cart" },
  { name: "Shipping", path: "/checkout/shipping" },
  { name: "Payment", path: "/checkout/payment" },
  { name: "Success", path: "/success" },
];

export default function CheckoutStepper() {
  const pathname = usePathname();

  const currentStepIndex = steps.findIndex((step) => step.path === pathname);

  return (
    <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.name} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-semibold text-sm sm:text-base transition-all ${
                  index <= currentStepIndex
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-stone-200 text-stone-500"
                }`}
              >
                {index < currentStepIndex ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`text-xs sm:text-sm mt-1.5 sm:mt-2 text-center ${
                  index <= currentStepIndex
                    ? "text-green-700 font-medium"
                    : "text-stone-500"
                }`}
              >
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 sm:h-1 flex-1 mx-1 sm:mx-2 transition-all ${
                  index < currentStepIndex ? "bg-green-600" : "bg-stone-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
