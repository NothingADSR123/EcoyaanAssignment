import { formatCurrency } from "@/lib/calculations";

interface OrderSummaryProps {
  subtotal: number;
  shippingFee: number;
  discount: number;
  grandTotal: number;
}

export default function OrderSummary({
  subtotal,
  shippingFee,
  discount,
  grandTotal,
}: OrderSummaryProps) {
  return (
    <div className="bg-stone-50 rounded-lg p-6 border border-stone-200">
      <h2 className="text-lg font-semibold text-stone-900 mb-4">
        Order Summary
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between text-stone-700">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-stone-700">
          <span>Shipping Fee</span>
          <span>{formatCurrency(shippingFee)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-{formatCurrency(discount)}</span>
          </div>
        )}
        <div className="border-t border-stone-300 pt-3 mt-3">
          <div className="flex justify-between text-lg font-bold text-stone-900">
            <span>Grand Total</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
