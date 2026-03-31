"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout, ShippingAddress } from "@/app/context/CheckoutContext";

type FormData = Omit<ShippingAddress, "id" | "isDefault">;

export default function ShippingForm() {
  const router = useRouter();
  const { savedAddresses, selectedAddress, addAddress, selectAddress, deleteAddress } = useCheckout();

  const [showForm, setShowForm] = useState(savedAddresses.length === 0);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    pinCode: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.pinCode.trim()) {
      newErrors.pinCode = "PIN code is required";
    } else if (!/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = "PIN code must be 6 digits";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      addAddress(formData);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        pinCode: "",
        city: "",
        state: "",
      });
      setShowForm(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectAddress = (address: ShippingAddress) => {
    selectAddress(address);
  };

  const handleDeleteAddress = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      deleteAddress(id);
    }
  };

  const handleContinue = () => {
    if (selectedAddress) {
      router.push("/checkout/payment");
    }
  };

  const handleBack = () => {
    router.push("/cart");
  };

  return (
    <div className="space-y-6 pb-32">
      {/* Saved Addresses */}
      {savedAddresses.length > 0 && !showForm && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-stone-900">Saved Addresses</h3>
            <button
              onClick={() => setShowForm(true)}
              className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Address
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-1">
            {savedAddresses.map((address) => (
              <div
                key={address.id}
                className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  selectedAddress?.id === address.id
                    ? "border-green-500 bg-green-50"
                    : "border-stone-200 hover:border-green-300 bg-white"
                }`}
                onClick={() => handleSelectAddress(address)}
              >
                {selectedAddress?.id === address.id && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                
                <div className="pr-8">
                  <p className="font-semibold text-stone-900">{address.fullName}</p>
                  <p className="text-sm text-stone-600 mt-1">{address.address}</p>
                  <p className="text-sm text-stone-600">{address.city}, {address.state} - {address.pinCode}</p>
                  <p className="text-sm text-stone-600 mt-2">Phone: {address.phone}</p>
                  <p className="text-sm text-stone-600">Email: {address.email}</p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteAddress(address.id);
                  }}
                  className="absolute bottom-3 right-3 text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Address Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-stone-900">
              {savedAddresses.length > 0 ? "Add New Address" : "Enter Shipping Address"}
            </h3>
            {savedAddresses.length > 0 && (
              <button
                onClick={() => setShowForm(false)}
                className="text-stone-600 hover:text-stone-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="text-red-600 text-sm mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10 digits"
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="House No., Building Name, Street, Area"
              />
              {errors.address && (
                <p className="text-red-600 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  PIN Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="123456"
                />
                {errors.pinCode && (
                  <p className="text-red-600 text-sm mt-1">{errors.pinCode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Mumbai"
                />
                {errors.city && (
                  <p className="text-red-600 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Maharashtra"
                />
                {errors.state && (
                  <p className="text-red-600 text-sm mt-1">{errors.state}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-sm"
            >
              Save Address
            </button>
          </form>
        </div>
      )}

      {/* Sticky Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 shadow-lg z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-3 sm:gap-4">
            <button
              onClick={handleBack}
              className="flex-1 sm:flex-none sm:px-8 bg-white border-2 border-stone-300 text-stone-700 py-3 rounded-lg font-semibold hover:bg-stone-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={!selectedAddress}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-stone-300 disabled:cursor-not-allowed shadow-sm"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
