import Link from "next/link";
import TransactionHistory from "@/features/transaction/components/transaction-history";
import { Notes } from "@solar-icons/react-perf/BoldDuotone";
import { getAllTransactionsInActiveShift } from "@/features/transaction/queries";
import { Plus } from "lucide-react";

export default async function TransaksiPage() {
  const transactions = await getAllTransactionsInActiveShift();

  if (!transactions) return null;

  if (transactions.length === 0) {
    return (
      <div className="p-4 h-full flex flex-col justify-center items-center">
        <div className="bg-teal-100/50 size-[60px] shrink-0 rounded-full grid place-content-center mb-3">
          <Notes size={32} color="#009689" />
        </div>
        <h6 className="font-semibold mb-0.5">Belum ada transaksi apapun</h6>
        <p className="text-neutral-500 text-sm mb-3">Silahkan ke menu kasir untuk membuat transaksi</p>
        <Link href="/kasir" className="flex items-center gap-1.5 bg-teal-600 p-1.5 pl-3 pr-1.5 text-white text-sm rounded-lg font-medium cursor-pointer leading-6">
          Buat transaksi <Plus size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Riwayat Transaksi</h1>
      <p className="text-sm text-neutral-500 mb-3">Lihat semua transaksi selama sesi operasional</p>
      <TransactionHistory transactions={transactions} />
    </div>
  );
}
