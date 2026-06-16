import { Minus, Plus } from "lucide-react";
import { Banknote2, WalletMoney } from "@solar-icons/react-perf/BoldDuotone";
import { RoundArrowLeftDown, RoundArrowRightUp } from "@solar-icons/react-perf/Bold";
import { formatCurrency } from "@/utils/format-currency";
import { ActiveShift } from "@/features/shift/types";

interface CashflowOverviewProps {
  shift: ActiveShift;
}

export default function CashflowOverview({ shift }: CashflowOverviewProps) {
  return (
    <>
      <h4 className="text-xl font-semibold mt-8">Aliran Kas</h4>
      <p className="text-sm text-neutral-500 mb-3">Informasi singkat seputar mutasi aliran kas</p>
      <div className="p-3 bg-white border border-neutral-300 rounded-lg space-y-3">
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <Banknote2 size={20} color="#009689" /> Modal Awal
          </p>
          <p className="text-sm font-semibold text-neutral-500">{formatCurrency(shift.initialCapital)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <RoundArrowLeftDown size={20} color="#00c950" /> Total Pemasukan
          </p>
          <p className={`text-sm font-semibold flex items-center gap-1 ${shift.totalIncomes > 0 ? "text-green-500" : "text-neutral-500"}`}>
            {shift.totalIncomes > 0 && <Plus size={16} strokeWidth={2.25} />}
            <span>{formatCurrency(shift.totalIncomes)}</span>
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <RoundArrowRightUp size={20} color="#e7000b" /> Total Pengeluaran
          </p>
          <p className={`text-sm font-semibold flex items-center gap-1 ${shift.totalOutcomes > 0 ? "text-red-500" : "text-neutral-500"}`}>
            {shift.totalOutcomes > 0 && <Minus size={16} strokeWidth={2.25} />}
            <span>{formatCurrency(shift.totalOutcomes)}</span>
          </p>
        </div>
        <hr className="border-neutral-300" />
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <WalletMoney size={20} color="#009689" /> Kas Yang Tercatat
          </p>
          <p className="text-sm font-semibold">{formatCurrency(shift.expectedCash)}</p>
        </div>
      </div>
    </>
  );
}
