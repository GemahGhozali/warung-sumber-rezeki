import { formatCurrency } from "@/utils/format-currency";
import { ShiftDetails } from "../types";
import { Banknote2, WalletMoney } from "@solar-icons/react-perf/BoldDuotone";
import { RoundArrowLeftDown, RoundArrowRightUp, MinusCircle } from "@solar-icons/react-perf/Bold";

interface CashflowSummaryProps {
  shift: ShiftDetails;
}

function getFinalCashDifference(cashDifference: number | null) {
  if (cashDifference === null) return "-";
  if (cashDifference === 0) return "Rp 0";
  if (cashDifference > 0) return `+ ${formatCurrency(cashDifference)}`;
  return `- ${formatCurrency(Math.abs(cashDifference))}`;
}

const getCashDifferenceColor = (cashDifference: number | null) => {
  if (!cashDifference || cashDifference === 0) return "text-black";
  if (cashDifference > 0) return "text-green-500";
  return "text-red-500";
};

export default function CashflowSummary({ shift }: CashflowSummaryProps) {
  return (
    <>
      <p className="text-neutral-500 mb-2 font-semibold">Aliran Kas</p>
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
            {shift.totalIncomes > 0 && "+"}
            <span>{formatCurrency(shift.totalIncomes)}</span>
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <RoundArrowRightUp size={20} color="#e7000b" /> Total Pengeluaran
          </p>
          <p className={`text-sm font-semibold flex items-center gap-1 ${shift.totalOutcomes > 0 ? "text-red-500" : "text-neutral-500"}`}>
            {shift.totalOutcomes > 0 && "-"}
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
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <Banknote2 size={20} color="#00c950" /> Kas Yang Sebenarnya
          </p>
          <p className="text-sm font-semibold">{shift.actualCash ? formatCurrency(shift.actualCash) : "-"}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <MinusCircle size={20} color="#e7000b" /> Selisih Kas
          </p>
          <p className={`text-sm font-semibold ${getCashDifferenceColor(shift.cashDifference)}`}>{getFinalCashDifference(shift.cashDifference)}</p>
        </div>
      </div>
    </>
  );
}
