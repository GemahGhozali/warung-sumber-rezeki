import DateFilter from "@/component/date-filter";
import ShiftAuditCashDifference from "@/features/dashboard/components/audit-cash-difference";
import MetricCards from "@/features/dashboard/components/metric-cards";
import OutcomeProportionChart from "@/features/dashboard/components/outcome-proportion-chart";
import ProfitLossReports from "@/features/dashboard/components/profit-loss-reports";
import TransactionTrendChart from "@/features/dashboard/components/transaction-trend-chart";
import { getShiftAuditCashDifference, getProfitLossReport, getTransactionVolumeTrend } from "@/features/dashboard/queries";

interface DashboardPageProps {
  searchParams: Promise<{
    type?: string;
    start?: string;
    end?: string;
  }>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const { type, start, end } = await searchParams;

  const filterDate = {
    type: (type as "harian" | "mingguan" | "bulanan" | "custom") || "harian",
    startDate: start ? new Date(start) : undefined,
    endDate: end ? new Date(end) : undefined,
  };

  const [report, shifts, transactionTrend] = await Promise.all([getProfitLossReport(filterDate), getShiftAuditCashDifference(filterDate), getTransactionVolumeTrend(filterDate)]);

  return (
    <div className="p-4 space-y-4">
      <div>
        <h5 className="text-xl font-semibold">Laporan Laba Rugi</h5>
        <p className="text-sm text-neutral-500">Lihat performa toko dan evaluasi hasil penjualan</p>
      </div>
      <DateFilter />
      <MetricCards report={report} />
      <ProfitLossReports report={report} />
      <OutcomeProportionChart dataBeban={report.detail.bebanPengeluaran} totalBeban={report.ringkasan.totalBebanOperasional} />
      <ShiftAuditCashDifference shifts={shifts} />
      <TransactionTrendChart data={transactionTrend} />
    </div>
  );
}
