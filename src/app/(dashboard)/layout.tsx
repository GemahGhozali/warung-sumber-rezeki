import { redirect } from "next/navigation";
import { getSession } from "@/libs/session";
import { getActiveShiftId } from "@/features/shift/queries";
import BottomNavigationBar from "@/component/bottom-navigation-bar";
import ShiftGate from "@/features/shift/components/shift-gate";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) redirect("/");

  const isShiftActive = await getActiveShiftId();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto relative">
        <ShiftGate isShiftActive={Boolean(isShiftActive)}>{children}</ShiftGate>
      </div>
      <BottomNavigationBar role={session.role} />
    </div>
  );
}
