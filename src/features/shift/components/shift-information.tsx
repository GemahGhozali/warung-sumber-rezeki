import moment from "moment";
import { ShiftDetails } from "../types";
import { User, InfoCircle, AlarmPlay, AlarmRemove } from "@solar-icons/react-perf/BoldDuotone";

interface ShiftInformationProps {
  shift: ShiftDetails;
}

export default function ShiftInformation({ shift }: ShiftInformationProps) {
  return (
    <>
      <p className="text-neutral-500 mb-2 font-semibold">Informasi Shift</p>
      <div className="p-3 bg-white border border-neutral-300 rounded-lg space-y-3 mb-8">
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <InfoCircle size={20} color="#009689" /> Status Shift
          </p>
          <div className={` ml-auto px-2 py-1.5 rounded-full text-xs font-semibold leading-none lowercase first-letter:capitalize ${shift.status === "OPEN" ? "bg-green-100 text-green-500" : "bg-neutral-100 text-neutral-500"}`}>
            {shift.status === "OPEN" ? "Buka" : "Tutup"}
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <User size={20} color="#009689" /> Karyawan
          </p>
          <p className="text-sm font-semibold">{shift.employee}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <AlarmPlay size={20} color="#009689" /> Waktu Buka
          </p>
          <p className="text-sm font-semibold">{moment(shift.openingTime).format("DD/MM/YYYY, HH:mm A")}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <AlarmRemove size={20} color="#009689" /> Waktu Tutup
          </p>
          <p className="text-sm font-semibold">{shift.closingTime ? moment(shift.closingTime).format("DD/MM/YYYY, HH:mm A") : "-"}</p>
        </div>
      </div>
    </>
  );
}
