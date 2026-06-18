import DateFilter from "@/component/date-filter";
import ShiftList from "@/features/shift/components/shift-list";
import { getAllShifts } from "@/features/shift/queries";

interface ShiftPageProps {
  searchParams: Promise<{
    start?: string;
    end?: string;
  }>;
}

export default async function ShiftPage({ searchParams }: ShiftPageProps) {
  const { start, end } = await searchParams;

  const filterDate = {
    startDate: start ? new Date(start) : undefined,
    endDate: end ? new Date(end) : undefined,
  };

  const shifts = await getAllShifts(filterDate);

  return (
    <div className="p-4 h-full flex flex-col space-y-4 *:shrink-0">
      <div className="space-y-0.5">
        <h1 className="text-xl font-semibold">Riwayat Shift</h1>
        <p className="text-neutral-500 text-sm">Daftar semua riwayat sesi operasional shift</p>
      </div>
      <DateFilter />
      <ShiftList shifts={shifts} />
    </div>
  );
}
