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
    <div className="bg-white rounded-xl p-4 sm:p-6 border border-stone-200 shadow-sm">
      <h2 className="text-lg font-semibold text-stone-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Order Summary
      </h2>
      <div className="space-y-3">
        <div className="flex justify-between text-stone-700 text-sm sm:text-base">
          <span>Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-stone-700 text-sm sm:text-base">
          <span>Shipping Fee</span>
          <span className="font-medium">{formatCurrency(shippingFee)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600 text-sm sm:text-base">
            <span>Discount</span>
            <span className="font-medium">-{formatCurrency(discount)}</span>
          </div>
        )}
        <div className="border-t border-stone-300 pt-3 mt-3">
          <div className="flex justify-between text-base sm:text-lg font-bold text-stone-900">
            <span>Grand Total</span>
            <span className="text-green-600">{formatCurrency(grandTotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
