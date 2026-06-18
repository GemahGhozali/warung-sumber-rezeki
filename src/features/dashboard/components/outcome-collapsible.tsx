import { formatCurrency } from "@/utils/format-currency";
import { ProfitLossReport } from "../types";
import { Collapsible, CollapsibleChevron, CollapsibleContent, CollapsibleTrigger } from "@/component/collapsible";
import { RoundArrowRightUp } from "@solar-icons/react-perf/Bold";

interface OutcomeCollapsibleProps {
  report: ProfitLossReport;
}

export default function OutcomeCollapsible({ report }: OutcomeCollapsibleProps) {
  return (
    <Collapsible className="w-full max-w-md">
      <CollapsibleTrigger className="w-full flex items-center gap-1 text-sm font-semibold text-neutral-500 cursor-pointer">
        <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
          <RoundArrowRightUp size={20} color="#009689" /> Beban Pengeluaran
        </p>
        <CollapsibleChevron className="mr-auto" />
        <span className={`text-sm font-semibold ${report.ringkasan.totalBebanOperasional > 0 ? "text-red-500 before:content-['-_']" : "text-neutral-500"}`}>{formatCurrency(report.ringkasan.totalBebanOperasional)}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="pl-2 w-full flex mt-2">
          <div className="grow w-[2px] bg-neutral-300 rounded-full" />
          <div className="pl-4 py-1 w-full space-y-3">
            <div className="flex justify-between">
              <p className="text-sm text-neutral-500 font-semibold">Biaya Operasional</p>
              <p className="text-sm font-semibold text-neutral-500">{formatCurrency(report.detail.bebanPengeluaran.BIAYA_OPERASIONAL)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-neutral-500 font-semibold">Biaya Produksi</p>
              <p className="text-sm font-semibold text-neutral-500">{formatCurrency(report.detail.bebanPengeluaran.BIAYA_PRODUKSI)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-neutral-500 font-semibold">Pemasaran & Promosi</p>
              <p className="text-sm font-semibold text-neutral-500">{formatCurrency(report.detail.bebanPengeluaran.PEMASARAN_PROMOSI)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-neutral-500 font-semibold">Pemeliharaan</p>
              <p className="text-sm font-semibold text-neutral-500">{formatCurrency(report.detail.bebanPengeluaran.PEMELIHARAAN)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm text-neutral-500 font-semibold">Lainnya</p>
              <p className="text-sm font-semibold text-neutral-500">{formatCurrency(report.detail.bebanPengeluaran.LAINNYA)}</p>
            </div>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
