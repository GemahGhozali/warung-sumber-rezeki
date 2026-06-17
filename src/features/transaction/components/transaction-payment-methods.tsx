import { TransactionDetails } from "../types";

interface TransactionPaymentMethodsProps {
  transaction: TransactionDetails;
}

export default function TransactionPaymentMethods({ transaction }: TransactionPaymentMethodsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      <div className={`p-6 rounded-lg relative overflow-hidden ${transaction.paymentMethod === "TUNAI" ? "ring-2 ring-teal-600 bg-teal-50 text-teal-600" : "ring ring-neutral-300 text-neutral-500"}`}>
        <p className="font-semibold text-xl">Tunai</p>
        <img src="/images/cash.png" className="w-[90px] absolute right-0.5 -bottom-8" />
      </div>
      <div className={`p-6 rounded-lg relative overflow-hidden ${transaction.paymentMethod === "TRANSFER" ? "ring-2 ring-teal-600 bg-teal-50 text-teal-600" : "ring ring-neutral-300 text-neutral-500"}`}>
        <p className="font-semibold text-xl">Transfer</p>
        <img src="/images/transfer.png" className="w-[90px] absolute -right-3 -bottom-6" />
      </div>
    </div>
  );
}
