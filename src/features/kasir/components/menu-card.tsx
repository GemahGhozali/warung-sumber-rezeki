"use client";

import { CashierMenu } from "@/features/menu/types";
import { formatCurrency } from "@/utils/format-currency";
import MenuCardButtons from "./menu-card-button";

interface MenuCardProps {
  menu: CashierMenu;
}

export default function MenuCard({ menu }: MenuCardProps) {
  return (
    <li className="p-4 first:border-t-0 border-t border-neutral-300 flex items-center gap-4">
      <img src={menu.image || "/images/menu-placeholder.png"} alt={menu.name} className="size-[60px] rounded-full border border-neutral-300" />
      <div className="space-y-1 mr-auto">
        <h5 className="font-semibold">{menu.name}</h5>
        <p className="text-neutral-500 font-semibold text-sm">{formatCurrency(menu.price)}</p>
      </div>
      <MenuCardButtons menu={menu} />
    </li>
  );
}
