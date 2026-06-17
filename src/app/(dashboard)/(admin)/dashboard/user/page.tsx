import UserList from "@/features/user/components/user-list";
import UserHeader from "@/features/user/components/user-header";
import { getAllUsers } from "@/features/user/queries";

export default async function UserPage() {
  const users = await getAllUsers();

  return (
    <div className="p-4 h-full flex flex-col">
      <UserHeader />
      <UserList users={users} />
    </div>
  );
}
