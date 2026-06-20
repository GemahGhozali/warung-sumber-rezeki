"use client";

import moment from "moment";
import Link from "next/link";
import { formatCurrency } from "@/utils/format-currency";
import { CashflowHistory } from "@/features/shift/types";
import { Minus, Plus } from "lucide-react";
import { RoundArrowLeftDown, RoundArrowRightUp } from "@solar-icons/react-perf/Bold";

interface CahsflowHistoryCardProps {
  history: CashflowHistory;
  onClick?: () => void;
}

export default function CahsflowHistoryCard({ history, onClick }: CahsflowHistoryCardProps) {
  const isIncome = history.type === "INCOME" || history.type === "TRANSACTION";

  const containerClassName = "bg-white flex items-center gap-3 p-3 border border-neutral-300 rounded-xl cursor-pointer";

  const CardContent = (
    <>
      <div className={`grid place-content-center size-[50px] rounded-full ${isIncome ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>{isIncome ? <RoundArrowLeftDown size={24} /> : <RoundArrowRightUp size={24} />}</div>
      <div className="space-y-1">
        <h5 className="font-semibold text-sm">{history.label}</h5>
        <p className="text-neutral-500 text-xs">{moment(history.createdAt).format("DD/MM/YYYY, HH:mm A")}</p>
      </div>
      <div className={`ml-auto flex items-center gap-1 text-sm font-semibold ${isIncome ? "text-green-500" : "text-red-500"}`}>
        {isIncome ? <Plus size={16} strokeWidth={2.5} /> : <Minus size={16} strokeWidth={2.5} />}
        <span>{formatCurrency(history.amount)}</span>
      </div>
    </>
  );

  if (history.type === "TRANSACTION") {
    return (
      <Link href={`/transaksi/${history.id}`} className={containerClassName}>
        {CardContent}
      </Link>
    );
  }

  return (
    <li className={containerClassName} onClick={onClick}>
      {CardContent}
    </li>
  );
}
