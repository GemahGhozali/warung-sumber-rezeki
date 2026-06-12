import { getActiveShift } from "@/features/shift/queries";
import ActionButtons from "@/features/home/components/action-buttons";
import ShiftOverview from "@/features/home/components/shift-overview";

export default async function HomePage() {
  const shift = await getActiveShift();
  if (!shift) return null;

  return (
    <div className="p-4">
      <ActionButtons shift={shift} />
      <ShiftOverview shift={shift} />
    </div>
  );
}
