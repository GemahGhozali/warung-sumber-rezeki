"use client";

import CartEmptyState from "@/features/kasir/components/cart-empty-state";
import CartList from "@/features/kasir/components/cart-list";
import CustomMenuModalButton from "@/features/kasir/components/custom-menu-modal-button";
import OrderSummary from "@/features/kasir/components/order-summary";
import { useCartStore } from "@/features/transaction/stores";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const { cart } = useCartStore();

  if (cart.length === 0) return <CartEmptyState />;

  return (
    <div className="p-4 h-dvh flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <Link href="/kasir" className="grid place-content-center rounded-full size-10 border border-neutral-300">
          <ChevronLeft />
        </Link>
        <h3 className="text-xl font-semibold">Detail Pemesanan</h3>
        <CustomMenuModalButton />
      </div>
      <CartList />
      <OrderSummary />
    </div>
  );
}
