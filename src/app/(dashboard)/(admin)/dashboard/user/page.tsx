import Link from "next/link";
import UserList from "@/features/user/components/user-list";
import { Plus } from "lucide-react";

export default async function UserPage() {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl">User Page</h1>
      <UserList />
      <Link href="/dashboard/user/create" className="fixed bottom-4 right-4 bg-teal-600 text-white rounded-full font-medium size-10 grid place-content-center">
        <Plus />
      </Link>
    </div>
  );
}
