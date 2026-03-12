import Image from "next/image";
import { CartItem as CartItemType } from "@/app/context/CheckoutContext";
import { formatCurrency } from "@/lib/calculations";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg border border-stone-200">
      <div className="relative w-20 h-20 flex-shrink-0 bg-stone-100 rounded-md overflow-hidden">
        <Image
          src={item.image}
          alt={item.product_name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-stone-900">{item.product_name}</h3>
        <p className="text-sm text-stone-600 mt-1">Qty: {item.quantity}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-stone-900">
          {formatCurrency(item.product_price * item.quantity)}
        </p>
        <p className="text-sm text-stone-500">
          {formatCurrency(item.product_price)} each
        </p>
      </div>
    </div>
  );
}
