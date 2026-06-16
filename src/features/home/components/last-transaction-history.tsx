import TransactionHistoryCard from "@/features/transaction/components/transaction-history-card";
import { getLastTransactionsInActiveShift } from "@/features/transaction/queries";
import Link from "next/link";

export default async function LastTransactionHistory() {
  const transactions = await getLastTransactionsInActiveShift();

  if (!transactions) return null;
  return (
    <>
      <div className="flex justify-between items-end mb-3">
        <div>
          <h4 className="text-xl font-semibold mt-8">Transaksi</h4>
          <p className="text-sm text-neutral-500">Riwayat transaksi terakhir</p>
        </div>
        <Link href="/transaksi" className="bg-teal-600 py-2 px-3 text-white text-sm font-medium cursor-pointer leading-none rounded-full">
          Lihat Semua
        </Link>
      </div>
      <ul className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionHistoryCard key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
}
