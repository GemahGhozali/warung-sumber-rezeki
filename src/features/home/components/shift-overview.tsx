import moment from "moment";
import { formatCurrency } from "@/utils/format-currency";
import { ActiveShift } from "@/features/shift/types";
import { Minus, Plus } from "lucide-react";

interface ShiftOverviewProps {
  shift: ActiveShift;
}

export default function ShiftOverview({ shift }: ShiftOverviewProps) {
  return (
    <div className="mt-8">
      <h4 className="text-xl font-semibold">Shift Toko</h4>
      <p className="text-sm text-neutral-500 mb-3">Informasi seputar shift operasional saat ini</p>
      <div className="p-3 border border-neutral-300 rounded-lg space-y-3 mb-8">
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Karyawan</p>
          <p className="text-sm font-semibold">{shift.employee}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Status Toko</p>
          <p className="text-sm font-semibold">{shift.status === "OPEN" ? "Buka" : "Tutup"}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Waktu Buka</p>
          <p className="text-sm font-semibold">{moment(shift.openingTime).format("HH:mm A")}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Total Transaksi</p>
          <p className="text-sm font-semibold">{shift.totalTransactions}</p>
        </div>
      </div>

      <h4 className="text-xl font-semibold">Aliran Kas</h4>
      <p className="text-sm text-neutral-500 mb-3">Informasi singkat seputar mutasi aliran kas</p>
      <div className="p-3 border border-neutral-300 rounded-lg space-y-3">
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Modal Awal</p>
          <p className="text-sm font-semibold text-neutral-500">{formatCurrency(shift.initialCapital)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Total Pemasukan</p>
          <p className={`text-sm font-semibold flex items-center gap-1 ${shift.totalIncomes > 0 ? "text-green-500" : "text-neutral-500"}`}>
            {shift.totalIncomes > 0 && <Plus size={16} strokeWidth={2.25} />}
            <span>{formatCurrency(shift.totalIncomes)}</span>
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Total Pemasukan</p>
          <p className={`text-sm font-semibold flex items-center gap-1 ${shift.totalOutcomes > 0 ? "text-red-500" : "text-neutral-500"}`}>
            {shift.totalOutcomes > 0 && <Minus size={16} strokeWidth={2.25} />}
            <span>{formatCurrency(shift.totalOutcomes)}</span>
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Total Kembalian</p>
          <p className={`text-sm font-semibold flex items-center gap-1 ${shift.totalChanges > 0 ? "text-red-500" : "text-neutral-500"}`}>
            {shift.totalChanges > 0 && <Minus size={16} strokeWidth={2.25} />}
            <span>{formatCurrency(shift.totalChanges)}</span>
          </p>
        </div>
        <hr className="border-neutral-300" />
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Kas Yang Tercatat</p>
          <p className="text-sm font-semibold">{formatCurrency(shift.expectedCash)}</p>
        </div>
      </div>
    </div>
  );
}
