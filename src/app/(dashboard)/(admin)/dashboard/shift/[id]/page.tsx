import TransactionSummary from "@/features/shift/components/transaction-summary";
import ShiftInformation from "@/features/shift/components/shift-information";
import CashflowSummary from "@/features/shift/components/cashflow-summary";
import ShiftDetailsHeader from "@/features/shift/components/shift-details-header";
import { getShiftById } from "@/features/shift/queries";

interface ShiftDetailsPageProps {
  params: Promise<{ id: string }>;
}

export default async function ShiftDetailsPage({ params }: ShiftDetailsPageProps) {
  const { id } = await params;
  const shift = await getShiftById(id);

  if (!shift) throw new Error("Data shift tidak ditemukan");

  return (
    <div className="bg-teal-600">
      <ShiftDetailsHeader shift={shift} />
      <div className="bg-neutral-50 p-4 rounded-t-lg">
        <ShiftInformation shift={shift} />
        <TransactionSummary shift={shift} />
        <CashflowSummary shift={shift} />
      </div>
    </div>
  );
}
