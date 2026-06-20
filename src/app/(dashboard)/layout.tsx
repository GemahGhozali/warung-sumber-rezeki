import BottomNavigationBar from "@/component/bottom-navigation-bar";
import ShiftGate from "@/features/shift/components/shift-gate";
import { getCurrentUserAndShiftId } from "@/features/shift/queries";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user, shiftId } = await getCurrentUserAndShiftId();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto relative scrollbar-hidden">
        <ShiftGate isShiftActive={Boolean(shiftId)} userName={user.name}>
          {children}
        </ShiftGate>
      </div>
      <BottomNavigationBar role={user.role} />
    </div>
  );
}
