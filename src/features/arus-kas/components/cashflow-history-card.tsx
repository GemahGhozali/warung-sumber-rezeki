import moment from "moment";
import { formatCurrency } from "@/utils/format-currency";
import { CashflowHistory } from "@/features/shift/types";
import { Minus, Plus } from "lucide-react";

interface CahsflowHistoryCardProps {
  history: CashflowHistory;
}

export default function CahsflowHistoryCard({ history }: CahsflowHistoryCardProps) {
  return (
    <li className="flex justify-between items-center p-3 border border-neutral-300 rounded-lg">
      <div>
        <h5 className="font-semibold text-sm mb-1">{history.label}</h5>
        <p className="text-neutral-500 text-xs">{moment(history.createdAt).format("DD/MM/YYYY, HH:mm A")}</p>
      </div>
      <div className={`flex items-center gap-1 text-sm font-semibold ${history.type === "INCOME" ? "text-green-500" : "text-red-500"}`}>
        {history.type === "INCOME" ? <Plus size={16} strokeWidth={2.5} /> : <Minus size={16} strokeWidth={2.5} />}
        <span>{formatCurrency(history.amount)}</span>
      </div>
    </li>
  );
}
