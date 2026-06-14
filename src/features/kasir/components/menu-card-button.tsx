"use client";

import { Plus } from "lucide-react";
import { CashierMenu } from "@/features/menu/types";
import { useCartStore } from "@/features/transaction/stores";
import CartItemQuantityChanger from "./quantity-changer";

interface MenuCardButtonProps {
  menu: CashierMenu;
}

export default function MenuCardButton({ menu }: MenuCardButtonProps) {
  const { getCartItemByMenuId, addToCart } = useCartStore();

  const handleAddItem = () => addToCart({ id: menu.id, menuName: menu.name, price: menu.price, hpp: menu.hpp, image: menu.image });

  const item = getCartItemByMenuId(menu.id);

  if (!item) {
    return (
      <button className="flex items-center gap-1.5 bg-teal-600 p-1.5 pl-3 pr-1.5 text-white text-sm rounded-lg font-medium cursor-pointer" onClick={handleAddItem}>
        Tambah <Plus size={16} />
      </button>
    );
  }

  return <CartItemQuantityChanger item={item} />;
}
