import { getActiveShift, getActiveShiftCashflowHistory, getAllShifts, getShiftById } from "./queries";

export type ActiveShift = NonNullable<Awaited<ReturnType<typeof getActiveShift>>>;
export type ShiftHistory = NonNullable<Awaited<ReturnType<typeof getAllShifts>>>[number];
export type CashflowHistory = NonNullable<Awaited<ReturnType<typeof getActiveShiftCashflowHistory>>>[number];
export type ShiftDetails = NonNullable<Awaited<ReturnType<typeof getShiftById>>>;
