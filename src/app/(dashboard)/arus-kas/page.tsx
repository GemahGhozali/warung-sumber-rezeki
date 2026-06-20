import CashOverview from "@/features/arus-kas/components/cash-overview";
import CashflowHistories from "@/features/arus-kas/components/cashflow-histories";
import { getCurrentUserAndShiftId, getShiftCashflowHistory } from "@/features/shift/queries";

export default async function ArusKasPage() {
  const { shiftId } = await getCurrentUserAndShiftId();

  if (!shiftId) return null;

  const cashflow = await getShiftCashflowHistory(shiftId);

  return (
    <div className="bg-teal-600 h-full flex flex-col">
      <CashOverview />
      <div className="p-4 grow bg-neutral-50 rounded-t-2xl">
        {cashflow.length !== 0 && (
          <>
            <h1 className="text-xl font-semibold mb-0.5">Riwayat Arus Kas</h1>
            <p className="text-neutral-500 text-sm mb-4">Lihat aliran arus kas selama sesi operasional</p>
          </>
        )}
        <CashflowHistories cashflow={cashflow} />
      </div>
    </div>
  );
}
