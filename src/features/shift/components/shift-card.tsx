"use client";

import moment from "moment";
import Link from "next/link";
import { ShiftHistory } from "../types";
import { User, ClockCircle } from "@solar-icons/react-perf/BoldDuotone";

interface ShiftCardProps {
  shift: ShiftHistory;
}

export default function ShiftCard({ shift }: ShiftCardProps) {
  return (
    <Link href={`/dashboard/shift/${shift.id}`} key={shift.id} className="p-3 bg-white border border-neutral-300 rounded-2xl flex items-center gap-3">
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
    </Link>
  );
}
