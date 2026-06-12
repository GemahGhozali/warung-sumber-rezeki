import CahsflowHistoryCard from "./cashflow-history-card";
import { getActiveShiftCashflowHistory } from "@/features/shift/queries";

export default async function CashflowHistory() {
  const cashflowHistory = await getActiveShiftCashflowHistory();

  return (
    <div>
      <h1 className="text-xl font-semibold">Riwayat Arus Kas</h1>
      <p className="text-neutral-500 text-sm mb-3">Lihat aliran arus kas selama sesi operasional</p>
      <ul className="space-y-4">
        {cashflowHistory.map((history) => (
          <CahsflowHistoryCard key={history.id} history={history} />
        ))}
      </ul>
    </div>
  );
}
