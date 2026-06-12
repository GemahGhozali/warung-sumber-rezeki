import ShiftCard from "./shift-card";
import { getAllShifts } from "../queries";

export default async function ShiftList() {
  const shifts = await getAllShifts();

  if (shifts.length === 0) return <p className="text-neutral-500">Belum ada kategori apapun saat ini</p>;

  return (
    <ul className="space-y-4">
      {shifts.map((shift) => (
        <ShiftCard key={shift.id} shift={shift} />
      ))}
    </ul>
  );
}
