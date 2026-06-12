import moment from "moment";
import { getShiftById } from "@/features/shift/queries";
import { formatCurrency } from "@/utils/format-currency";
import { Minus, Plus } from "lucide-react";

interface ShiftDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShiftDetailsPage({ params }: ShiftDetailsPageProps) {
  const { id } = await params;
  const shift = await getShiftById(id);

  if (!shift) throw new Error("Data shift tidak ditemukan");

  return (
    <div className="p-4">
      <p className="text-neutral-500 mb-2 font-semibold">Informasi Shift</p>
      <div className="p-3 border border-neutral-300 rounded-lg space-y-3 mb-8">
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Status Shift</p>
          <p className="text-sm font-semibold">{shift.status === "OPEN" ? "Buka" : "Tutup"}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Karyawan</p>
          <p className="text-sm font-semibold">{shift.employee}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Waktu Buka</p>
          <p className="text-sm font-semibold">{moment(shift.openingTime).format("DD/MM/YYYY, HH:mm A")}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Waktu Tutup</p>
          <p className="text-sm font-semibold">{shift.closingTime ? moment(shift.closingTime).format("DD/MM/YYYY, HH:mm A") : "-"}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Total Transaksi</p>
          <p className="text-sm font-semibold">{shift.totalTransactions}</p>
        </div>
      </div>

      <p className="text-neutral-500 mb-2 font-semibold">Ringkasan Penjualan</p>
      <div className="p-3 border border-neutral-300 rounded-lg space-y-3 mb-8">
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Total Transaksi</p>
          <p className="text-sm font-semibold">{shift.totalTransactions}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Total Transaksi Tunai</p>
          <p className="text-sm font-semibold">{shift.totalCashTransaction}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Total Transaksi Transfer</p>
          <p className="text-sm font-semibold">{shift.totalTransferTransaction}</p>
        </div>
      </div>

      <p className="text-neutral-500 mb-2 font-semibold">Aliran Kas</p>
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
        <hr className="border-neutral-300" />
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Kas Yang Tercatat</p>
          <p className="text-sm font-semibold">{formatCurrency(shift.expectedCash)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Kas Yang Sebenarnya</p>
          <p className="text-sm font-semibold">{shift.actualCash ? formatCurrency(shift.actualCash) : "-"}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Selisih Kas</p>
          <p className="text-sm font-semibold">{shift.cashDifference ? formatCurrency(shift.cashDifference) : "-"}</p>
        </div>
      </div>
    </div>
  );
}
