"use client";

import { useEffect } from "react";
import { useCheckout } from "@/app/context/CheckoutContext";

interface CartInitializerProps {
  cartData: {
    cartItems: any[];
    shipping_fee: number;
    discount_applied: number;
  };
}

export default function CartInitializer({ cartData }: CartInitializerProps) {
  const { setCartItems, setShippingFee, setDiscountApplied } = useCheckout();

  useEffect(() => {
    setCartItems(cartData.cartItems);
    setShippingFee(cartData.shipping_fee);
    setDiscountApplied(cartData.discount_applied);
  }, [cartData, setCartItems, setShippingFee, setDiscountApplied]);

  return null;
}
