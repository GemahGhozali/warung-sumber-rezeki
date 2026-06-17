import { ShiftDetails } from "../types";
import { Banknote2, CashOut, CartLarge2 } from "@solar-icons/react-perf/BoldDuotone";

interface TransactionSummaryProps {
  shift: ShiftDetails;
}

export default function TransactionSummary({ shift }: TransactionSummaryProps) {
  return (
    <>
      <p className="text-neutral-500 mb-2 font-semibold">Ringkasan Penjualan</p>
      <div className="p-3 bg-white border border-neutral-300 rounded-lg space-y-3 mb-8">
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <Banknote2 size={20} color="#009689" /> Total Transaksi Tunai
          </p>
          <p className="text-sm font-semibold">{shift.totalCashTransaction}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <CashOut size={20} color="#009689" /> Total Transaksi Transfer
          </p>
          <p className="text-sm font-semibold">{shift.totalTransferTransaction}</p>
        </div>
        <hr className="border-neutral-300" />
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <CartLarge2 size={20} color="#009689" /> Total Transaksi
          </p>
          <p className="text-sm font-semibold">{shift.totalTransactions}</p>
        </div>
      </div>
    </>
  );
}
