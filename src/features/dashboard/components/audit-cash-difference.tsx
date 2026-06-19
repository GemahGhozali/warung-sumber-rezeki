import moment from "moment";
import { ShiftAuditCashDifference } from "../types";
import { CardTransfer } from "@solar-icons/react-perf/BoldDuotone";
import { MinusCircle } from "@solar-icons/react-perf/Bold";
import { formatCurrency } from "@/utils/format-currency";
import Link from "next/link";

interface AuditCashDifferenceProps {
  shifts: ShiftAuditCashDifference[];
}

export default function AuditCashDifference({ shifts }: AuditCashDifferenceProps) {
  console.log(shifts);
  return (
    <div className="p-4 bg-white border border-neutral-300 rounded-2xl">
      <h6 className="font-semibold">Audit Selisih Kas Shift</h6>
      {shifts.length === 0 ? (
        <div className="mt-3 p-4 pt-6 flex flex-col justify-center items-center border rounded-lg border-neutral-300 border-dashed">
          <div className="bg-teal-100/50 size-[60px] shrink-0 rounded-full grid place-content-center mb-2">
            <CardTransfer size={32} className="text-teal-600" />
          </div>
          <h6 className="font-semibold mb-0.5">Tidak ada data selisih kas</h6>
          <p className="text-neutral-500 text-sm">Selisih kas dari tiap shift akan muncul di sini</p>
        </div>
      ) : (
        shifts.map((shift) => (
          <Link key={shift.id} href={`/dashboard/shift/${shift.id}`} className="flex items-center gap-2 py-4 border-b border-neutral-300 last:border-b-0 last:pb-0">
            <img src={shift.image || "/images/avatar-placeholder.png"} alt={shift.employee} className="size-[35px]" />
            <div>
              <h6 className="text-sm font-semibold">{shift.employee}</h6>
              <p className="text-neutral-500 text-xs">{moment(shift.shiftDate).locale("id").format("dddd, DD MMMM YYYY")}</p>
            </div>
            <div className="ml-auto text-end">
              <p className="text-xs">Selisih Kas</p>
              <h6 className={`font-semibold text-sm ml-auto ${shift.cashDifference < 0 ? "text-red-500 before:content-['-_']" : "text-green-500 before:content-['+_']"}`}>{formatCurrency(Math.abs(shift.cashDifference))}</h6>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
