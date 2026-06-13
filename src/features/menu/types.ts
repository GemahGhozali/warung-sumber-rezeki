import { getMenusForCashier } from "./queries";

export type CashierMenu = NonNullable<Awaited<ReturnType<typeof getMenusForCashier>>>[number];
