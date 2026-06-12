"use client";

import { usePathname } from "next/navigation";
import ShiftEmptyState from "./shift-empty-state";

interface ShiftGateProps {
  children: React.ReactNode;
  isShiftActive: boolean;
}

export default function ShiftGate({ children, isShiftActive }: ShiftGateProps) {
  const pathname = usePathname();

  const allowAccess = pathname.startsWith("/dashboard") ? true : isShiftActive;
  if (!allowAccess) return <ShiftEmptyState />;

  return <>{children}</>;
}
