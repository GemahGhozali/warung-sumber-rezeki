import { getShiftAuditCashDifference, getProfitLossReport } from "./queries";

export type ProfitLossReport = NonNullable<Awaited<ReturnType<typeof getProfitLossReport>>>;
export type ShiftAuditCashDifference = NonNullable<Awaited<ReturnType<typeof getShiftAuditCashDifference>>>[number];
