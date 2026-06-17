import CahsflowHistoryCard from "./cashflow-history-card";
import { getActiveShiftCashflowHistory } from "@/features/shift/queries";

import { WalletMoney } from "@solar-icons/react-perf/BoldDuotone";
export default async function CashflowHistory() {
  const cashflowHistory = await getActiveShiftCashflowHistory();

  if (cashflowHistory.length === 0) {
    return (
      <div className="p-6 flex flex-col h-full justify-center items-center rounded-2xl">
        <div className="bg-teal-100/50 size-[60px] shrink-0 rounded-full grid place-content-center mb-3">
          <WalletMoney size={32} color="#009689" />
        </div>
        <h6 className="font-semibold mb-0.5">Uang kas masih utuh</h6>
        <p className="text-neutral-500 text-sm">Belum ada mutasi kas apapun saat ini</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-xl font-semibold mb-0.5">Riwayat Arus Kas</h1>
      <p className="text-neutral-500 text-sm mb-4">Lihat aliran arus kas selama sesi operasional</p>
      <ul className="space-y-4">
        {cashflowHistory.map((history) => (
          <CahsflowHistoryCard key={history.id} history={history} />
        ))}
      </ul>
    </>
  );
}
