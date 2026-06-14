"use client";

import { Minus, Plus } from "lucide-react";
import { CartItemInput } from "@/features/transaction/schemas";
import { useCartStore } from "@/features/transaction/stores";

interface QuantityChangerProps {
  item: CartItemInput;
}

export default function QuantityChanger({ item }: QuantityChangerProps) {
  const { updateQuantity } = useCartStore();

  const handleDecreaseQuantity = () => updateQuantity(item.id, item.quantity - 1);
  const handleIncreaseQuantity = () => updateQuantity(item.id, item.quantity + 1);

  return (
    <div className="flex">
      <button className="grid place-content-center bg-teal-100 size-8 text-teal-600 text-sm rounded-full font-medium cursor-pointer" onClick={handleDecreaseQuantity}>
        <Minus size={16} />
      </button>
      <div className="size-8 grid place-content-center">{item.quantity}</div>
      <button className="grid place-content-center bg-teal-100 size-8 text-teal-600 text-sm rounded-full font-medium cursor-pointer" onClick={handleIncreaseQuantity}>
        <Plus size={16} />
      </button>
    </div>
  );
}
