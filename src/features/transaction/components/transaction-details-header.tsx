import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Notes } from "@solar-icons/react-perf/BoldDuotone";
import { TransactionDetails } from "../types";
import { formatCurrency } from "@/utils/format-currency";

interface TransactionDetailsHeaderProps {
  transaction: TransactionDetails;
}

export default function TransactionDetailsHeader({ transaction }: TransactionDetailsHeaderProps) {
  return (
    <>
      <div className="p-4 mb-4 flex justify-between items-center">
        <Link href="/transaksi" className="bg-white grid place-content-center shrink-0 rounded-full size-10 border border-neutral-300 text-neutral-500">
          <ArrowLeft size={24} />
        </Link>
        <h5 className="text-xl text-white font-semibold">Detail Transaksi</h5>
        <div className="size-10"></div>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="size-20 bg-teal-100 grid place-content-center rounded-full text-4xl leading-none mb-4">
          <Notes size={40} color="#009689" />
        </div>
        <p className="text-neutral-200 mb-1">Total Keseluruhan</p>
        <h5 className="text-3xl font-semibold text-white">{formatCurrency(transaction.totalPrice)}</h5>
      </div>
    </>
  );
}
