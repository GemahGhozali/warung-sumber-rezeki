import ShiftCard from "./shift-card";
import { ClockCircle } from "@solar-icons/react-perf/BoldDuotone";
import { ShiftHistory } from "../types";

interface ShiftListProps {
  shifts: ShiftHistory[];
}

export default function ShiftList({ shifts }: ShiftListProps) {
  if (shifts.length === 0) {
    return (
      <div className="grow flex flex-col justify-center items-center">
        <div className="bg-teal-100/60 size-[60px] rounded-full flex justify-center items-center mb-3">
          <ClockCircle size={32} color="#009689" />
        </div>
        <h6 className="font-semibold mb-0.5">Belum ada shift apapun</h6>
        <p className="text-neutral-500 text-sm">Riwayat shift akan terlihat disini</p>
      </div>
    );
  }

  return (
    <ul className="pb-4 space-y-4">
      {shifts.map((shift) => (
        <ShiftCard key={shift.id} shift={shift} />
      ))}
    </ul>
  );
}
