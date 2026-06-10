import { getAllUsers } from "../queries";
import UserCard from "./user-card";

export default async function UserList() {
  const users = await getAllUsers();

  return (
    <ul className="space-y-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  );
}
