import moment from "moment";
import { formatCurrency } from "@/utils/format-currency";
import { CashflowHistory } from "@/features/shift/types";
import { Minus, Plus } from "lucide-react";
import { RoundArrowLeftDown, RoundArrowRightUp } from "@solar-icons/react-perf/Bold";

interface CahsflowHistoryCardProps {
  history: CashflowHistory;
}

export default function CahsflowHistoryCard({ history }: CahsflowHistoryCardProps) {
  return (
    <li className="bg-white flex items-center gap-3 p-3 border border-neutral-300 rounded-xl">
      <div className={`grid place-content-center size-[50px] rounded-full ${history.type === "INCOME" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>
        {history.type === "INCOME" ? <RoundArrowLeftDown size={24} /> : <RoundArrowRightUp size={24} />}
      </div>
      <div className="space-y-1">
        <h5 className="font-semibold text-sm">{history.label}</h5>
        <p className="text-neutral-500 text-xs">{moment(history.createdAt).format("DD/MM/YYYY, HH:mm A")}</p>
      </div>
      <div className={`ml-auto flex items-center gap-1 text-sm font-semibold ${history.type === "INCOME" ? "text-green-500" : "text-red-500"}`}>
        {history.type === "INCOME" ? <Plus size={16} strokeWidth={2.5} /> : <Minus size={16} strokeWidth={2.5} />}
        <span>{formatCurrency(history.amount)}</span>
      </div>
    </li>
  );
}
