"use client";

import Link from "next/link";
import { Edit, Trash2Icon } from "lucide-react";
import { formatCurrency } from "@/utils/format-currency";
import { MenuCatalogItem } from "../types";

interface MenuCardProps {
  menu: MenuCatalogItem;
  onDelete: () => void;
}

export default function MenuCard({ menu, onDelete }: MenuCardProps) {
  return (
    <li key={menu.id} className="flex items-center gap-3 p-3 bg-white border border-neutral-300 rounded-2xl">
      <img src={menu.image || "/images/menu-placeholder.png"} alt={menu.name} className="size-[50px] rounded-full object-cover border border-neutral-300" />
      <div className="space-y-0.5">
        <h6 className="font-semibold">{menu.name}</h6>
        <p className="text-neutral-500 text-sm">{formatCurrency(menu.price)}</p>
      </div>
      <div className="flex gap-2 ml-auto">
        <Link href={`/dashboard/menu/${menu.id}/edit`} className="size-9 grid place-content-center bg-teal-100/50 text-teal-600 rounded-full">
          <Edit size={16} />
        </Link>
        <button className="size-9 grid place-content-center bg-red-100/50 text-red-600 rounded-full cursor-pointer" onClick={onDelete}>
          <Trash2Icon size={16} />
        </button>
      </div>
    </li>
  );
}
