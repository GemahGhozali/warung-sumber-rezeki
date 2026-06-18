"use client";

import moment from "moment";
import Link from "next/link";
import { ShiftHistory } from "../types";
import { User, ClockCircle } from "@solar-icons/react-perf/BoldDuotone";
import { formatCurrency } from "@/utils/format-currency";

interface ShiftCardProps {
  shift: ShiftHistory;
}

export default function ShiftCard({ shift }: ShiftCardProps) {
  const cashDifference = shift.cashDifference ?? 0;
  const cashDifferenceColor = cashDifference > 0 ? "text-green-500 before:content-['+_']" : cashDifference < 0 ? "text-red-500 before:content-['-_']" : "text-black";

  return (
    <Link href={`/dashboard/shift/${shift.id}`} key={shift.id} className="p-3 bg-white border border-neutral-300 rounded-2xl block space-y-3">
      <div className="w-full flex items-center gap-3">
        <div className="bg-teal-100/60 size-[50px] rounded-full grid place-content-center">
          <ClockCircle size={24} color="#009689" />
        </div>
        <div className="space-y-0.5">
          <h6 className="font-semibold">{moment(shift.createdAt).format("DD/MM/YYYY")}</h6>
          <p className="text-neutral-500 text-sm flex items-center gap-1.5">
            <User size={20} color="#009689" />
            {shift.employee}
          </p>
        </div>
        <div className={` ml-auto px-3 py-2 rounded-full text-xs font-semibold leading-none lowercase first-letter:capitalize ${shift.status === "OPEN" ? "bg-green-100 text-green-500" : "bg-neutral-100 text-neutral-500"}`}>
          {shift.status === "OPEN" ? "Buka" : "Tutup"}
        </div>
      </div>
      <hr className="border-neutral-300" />
      <div className="flex justify-between items-center">
        <p className="text-neutral-500 font-semibold text-sm">Selisih Kas :</p>
        <p className={`font-semibold text-sm ${cashDifferenceColor}`}>{formatCurrency(Math.abs(cashDifference))}</p>
      </div>
    </Link>
  );
}
