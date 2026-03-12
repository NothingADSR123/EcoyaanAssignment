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
    <div className="max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.name} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  index <= currentStepIndex
                    ? "bg-green-600 text-white"
                    : "bg-stone-200 text-stone-500"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={`text-xs mt-2 ${
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
                className={`h-1 flex-1 mx-2 ${
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
