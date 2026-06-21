import { getTransactionById } from "./queries";
import { getAllTransactionsInActiveShift } from "../shift/queries";

export type TransactionHistory = NonNullable<Awaited<ReturnType<typeof getAllTransactionsInActiveShift>>>[number];
export type TransactionDetails = NonNullable<Awaited<ReturnType<typeof getTransactionById>>>;
export type TransactionDetailsItem = TransactionDetails["transactionDetails"][number];
