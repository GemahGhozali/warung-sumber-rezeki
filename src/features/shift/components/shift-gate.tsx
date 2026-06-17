"use client";

import { usePathname } from "next/navigation";
import ShiftEmptyState from "./shift-empty-state";

interface ShiftGateProps {
  children: React.ReactNode;
  isShiftActive: boolean;
  userName: string;
}

export default function ShiftGate({ children, isShiftActive, userName }: ShiftGateProps) {
  const pathname = usePathname();

  const allowAccess = pathname.startsWith("/dashboard") ? true : isShiftActive;
  if (!allowAccess) return <ShiftEmptyState userName={userName} />;

  return <>{children}</>;
}
