"use client";

import CartItem from "./cart-item";
import { useCartStore } from "@/features/transaction/stores";

export default function CartList() {
  const { cart } = useCartStore();

  return (
    <ul className="space-y-4 grow overflow-y-auto">
      {cart.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
