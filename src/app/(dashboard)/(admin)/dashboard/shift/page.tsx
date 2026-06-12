import ShiftList from "@/features/shift/components/shift-list";

export default async function ShiftPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Shift History</h1>
      <p className="text-neutral-500 mb-4 text-sm">List semua riwayat shift</p>
      <ShiftList />
    </div>
  );
}
