import { getAllTransactionsInActiveShift, getTransactionById } from "./queries";

export type TransactionHistory = NonNullable<Awaited<ReturnType<typeof getAllTransactionsInActiveShift>>>[number];
export type TransactionDetails = NonNullable<Awaited<ReturnType<typeof getTransactionById>>>;
export type TransactionDetailsItem = TransactionDetails["transactionDetails"][number];
