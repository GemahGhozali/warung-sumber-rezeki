import Link from "next/link";
import MenuList from "@/features/menu/components/menu-list";
import { Plus } from "lucide-react";

export default async function MenuPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl">Menu Page</h1>
      <MenuList />
      <Link href="/dashboard/menu/create" className="fixed bottom-4 right-4 bg-teal-600 text-white rounded-full font-medium size-10 grid place-content-center">
        <Plus />
      </Link>
    </div>
  );
}
