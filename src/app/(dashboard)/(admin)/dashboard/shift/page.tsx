import ShiftList from "@/features/shift/components/shift-list";

export default async function ShiftPage() {
  return (
    <div className="p-4 h-full flex flex-col">
      <h1 className="text-xl font-semibold">Riwayat Shift</h1>
      <p className="text-neutral-500 mb-4 text-sm">Daftar semua riwayat sesi operasional shift</p>
      <ShiftList />
    </div>
  );
}
