import { ShippingAddress } from "@/app/context/CheckoutContext";

interface PaymentSummaryProps {
  shippingAddress: ShippingAddress;
}

export default function PaymentSummary({
  shippingAddress,
}: PaymentSummaryProps) {
  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 border border-stone-200 shadow-sm">
      <h3 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        Shipping Address
      </h3>
      <div className="space-y-2 text-stone-700">
        <p className="font-medium text-stone-900">{shippingAddress.fullName}</p>
        <p className="text-sm">{shippingAddress.address}</p>
        <p className="text-sm">
          {shippingAddress.city}, {shippingAddress.state} - {shippingAddress.pinCode}
        </p>
        <div className="pt-2 mt-2 border-t border-stone-200">
          <p className="text-sm">Phone: {shippingAddress.phone}</p>
          <p className="text-sm">Email: {shippingAddress.email}</p>
        </div>
      </div>
    </div>
  );
}
