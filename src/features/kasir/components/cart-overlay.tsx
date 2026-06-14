"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/features/transaction/stores";
import { formatCurrency } from "@/utils/format-currency";

export default function CartOverlay() {
  const { cart, getTotalPrice } = useCartStore();

  if (cart.length === 0) return null;

  return (
    <Link href={`/kasir/checkout`} className="absolute inset-x-4 bottom-4 p-3 pr-4 bg-neutral-800 rounded-full flex items-center gap-3">
      <div className="grid place-content-center bg-teal-600 text-white rounded-full size-10">
        <ShoppingCart size={20} strokeWidth={2.5} />
      </div>
      <div className="space-y-0.5">
        <h6 className="font-medium text-sm text-white">{cart.length} Total Item</h6>
        <p className="text-xs text-neutral-300">Klik untuk lihat detail</p>
      </div>
      <h6 className="ml-auto text-sm text-white font-semibold">{formatCurrency(getTotalPrice())}</h6>
    </Link>
  );
}
