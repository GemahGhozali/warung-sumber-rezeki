import { getActiveShift } from "@/features/shift/queries";
import ActionButtons from "@/features/home/components/action-buttons";
import ShiftOverview from "@/features/home/components/shift-overview";
import LastTransactionHistory from "@/features/home/components/last-transaction-history";
import CashflowOverview from "@/features/home/components/cashflow-overview";

export default async function HomePage() {
  const shift = await getActiveShift();
  if (!shift) return null;

  return (
    <div className="p-4">
      <ActionButtons shift={shift} />
      <ShiftOverview shift={shift} />
      <CashflowOverview shift={shift} />
      <LastTransactionHistory />
    </div>
  );
}
