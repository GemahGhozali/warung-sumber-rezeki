import { TransactionHistory } from "../types";
import TransactionHistoryCard from "./transaction-history-card";

interface TransactionHistoriesProps {
  transactions: TransactionHistory[];
}

export default async function TransactionHistories({ transactions }: TransactionHistoriesProps) {
  return (
    <ul className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionHistoryCard key={transaction.id} transaction={transaction} />
      ))}
    </ul>
  );
}
