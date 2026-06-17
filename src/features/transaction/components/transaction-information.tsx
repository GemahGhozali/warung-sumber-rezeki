import moment from "moment";
import { formatCurrency } from "@/utils/format-currency";
import { User, Calendar, CartLarge2, Banknote2, CashOut } from "@solar-icons/react-perf/BoldDuotone";
import { TransactionDetails } from "../types";

interface TransactionInformationProps {
  transaction: TransactionDetails;
}

export default function TransactionInformation({ transaction }: TransactionInformationProps) {
  return (
    <>
      <p className="text-neutral-500 mb-2 font-semibold">Informasi Transaksi</p>
      <div className="p-3 border border-neutral-300 rounded-lg space-y-3 mb-8">
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <User size={20} color="#009689" /> Karyawan
          </p>
          <p className="text-sm font-semibold">{transaction.employee}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <Calendar size={20} color="#009689" /> Tanggal Transaksi
          </p>
          <p className="text-sm font-semibold">{moment(transaction.createdAt).format("DD/MM/YYYY, HH:mm A")}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <CartLarge2 size={20} color="#009689" /> Total Item
          </p>
          <p className="text-sm font-semibold">{transaction.totalItem}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <Banknote2 size={20} color="#009689" /> Total Harga
          </p>
          <p className="text-sm font-semibold">{formatCurrency(transaction.totalPrice)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <Banknote2 size={20} color="#009689" /> Total Pembayaran
          </p>
          <p className="text-sm font-semibold">{formatCurrency(transaction.totalPayment)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <CashOut size={20} color="#009689" /> Total Kembalian
          </p>
          <p className={`text-sm font-semibold ${transaction.totalChange > 0 ? "text-red-500 before:content-['-_']" : "text-black"}`}>{formatCurrency(transaction.totalChange)}</p>
        </div>
      </div>
    </>
  );
}
