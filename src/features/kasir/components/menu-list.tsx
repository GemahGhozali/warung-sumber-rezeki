"use client";

import { useCartStore } from "@/features/transaction/stores";
import { useSearchParams } from "next/navigation";
import { CashierMenu } from "@/features/menu/types";
import { Box } from "@solar-icons/react-perf/BoldDuotone";
import MenuCard from "./menu-card";

interface MenuListProps {
  menus: CashierMenu[];
}

export default function MenuList({ menus }: MenuListProps) {
  const { cart } = useCartStore();

  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const filteredMenusByCategory = menus.filter((menu) => (!currentCategory ? true : menu.category === currentCategory));
  const filteredMenusBySearchQuery = filteredMenusByCategory.filter((menu) => (!searchQuery ? true : menu.name.toLowerCase().includes(searchQuery.toLowerCase())));

  // Jika tidak ada menu yang berhasil ditemukan
  if (searchQuery && filteredMenusBySearchQuery.length === 0) {
    return (
      <div className="p-4 grow overflow-y-auto scrollbar-hidden flex flex-col justify-center items-center">
        <div className="bg-teal-100/60 size-[60px] rounded-full grid place-content-center mb-3">
          <Box size={32} color="#009689" />
        </div>
        <h6 className="font-semibold">Menu tidak ditemukan</h6>
        <p className="text-neutral-500 text-sm">Tidak ada menu dengan nama '{searchQuery}'</p>
      </div>
    );
  }

  // Jika memang belum ada data menu
  if (filteredMenusBySearchQuery.length === 0) {
    return (
      <div className="p-4 grow overflow-y-auto scrollbar-hidden flex flex-col justify-center items-center">
        <div className="bg-teal-100/60 size-[60px] rounded-full grid place-content-center mb-3">
          <Box size={32} color="#009689" />
        </div>
        <h6 className="font-semibold">Belum ada menu apapun</h6>
        <p className="text-neutral-500 text-sm">Silahkan tambahkan menu terlebih dahulu</p>
      </div>
    );
  }

  return (
    <div className="grow overflow-y-auto scrollbar-hidden">
      <ul>
        {filteredMenusBySearchQuery.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
        {cart.length > 0 && <div className="h-[76px]"></div>}
      </ul>
    </div>
  );
}
