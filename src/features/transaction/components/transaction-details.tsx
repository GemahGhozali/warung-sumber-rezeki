import TransactionDetailsHeader from "./transaction-details-header";
import TransactionInformation from "./transaction-information";
import TransactionItemList from "./transaction-item-list";
import TransactionPaymentMethods from "./transaction-payment-methods";
import { TransactionDetails as TransactionDetailsType } from "../types";

interface TransactionDetailProps {
  transaction: TransactionDetailsType;
}

export default function TransactionDetails({ transaction }: TransactionDetailProps) {
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
