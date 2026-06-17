import TransactionHistoryCard from "@/features/transaction/components/transaction-history-card";
import { getLastTransactionsInActiveShift } from "@/features/transaction/queries";
import Link from "next/link";
import { Notes } from "@solar-icons/react-perf/BoldDuotone";

export default async function LastTransactionHistory() {
  const transactions = await getLastTransactionsInActiveShift();

  if (!transactions) return null;

  return (
    <>
      <div className="flex justify-between items-end mb-4">
        <div>
          <h4 className="text-xl font-semibold mt-8">Transaksi</h4>
          <p className="text-sm text-neutral-500">Riwayat transaksi terakhir</p>
        </div>
        <Link href="/transaksi" className="bg-teal-600 py-1.5 px-3 text-white text-sm font-medium leading-6 cursor-pointer rounded-full">
          Lihat Semua
        </Link>
      </div>
      {transactions.length === 0 ? (
        <div className="p-6 flex flex-col justify-center items-center border rounded-2xl border-neutral-300 border-dashed">
          <div className="bg-teal-100/50 size-[60px] shrink-0 rounded-full grid place-content-center mb-3">
            <Notes size={32} color="#009689" />
          </div>
          <h6 className="font-semibold mb-0.5">Belum ada transaksi apapun</h6>
          <p className="text-neutral-500 text-sm">Silahkan ke menu kasir untuk membuat transaksi</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {transactions.map((transaction) => (
            <TransactionHistoryCard key={transaction.id} transaction={transaction} />
          ))}
        </ul>
      )}
    </>
  );
}
