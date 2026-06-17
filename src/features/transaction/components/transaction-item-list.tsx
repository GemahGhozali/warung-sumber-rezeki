import { TransactionDetails } from "../types";
import TransactionItemCard from "./transaction-item-card";

interface TransactionItemListProps {
  transaction: TransactionDetails;
}

export default function TransactionItemList({ transaction }: TransactionItemListProps) {
  return (
    <>
      <p className="text-neutral-500 mb-2 font-semibold">Item Transaksi</p>
      <ul className="space-y-4">
        {transaction.transactionDetails.map((item) => (
          <TransactionItemCard key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}
