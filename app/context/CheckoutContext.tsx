"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  pinCode: string;
  city: string;
  state: string;
}

interface CheckoutContextType {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress | null;
  shippingFee: number;
  discountApplied: number;
  setCartItems: (items: CartItem[]) => void;
  setShippingAddress: (address: ShippingAddress) => void;
  setShippingFee: (fee: number) => void;
  setDiscountApplied: (discount: number) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [shippingAddress, setShippingAddress] =
    useState<ShippingAddress | null>(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(0);

  return (
    <CheckoutContext.Provider
      value={{
        cartItems,
        shippingAddress,
        shippingFee,
        discountApplied,
        setCartItems,
        setShippingAddress,
        setShippingFee,
        setDiscountApplied,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (context === undefined) {
    throw new Error("useCheckout must be used within a CheckoutProvider");
  }
  return context;
}
