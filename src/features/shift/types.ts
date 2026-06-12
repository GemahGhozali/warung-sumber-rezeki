import { getActiveShift, getActiveShiftCashflow, getAllShifts } from "./queries";

export type ActiveShift = NonNullable<Awaited<ReturnType<typeof getActiveShift>>>;
export type ShiftHistory = NonNullable<Awaited<ReturnType<typeof getAllShifts>>>[number];
export type ShiftCashflow = NonNullable<Awaited<ReturnType<typeof getActiveShiftCashflow>>>;
