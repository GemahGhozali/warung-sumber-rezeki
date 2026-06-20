"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ShiftCashflowHistoryHeaderProps {}

export default function ShiftCashflowHistoryHeader({}: ShiftCashflowHistoryHeaderProps) {
  const router = useRouter();

  return (
    <div className="p-4 pb-0">
      <button onClick={() => router.back()} className="bg-white grid place-content-center shrink-0 rounded-full size-10 border border-neutral-300 mb-6 cursor-pointer">
        <ArrowLeft size={24} />
      </button>
      <h5 className="text-xl font-semibold mb-0.5">Riwayat Arus Kas</h5>
      <p className="text-sm text-neutral-500">Lacak pemasukan dan pengeluaran pada sesi shift</p>
    </div>
  );
}
