import moment from "moment";
import { formatCurrency } from "@/utils/format-currency";
import { TransactionHistory } from "@/features/transaction/types";
import { Plus } from "lucide-react";
import Link from "next/link";

interface TransactionHistoryCardProps {
  transaction: TransactionHistory;
}

export default function TransactionHistoryCard({ transaction }: TransactionHistoryCardProps) {
  return (
    <Link href={`transaksi/${transaction.id}`} className="flex justify-between items-center p-3 border border-neutral-300 rounded-lg">
      <div>
        <h5 className="font-semibold text-sm mb-1">Transaksi {transaction.paymentMethod === "TUNAI" ? "Tunai" : "Transfer"}</h5>
        <p className="text-neutral-500 text-xs">{moment(transaction.createdAt).format("DD/MM/YYYY, HH:mm A")}</p>
      </div>
      <div className="flex items-center gap-1 text-sm font-semibold text-teal-600">
        <Plus size={16} strokeWidth={2.5} />
        <span>{formatCurrency(transaction.totalPrice)}</span>
      </div>
    </Link>
  );
}
