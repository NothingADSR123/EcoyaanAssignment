import { ShippingAddress } from "@/app/context/CheckoutContext";

interface PaymentSummaryProps {
  shippingAddress: ShippingAddress;
}

export default function PaymentSummary({
  shippingAddress,
}: PaymentSummaryProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-stone-200">
      <h3 className="font-semibold text-stone-900 mb-4">Shipping Address</h3>
      <div className="space-y-2 text-stone-700">
        <p className="font-medium">{shippingAddress.fullName}</p>
        <p>{shippingAddress.email}</p>
        <p>{shippingAddress.phone}</p>
        <p>
          {shippingAddress.city}, {shippingAddress.state} -{" "}
          {shippingAddress.pinCode}
        </p>
      </div>
    </div>
  );
}
