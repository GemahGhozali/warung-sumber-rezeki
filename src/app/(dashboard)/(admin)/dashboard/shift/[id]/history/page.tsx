import CashflowHistories from "@/features/arus-kas/components/cashflow-histories";
import ShiftCashflowHistoryHeader from "@/features/shift/components/shift-cashflow-history-header";
import { getShiftCashflowHistory } from "@/features/shift/queries";

interface ShiftCashflowHistoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShiftCashflowHistoryPage({ params }: ShiftCashflowHistoryPageProps) {
  const { id } = await params;

  const cashflow = await getShiftCashflowHistory(id);

  return (
    <div className="flex flex-col h-full">
      <ShiftCashflowHistoryHeader />
      <div className="p-4 grow">
        <CashflowHistories cashflow={cashflow} />
      </div>
    </div>
  );
}
