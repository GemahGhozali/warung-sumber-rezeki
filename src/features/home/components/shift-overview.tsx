import moment from "moment";
import { ActiveShift } from "@/features/shift/types";
import { User, InfoCircle, ClockCircle, CartLarge2 } from "@solar-icons/react-perf/BoldDuotone";

interface ShiftOverviewProps {
  shift: ActiveShift;
}

export default function ShiftOverview({ shift }: ShiftOverviewProps) {
  return (
    <>
      <h4 className="text-xl font-semibold mt-8">Shift Toko</h4>
      <p className="text-sm text-neutral-500 mb-3">Informasi seputar shift operasional saat ini</p>
      <div className="p-3 bg-white border border-neutral-300 rounded-lg space-y-3">
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <User size={20} color="#009689" /> Karyawan
          </p>
          <p className="text-sm font-semibold">{shift.employee}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <InfoCircle size={20} color="#009689" /> Status Toko
          </p>
          <p className="text-sm font-semibold">{shift.status === "OPEN" ? "Buka" : "Tutup"}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <ClockCircle size={20} color="#009689" /> Waktu Buka
          </p>
          <p className="text-sm font-semibold">{moment(shift.openingTime).format("DD/MM/YYYY, HH:mm A")}</p>
        </div>
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
