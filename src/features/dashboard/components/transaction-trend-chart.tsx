"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TransactionTrendItem {
  label: string;
  count: number;
}

interface TransactionTrendChartProps {
  data: TransactionTrendItem[];
}

export default function TransactionTrendChart({ data }: TransactionTrendChartProps) {
  const labels = data.map((item) => item.label);
  const values = data.map((item) => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: "#009689",
        hoverBackgroundColor: "#00796B",
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1F2937",
        padding: 12,
        cornerRadius: 8,
        callbacks: { label: (context: any) => `${context.raw} Transaksi` },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: true },
        ticks: {
          font: { size: 10 },
          color: "#9CA3AF",
        },
      },
      y: {
        grid: { display: false },
        border: { display: false },
        ticks: { display: false },
      },
    },
  };

  return (
    <div className="w-full bg-white rounded-2xl p-4 border border-gray-300">
      <h6 className="font-semibold mb-4">Tren Volume Transaksi</h6>
      <div className="h-56 w-full">
        <Bar data={chartData} options={options as any} />
      </div>
    </div>
  );
}
