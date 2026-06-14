import TransactionHistoryCard from "./transaction-history-card";
import { getAllTransactionsInActiveShift } from "@/features/transaction/queries";

export default async function TransactionHistory() {
  const transactions = await getAllTransactionsInActiveShift();

  if (!transactions) return null;

  return (
    <ul className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionHistoryCard key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  );
}
