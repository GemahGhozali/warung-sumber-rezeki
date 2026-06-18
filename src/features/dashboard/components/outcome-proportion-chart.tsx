"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { formatCompact } from "@/utils/format-currency";

ChartJS.register(ArcElement, Tooltip, Legend);

interface OutcomeProportionChartProps {
  dataBeban: {
    BIAYA_PRODUKSI: number;
    BIAYA_OPERASIONAL: number;
    PEMASARAN_PROMOSI: number;
    PEMELIHARAAN: number;
    LAINNYA: number;
  };
  totalBeban: number;
}

export default function OutcomeProportionChart({ dataBeban, totalBeban }: OutcomeProportionChartProps) {
  const rawData = [
    { name: "Produksi", value: dataBeban.BIAYA_PRODUKSI, color: "#d85a30" },
    { name: "Operasional", value: dataBeban.BIAYA_OPERASIONAL, color: "#378add" },
    { name: "Pemasaran", value: dataBeban.PEMASARAN_PROMOSI, color: "#ef9f27" },
    { name: "Pemeliharaan", value: dataBeban.PEMELIHARAAN, color: "#1d9e75" },
    { name: "Lainnya", value: dataBeban.LAINNYA, color: "#4B5563" },
  ];

  const isDataEmpty = totalBeban === 0 || rawData.every((item) => item.value === 0);

  const data = {
    labels: isDataEmpty ? ["None"] : rawData.map((item) => item.name),
    datasets: [
      {
        data: isDataEmpty ? [1] : rawData.map((item) => item.value),
        backgroundColor: isDataEmpty ? ["#E5E7EB"] : rawData.map((item) => item.color),
        borderWidth: 0,
        borderColor: "#ffffff",
        cutout: "75%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { enabled: !isDataEmpty } },
  };

  return (
    <div className="bg-white border border-neutral-300 rounded-xl p-4">
      <h6 className="font-semibold mb-4">Komposisi Pengeluaran</h6>
      <div className="flex items-center justify-between gap-5">
        <div className="w-[140px] h-[140px] flex items-center justify-center relative">
          <div className="w-full h-full z-50">
            <Doughnut data={data} options={options} />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <h5 className="font-semibold">{formatCompact(totalBeban)}</h5>
            <p className="text-neutral-500 text-xs leading-none text-nowrap">Total Seluruh</p>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          {rawData.map((item, index) => {
            const percentage = totalBeban > 0 ? ((item.value / totalBeban) * 100).toFixed(0) : "0";
            return (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                  <span className="text-neutral-500 font-medium">{item.name}</span>
                </div>
                <span className="font-semibold">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
