import ActionButtons from "@/features/arus-kas/components/action-buttons";
import CashflowHistory from "@/features/arus-kas/components/cashflow-history";
import { getActiveShift } from "@/features/shift/queries";
import { formatCurrency } from "@/utils/format-currency";

export default async function ArusKasPage() {
  const cashflow = await getActiveShift();

  if (!cashflow) return null;

  return (
    <div className="p-4 space-y-4">
      <p>Kas Awal : {formatCurrency(cashflow.initialCapital)}</p>
      <p>Total Pemasukan : + {formatCurrency(cashflow.totalIncomes)}</p>
      <p>Total Pengeluaran : - {formatCurrency(cashflow.totalOutcomes)}</p>
      <p>Kas Yang Tercatat : {formatCurrency(cashflow.expectedCash)}</p>
      <ActionButtons currentCash={cashflow.expectedCash} />
      <CashflowHistory />
    </div>
  );
}
