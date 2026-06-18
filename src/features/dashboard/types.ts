import { getProfitLossReport } from "./queries";

export type ProfitLossReport = NonNullable<Awaited<ReturnType<typeof getProfitLossReport>>>;
