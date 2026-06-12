"use client";

import Link from "next/link";
import { Role } from "@/generated/prisma/enums";
import { House, Printer, ScrollText, Wallet, Crown, LayoutGrid, User, Utensils, Clock } from "lucide-react";
import { usePathname } from "next/navigation";

const homeNavlinks = [
  { href: "/home", label: "Home", icon: House },
  { href: "/kasir", label: "Kasir", icon: Printer },
  { href: "/transaksi", label: "Transaksi", icon: ScrollText },
  { href: "/arus-kas", label: "Arus Kas", icon: Wallet },
  { href: "/dashboard", label: "Admin", icon: Crown },
];

const dashboardNavlinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/user", label: "Akun", icon: User },
  { href: "/dashboard/menu", label: "Menu", icon: Utensils },
  { href: "/dashboard/shift", label: "Shift", icon: Clock },
  { href: "/home", label: "Home", icon: House },
];

interface BottomNavigationBarProps {
  role: Role;
}

export default function BottomNavigationBar({ role }: BottomNavigationBarProps) {
  const pathname = usePathname();

  const currentNavlinks = pathname.startsWith("/dashboard") ? dashboardNavlinks : homeNavlinks;

  const filteredNavlinks = currentNavlinks.filter((link) => {
    if (role !== Role.ADMIN && link.href === "/dashboard") return false;
    return true;
  });

  const hideBottomNavigationBar = !filteredNavlinks.some((link) => link.href === pathname);

  if (hideBottomNavigationBar) return null;

  return (
    <nav className="shrink-0 rounded-t-3xl bg-white shadow-sm border-t border-neutral-100">
      <menu className="flex py-5">
        {filteredNavlinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link key={link.href} href={link.href} className="flex-1 flex flex-col items-center justify-center gap-2">
              <Icon size={20} className={isActive ? "text-black" : "text-neutral-400"} />
              <span className={isActive ? "text-sm font-semibold text-black" : "text-sm text-neutral-400"}>{link.label}</span>
            </Link>
          );
        })}
      </menu>
    </nav>
  );
}
