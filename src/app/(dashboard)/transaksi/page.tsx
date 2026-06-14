import TransactionHistory from "@/features/transaction/components/transaction-history";

export default function TransaksiPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Riwayat Transaksi</h1>
      <p className="text-sm text-neutral-500 mb-3">Lihat semua transaksi selama sesi operasional</p>
      <TransactionHistory />
    </div>
  );
}
