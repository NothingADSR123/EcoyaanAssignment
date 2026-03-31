"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  isDefault?: boolean;
}

interface CheckoutContextType {
  cartItems: CartItem[];
  savedAddresses: ShippingAddress[];
  selectedAddress: ShippingAddress | null;
  shippingFee: number;
  discountApplied: number;
  setCartItems: (items: CartItem[]) => void;
  addAddress: (address: Omit<ShippingAddress, "id">) => void;
  updateAddress: (id: string, address: Partial<ShippingAddress>) => void;
  deleteAddress: (id: string) => void;
  selectAddress: (address: ShippingAddress) => void;
  setShippingFee: (fee: number) => void;
  setDiscountApplied: (discount: number) => void;
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

const STORAGE_KEYS = {
  ADDRESSES: "eco_checkout_addresses",
  SELECTED_ADDRESS: "eco_checkout_selected_address",
  CART_ITEMS: "eco_checkout_cart_items",
  SHIPPING_FEE: "eco_checkout_shipping_fee",
  DISCOUNT: "eco_checkout_discount",
};

export function CheckoutProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedAddresses, setSavedAddresses] = useState<ShippingAddress[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<ShippingAddress | null>(null);
  const [shippingFee, setShippingFee] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAddresses = localStorage.getItem(STORAGE_KEYS.ADDRESSES);
      const storedSelectedAddress = localStorage.getItem(STORAGE_KEYS.SELECTED_ADDRESS);
      const storedCartItems = localStorage.getItem(STORAGE_KEYS.CART_ITEMS);
      const storedShippingFee = localStorage.getItem(STORAGE_KEYS.SHIPPING_FEE);
      const storedDiscount = localStorage.getItem(STORAGE_KEYS.DISCOUNT);

      if (storedAddresses) {
        setSavedAddresses(JSON.parse(storedAddresses));
      }
      if (storedSelectedAddress) {
        setSelectedAddress(JSON.parse(storedSelectedAddress));
      }
      if (storedCartItems) {
        setCartItems(JSON.parse(storedCartItems));
      }
      if (storedShippingFee) {
        setShippingFee(JSON.parse(storedShippingFee));
      }
      if (storedDiscount) {
        setDiscountApplied(JSON.parse(storedDiscount));
      }
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.ADDRESSES, JSON.stringify(savedAddresses));
    }
  }, [savedAddresses, isHydrated]);

  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SELECTED_ADDRESS, JSON.stringify(selectedAddress));
    }
  }, [selectedAddress, isHydrated]);

  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.CART_ITEMS, JSON.stringify(cartItems));
    }
  }, [cartItems, isHydrated]);

  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.SHIPPING_FEE, JSON.stringify(shippingFee));
    }
  }, [shippingFee, isHydrated]);

  useEffect(() => {
    if (isHydrated && typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEYS.DISCOUNT, JSON.stringify(discountApplied));
    }
  }, [discountApplied, isHydrated]);

  const addAddress = (address: Omit<ShippingAddress, "id">) => {
    const newAddress: ShippingAddress = {
      ...address,
      id: Date.now().toString(),
      isDefault: savedAddresses.length === 0,
    };
    setSavedAddresses((prev) => [...prev, newAddress]);
    setSelectedAddress(newAddress);
  };

  const updateAddress = (id: string, updates: Partial<ShippingAddress>) => {
    setSavedAddresses((prev) =>
      prev.map((addr) => (addr.id === id ? { ...addr, ...updates } : addr))
    );
    if (selectedAddress?.id === id) {
      setSelectedAddress((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteAddress = (id: string) => {
    setSavedAddresses((prev) => prev.filter((addr) => addr.id !== id));
    if (selectedAddress?.id === id) {
      setSelectedAddress(null);
    }
  };

  const selectAddress = (address: ShippingAddress) => {
    setSelectedAddress(address);
  };

  return (
    <CheckoutContext.Provider
      value={{
        cartItems,
        savedAddresses,
        selectedAddress,
        shippingFee,
        discountApplied,
        setCartItems,
        addAddress,
        updateAddress,
        deleteAddress,
        selectAddress,
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
