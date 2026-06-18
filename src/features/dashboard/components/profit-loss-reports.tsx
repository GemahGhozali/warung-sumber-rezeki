import OutcomeCollapsible from "./outcome-collapsible";
import IncomeCollapsible from "./income-collapsible";
import { ProfitLossReport } from "../types";
import { formatCurrency } from "@/utils/format-currency";
import { CartLarge2, Banknote2, WalletMoney, CashOut } from "@solar-icons/react-perf/BoldDuotone";

interface ProfitLossReportProps {
  report: ProfitLossReport;
}

export default function ProfitLossReports({ report }: ProfitLossReportProps) {
  const omzetKasir = report.detail.pendapatan.omzetKasir;
  const totalHpp = report.ringkasan.totalHPP;
  const totalPendapatanKotor = report.ringkasan.totalPendapatanKotor;
  const totalLabaKotor = report.ringkasan.totalLabaKotor;
  const totalLabaRugiBersih = report.ringkasan.totalLabaRugiBersih;
  const status = report.ringkasan.status;

  const colorStatus = status === "LABA" && totalLabaRugiBersih > 0 ? "text-green-500 before:content-['+_']" : status === "RUGI" ? "text-red-500 before:content-['-_']" : "text-black";

  return (
    <>
      <div className="p-4 bg-white border border-neutral-300 rounded-2xl space-y-3">
        <h6 className="font-semibold mb-4">Perhitungan Laba Rugi</h6>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <CartLarge2 size={20} color="#009689" /> Omzet Penjualan Kasir
          </p>
          <p className={`text-sm font-semibold ${omzetKasir > 0 ? "text-green-500 before:content-['+_']" : "text-neutral-500"}`}>{formatCurrency(omzetKasir)}</p>
        </div>
        <IncomeCollapsible report={report} />
        <hr className="border-neutral-300" />
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <Banknote2 size={20} color="#009689" /> Pendapatan Kotor
          </p>
          <p className="font-semibold text-sm">{formatCurrency(totalPendapatanKotor)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <CashOut size={20} color="#009689" /> Harga Pokok Penjualan
          </p>
          <p className={`text-sm font-semibold ${totalHpp > 0 ? "text-red-500 before:content-['-_']" : "text-neutral-500"}`}>{formatCurrency(totalHpp)}</p>
        </div>
        <hr className="border-neutral-300" />
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <Banknote2 size={20} color="#009689" /> Laba Kotor
          </p>
          <p className="font-semibold text-sm">{formatCurrency(totalLabaKotor)}</p>
        </div>
        <OutcomeCollapsible report={report} />
        <hr className="border-neutral-300" />
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <WalletMoney size={20} color="#009689" /> Laba/Rugi Bersih
          </p>
          <p className={`text-sm font-semibold ${colorStatus}`}>{formatCurrency(Math.abs(totalLabaRugiBersih))}</p>
        </div>
      </div>
    </>
  );
}
