"use client";

import { useSearchParams } from "next/navigation";
import MenuCard from "./menu-card";
import { CashierMenu } from "@/features/menu/types";

interface MenuListProps {
  menus: CashierMenu[];
}

export default function MenuList({ menus }: MenuListProps) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const filteredMenus = menus.filter((menu) => (!currentCategory ? true : menu.category === currentCategory));

  return (
    <ul>
      {filteredMenus.map((menu) => (
        <MenuCard key={menu.id} menu={menu} />
      ))}
    </ul>
  );
}
