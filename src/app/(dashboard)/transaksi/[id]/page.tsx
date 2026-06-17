import { getTransactionById } from "@/features/transaction/queries";
import TransactionDetailsHeader from "@/features/transaction/components/transaction-details-header";
import TransactionPaymentMethods from "@/features/transaction/components/transaction-payment-methods";
import TransactionInformation from "@/features/transaction/components/transaction-information";
import TransactionItemList from "@/features/transaction/components/transaction-item-list";

interface TransactionDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function TransactionDetailsPage({ params }: TransactionDetailsPageProps) {
  const { id } = await params;
  const transaction = await getTransactionById(id);

  if (!transaction) throw new Error("Data transaksi tidak ditemukan");

  return (
    <div className="bg-teal-600">
      <TransactionDetailsHeader transaction={transaction} />
      <div className="p-4 bg-neutral-50 rounded-t-xl">
        <TransactionPaymentMethods transaction={transaction} />
        <TransactionInformation transaction={transaction} />
        <TransactionItemList transaction={transaction} />
      </div>
    </div>
  );
}
