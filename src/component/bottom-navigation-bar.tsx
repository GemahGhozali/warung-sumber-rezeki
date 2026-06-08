"use client";

import Link from "next/link";
import { Role } from "@/generated/prisma/enums";
import { House, Printer, ScrollText, Wallet, Crown } from "lucide-react";
import { usePathname } from "next/navigation";

const navlinks = [
  { href: "/home", label: "Home", icon: House },
  { href: "/kasir", label: "Kasir", icon: Printer },
  { href: "/transaksi", label: "Transaksi", icon: ScrollText },
  { href: "/arus-kas", label: "Arus Kas", icon: Wallet },
  { href: "/admin", label: "Admin", icon: Crown },
];

interface BottomNavigationBarProps {
  role: Role;
}

export default function BottomNavigationBar({ role }: BottomNavigationBarProps) {
  const pathname = usePathname();

  const filteredNavlinks = navlinks.filter((link) => (role !== "ADMIN" && link.href === "/admin" ? false : true));

  const hideBottomNavigationBar = !filteredNavlinks.some((link) => link.href === pathname);

  if (hideBottomNavigationBar) return null;

  return (
    <nav className="shrink-0 rounded-t-3xl bg-white shadow-sm">
      <menu className="flex py-5">
        {filteredNavlinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link key={link.href} href={link.href} className="flex-1 flex flex-col items-center justify-center gap-2">
              <Icon size={20} className={isActive ? "text-black" : "text-neutral-500"} />
              <span className={isActive ? "text-sm font-semibold text-black" : "text-sm text-neutral-500"}>{link.label}</span>
            </Link>
          );
        })}
      </menu>
    </nav>
  );
}
