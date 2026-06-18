"use client";

import Link from "next/link";
import { Role } from "@/generated/prisma/enums";
import { HomeAngle2, Printer2, Notes, WalletMoney, Crown, PieChart2, User, Box, ClockCircle } from "@solar-icons/react-perf/BoldDuotone";
import { usePathname } from "next/navigation";

const homeNavlinks = [
  { href: "/home", label: "Home", icon: HomeAngle2 },
  { href: "/kasir", label: "Kasir", icon: Printer2 },
  { href: "/transaksi", label: "Transaksi", icon: Notes },
  { href: "/arus-kas", label: "Arus Kas", icon: WalletMoney },
  { href: "/dashboard", label: "Admin", icon: Crown },
];

const dashboardNavlinks = [
  { href: "/dashboard", label: "Laporan", icon: PieChart2 },
  { href: "/dashboard/user", label: "Akun", icon: User },
  { href: "/dashboard/menu", label: "Menu", icon: Box },
  { href: "/dashboard/shift", label: "Shift", icon: ClockCircle },
  { href: "/home", label: "Home", icon: HomeAngle2 },
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
    <nav className="shrink-0 rounded-t-3xl bg-white shadow-[0px_0px_12px_0px_rgba(0,_0,_0,_0.1)] z-50">
      <menu className="flex py-5">
        {filteredNavlinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link key={link.href} href={link.href} className={`flex-1 flex flex-col items-center justify-center gap-2 ${isActive ? "text-teal-600 font-semibold" : "text-neutral-400"}`}>
              <Icon size={24} />
              <span className="text-sm">{link.label}</span>
            </Link>
          );
        })}
      </menu>
    </nav>
  );
}
