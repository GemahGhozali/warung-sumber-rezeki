import { getAllTransactionsInActiveShift } from "./queries";

export type TransactionHistory = NonNullable<Awaited<ReturnType<typeof getAllTransactionsInActiveShift>>>[number];
