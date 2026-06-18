import { formatCurrency } from "@/utils/format-currency";
import { ProfitLossReport } from "../types";
import { TrendingDown, TrendingUp } from "lucide-react";
import { WalletMoney, CartLarge2, Sale, Banknote2 } from "@solar-icons/react-perf/BoldDuotone";

interface MetricCardsProps {
  report: ProfitLossReport;
}

export default function MetricCards({ report }: MetricCardsProps) {
  const totalLabaRugiBersih = report.ringkasan.totalLabaRugiBersih;
  const totalPendapatanKotor = report.ringkasan.totalPendapatanKotor;
  const totalTransaksi = report.ringkasan.totalTransaksi;
  const rataRataTransaksi = totalTransaksi > 0 ? totalPendapatanKotor / totalTransaksi : 0;
  const status = report.ringkasan.status;

  const colorStatus = status === "LABA" && totalLabaRugiBersih > 0 ? "before:content-['+_']" : status === "RUGI" ? "before:content-['-_']" : "";

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-4">
      <div className="p-3 bg-white border border-neutral-300 rounded-2xl">
        <div className="grid place-content-center size-[45px] bg-teal-100/50 text-teal-600 rounded-full mb-2">
          <WalletMoney size={24} />
        </div>
        <div className={`font-semibold flex items-center`}>
          <h6 className={`font-semibold ${colorStatus}`}>{formatCurrency(Math.abs(totalLabaRugiBersih))}</h6>
          {status === "LABA" && <TrendingUp size={16} className="text-green-500 ml-1.5" />}
          {status === "RUGI" && <TrendingDown size={16} className="text-red-500 ml-1.5" />}
        </div>
        <p className="text-neutral-500 text-sm">Laba/Rugi Bersih</p>
      </div>
      <div className="p-3 bg-white border border-neutral-300 rounded-2xl">
        <div className="grid place-content-center size-[45px] bg-teal-100/50 text-teal-600 rounded-full mb-2">
          <Banknote2 size={24} />
        </div>
        <h6 className="font-semibold">{formatCurrency(totalPendapatanKotor)}</h6>
        <p className="text-neutral-500 text-sm">Total Omzet</p>
      </div>
      <div className="p-3 bg-white border border-neutral-300 rounded-2xl">
        <div className="grid place-content-center size-[45px] bg-teal-100/50 text-teal-600 rounded-full mb-2">
          <CartLarge2 size={24} />
        </div>
        <h6 className="font-semibold">{totalTransaksi}</h6>
        <p className="text-neutral-500 text-sm">Total Transaksi</p>
      </div>
      <div className="p-3 bg-white border border-neutral-300 rounded-2xl">
        <div className="grid place-content-center size-[45px] bg-teal-100/50 text-teal-600 rounded-full mb-2">
          <Sale size={24} />
        </div>
        <h6 className="font-semibold">{formatCurrency(rataRataTransaksi)}</h6>
        <p className="text-neutral-500 text-sm">Rata Rata Transaksi</p>
      </div>
    </div>
  );
}
