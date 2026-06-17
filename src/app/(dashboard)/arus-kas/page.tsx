import CashOverview from "@/features/arus-kas/components/cash-overview";
import CashflowHistory from "@/features/arus-kas/components/cashflow-history";

export default async function ArusKasPage() {
  return (
    <div className="bg-teal-600 h-full flex flex-col">
      <CashOverview />
      <div className="p-4 grow bg-neutral-50 rounded-t-2xl">
        <CashflowHistory />
      </div>
    </div>
  );
}
