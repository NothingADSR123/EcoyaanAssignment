import { CartItem } from "@/app/context/CheckoutContext";

export function calculateSubtotal(cartItems: CartItem[]): number {
  return cartItems.reduce(
    (sum, item) => sum + item.product_price * item.quantity,
    0
  );
}

export function calculateGrandTotal(
  subtotal: number,
  shippingFee: number,
  discount: number
): number {
  return subtotal + shippingFee - discount;
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toFixed(2)}`;
}
