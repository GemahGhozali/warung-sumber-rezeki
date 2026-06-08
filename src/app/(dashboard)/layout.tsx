import { redirect } from "next/navigation";
import { getSession } from "@/libs/session";
import BottomNavigationBar from "@/component/bottom-navigation-bar";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getSession();
  if (!session) redirect("/");

  return (
    <div className="relative flex h-full flex-col">
      <div className="flex-1 overflow-y-auto">{children}</div>
      <BottomNavigationBar role={session.role} />
    </div>
  );
}
