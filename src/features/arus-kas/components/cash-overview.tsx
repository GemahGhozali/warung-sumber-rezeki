import IncomeModalButton from "./income-modal-button";
import OutcomeModalButton from "./outcome-modal-button";
import { WalletMoney } from "@solar-icons/react-perf/BoldDuotone";
import { RoundArrowLeftDown, RoundArrowRightUp } from "@solar-icons/react-perf/Bold";
import { formatCurrency } from "@/utils/format-currency";
import { getActiveShift } from "@/features/shift/queries";

export default async function CashOverview() {
  const cashflow = await getActiveShift();

  if (!cashflow) return null;

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl p-3 flex items-center gap-3 mb-4 border border-neutral-300">
        <div className="grid place-content-center size-[45px] bg-teal-100 text-teal-600 rounded-full">
          <WalletMoney size={24} />
        </div>
        <div>
          <p className="font-semibold">{formatCurrency(cashflow.expectedCash)}</p>
          <p className="font-medium text-sm text-neutral-500">Total Uang Kas Yang Tercatat Sistem</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center w-full">
        <div className="bg-white rounded-xl p-3 border border-neutral-300">
          <div className="grid place-content-center size-[45px] bg-green-100 text-green-500 rounded-full mb-2">
            <RoundArrowLeftDown size={26} />
          </div>
          <p className={`font-semibold ${cashflow.totalIncomes > 0 ? "text-green-500 before:content-['+_']" : "text-black"}`}>{formatCurrency(cashflow.totalIncomes)}</p>
          <p className="font-medium text-sm text-neutral-500 mb-3">Total Pemasukan</p>
          <IncomeModalButton />
        </div>
        <div className="bg-white rounded-xl p-3 border border-neutral-300">
          <div className="grid place-content-center size-[45px] bg-red-100 text-red-500 rounded-full mb-2">
            <RoundArrowRightUp size={26} />
          </div>
          <p className={`font-semibold ${cashflow.totalIncomes > 0 ? "text-red-500 before:content-['-_']" : "text-black"}`}>{formatCurrency(cashflow.totalOutcomes)}</p>
          <p className="font-medium text-sm text-neutral-500 mb-3">Total Pengeluaran</p>
          <OutcomeModalButton currentCash={cashflow.expectedCash} />
        </div>
      </div>
    </div>
  );
}
