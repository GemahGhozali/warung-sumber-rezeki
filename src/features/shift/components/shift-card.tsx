"use client";

import moment from "moment";
import Link from "next/link";
import { ShiftHistory } from "../types";

interface CategoryCardProps {
  shift: ShiftHistory;
}

export default function CategoryCard({ shift }: CategoryCardProps) {
  return (
    <Link href={`/dashboard/shift/${shift.id}`} key={shift.id} className="p-3 bg-white border border-neutral-300 rounded-lg flex items-center justify-between">
      <div className="space-y-1">
        <h6 className="font-semibold">{moment(shift.createdAt).format("DD/MM/YYYY")}</h6>
        <p className="text-neutral-500 text-sm">{shift.employee}</p>
      </div>
      <div className={`px-3 py-2 rounded-full text-xs font-semibold leading-none lowercase first-letter:capitalize ${shift.status === "OPEN" ? "bg-green-100 text-green-500" : "bg-neutral-100 text-neutral-500"}`}>{shift.status}</div>
    </Link>
  );
}
