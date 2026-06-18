import { formatCurrency } from "@/utils/format-currency";
import { ProfitLossReport } from "../types";
import { Collapsible, CollapsibleChevron, CollapsibleContent, CollapsibleTrigger } from "@/component/collapsible";
import { RoundArrowLeftDown } from "@solar-icons/react-perf/Bold";

interface IncomeCollapsibleProps {
  report: ProfitLossReport;
}

export default function IncomeCollapsible({ report }: IncomeCollapsibleProps) {
  const modalTambahan = report.detail.pendapatan.MODAL_TAMBAHAN;
  const lainnya = report.detail.pendapatan.LAINNYA;
  const totalPemasukanLain = modalTambahan + lainnya;

  return (
    <Collapsible className="w-full max-w-md">
      <CollapsibleTrigger className="w-full flex items-center gap-1 text-sm font-semibold text-neutral-500 cursor-pointer">
        <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
          <RoundArrowLeftDown size={20} color="#009689" /> Pemasukan Lainnya
        </p>
        <CollapsibleChevron className="mr-auto" />
        <span className={`text-sm font-semibold ${totalPemasukanLain > 0 ? "text-green-500 before:content-['+_']" : "text-neutral-500"}`}>{formatCurrency(totalPemasukanLain)}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-2 w-full flex mt-2">
          <div className="grow w-[2px] bg-neutral-300 rounded-full" />
          <div className="pl-4 py-1 w-full space-y-3">
            <div className="flex justify-between">
              <p className="text-sm text-neutral-500 font-semibold">Modal Tambahan</p>
              <p className="text-sm font-semibold text-neutral-500">{formatCurrency(modalTambahan)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-neutral-500 font-semibold">Lainnya</p>
              <p className="text-sm font-semibold text-neutral-500">{formatCurrency(lainnya)}</p>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
