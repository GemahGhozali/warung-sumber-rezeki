import { getTransactionById } from "@/features/transaction/queries";
import TransactionDetails from "@/features/transaction/components/transaction-details";

interface TransactionDetailsPageProps {
  params: Promise<{ id: string; transactionId: string }>;
}

export default async function TransactionDetailsPage({ params }: TransactionDetailsPageProps) {
  const { transactionId } = await params;

  console.log(transactionId);

  const transaction = await getTransactionById(transactionId);

  if (!transaction) throw new Error("Data transaksi tidak ditemukan");

  return <TransactionDetails transaction={transaction} />;
}
