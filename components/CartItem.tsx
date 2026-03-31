import Image from "next/image";
import { CartItem as CartItemType } from "@/app/context/CheckoutContext";
import { formatCurrency } from "@/lib/calculations";

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  return (
    <div className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-stone-100 rounded-lg overflow-hidden">
        <Image
          src={item.image}
          alt={item.product_name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-stone-900 text-sm sm:text-base line-clamp-2">{item.product_name}</h3>
        <p className="text-xs sm:text-sm text-stone-600 mt-1">Quantity: {item.quantity}</p>
        <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
          {formatCurrency(item.product_price)} each
        </p>
      </div>
      <div className="text-right flex-shrink-0">
        <p className="font-semibold text-stone-900 text-sm sm:text-base">
          {formatCurrency(item.product_price * item.quantity)}
        </p>
      </div>
    </div>
  );
}
