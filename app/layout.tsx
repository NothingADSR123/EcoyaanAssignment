import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CheckoutProvider } from "./context/CheckoutContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eco Checkout - Sustainable Shopping",
  description: "Checkout flow for eco-friendly products",
  icons: {
    icon: "https://prod-cdn.ecoyaan.com/pb-cs-app/images/ecoyaan-favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CheckoutProvider>{children}</CheckoutProvider>
      </body>
    </html>
  );
}
