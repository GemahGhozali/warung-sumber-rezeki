"use client";

import Link from "next/link";
import { Edit, Trash2Icon } from "lucide-react";
import { Menu } from "@/generated/prisma/client";
import { startTransition } from "react";
import { deleteMenuAction } from "../actions";

interface MenuCardProps {
  menu: Pick<Menu, "id" | "name" | "price" | "image">;
}

export default function MenuCard({ menu }: MenuCardProps) {
  const handleDelete = () => {
    const isConfirmed = confirm(`Apakah Anda yakin ingin menghapus menu "${menu.name}"?`);
    if (!isConfirmed) return;

    startTransition(async () => {
      const response = await deleteMenuAction(menu.id);
      if (response && !response.success) alert(response.message);
    });
  };

  return (
    <li key={menu.id} className="flex items-center gap-3">
      <img src={menu.image || "/images/menu-placeholder.png"} alt={menu.name} className="size-[45px] rounded-full object-cover" />
      <div>
        <h6 className="font-semibold">{menu.name}</h6>
        <p className="text-neutral-500 text-sm">{menu.price}</p>
      </div>
      <div className="flex gap-2 ml-auto">
        <Link href={`/menu/${menu.id}/edit`} className="size-9 grid place-content-center bg-teal-50 text-teal-600 rounded-lg">
          <Edit size={16} />
        </Link>
        <button className="size-9 grid place-content-center bg-red-50 text-red-600 rounded-lg cursor-pointer" onClick={handleDelete}>
          <Trash2Icon size={16} />
        </button>
      </div>
    </li>
  );
}
