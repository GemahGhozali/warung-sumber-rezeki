import moment from "moment";
import { formatCurrency } from "@/utils/format-currency";
import { getTransactionById } from "@/features/transaction/queries";

interface TransactionDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function TransactionDetailsPage({ params }: TransactionDetailsPageProps) {
  const { id } = await params;
  const trasaction = await getTransactionById(id);

  if (!trasaction) throw new Error("Data transaksi tidak ditemukan");

  return (
    <div className="p-4">
      <p className="text-neutral-500 mb-2 font-semibold">Informasi Transaksi</p>
      <div className="p-3 border border-neutral-300 rounded-lg space-y-3 mb-8">
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Karyawan</p>
          <p className="text-sm font-semibold">{trasaction.employee}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Tanggal Transaksi</p>
          <p className="text-sm font-semibold">{moment(trasaction.createdAt).format("DD/MM/YYYY, HH:mm A")}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Total Item</p>
          <p className="text-sm font-semibold">{trasaction.totalItem}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Total Harga</p>
          <p className="text-sm font-semibold">{formatCurrency(trasaction.totalPrice)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Total Pembayaran</p>
          <p className="text-sm font-semibold">{formatCurrency(trasaction.totalPayment)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold">Total Kembalian</p>
          <p className="text-sm font-semibold">{formatCurrency(trasaction.totalChange)}</p>
        </div>
      </div>

      <p className="text-neutral-500 mb-2 font-semibold">Item Transaksi</p>
      <ul className="space-y-4">
        {trasaction.transactionDetails.map((item) => (
          <li key={item.id} className="flex justify-between items-end p-3 border border-neutral-300 rounded-lg">
            <div className="space-y-1">
              <h6 className="font-semibold">
                {item.menuName} ({item.quantity}x)
              </h6>
              <p className="text-sm text-neutral-500 font-semibold">{formatCurrency(item.price)}</p>
            </div>
            <p className="text-teal-600 font-semibold text-sm">{formatCurrency(item.subtotal)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
