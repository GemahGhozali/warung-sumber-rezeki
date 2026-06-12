"use client";

import Link from "next/link";
import { Crown, User as UserIcon, Edit, Trash2Icon } from "lucide-react";
import { User } from "@/generated/prisma/client";
import { startTransition } from "react";
import { deleteUserAction } from "../actions";

interface UserCardProps {
  user: Pick<User, "id" | "name" | "role" | "image">;
}

export default function UserCard({ user }: UserCardProps) {
  const handleDelete = () => {
    const isConfirmed = confirm(`Apakah Anda yakin ingin menghapus pengguna "${user.name}"?`);
    if (!isConfirmed) return;

    startTransition(async () => {
      const response = await deleteUserAction(user.id);
      if (response && !response.success) alert(response.message);
    });
  };

  return (
    <li key={user.id} className="flex items-center gap-3">
      <img src={user.image || "/images/avatar-placeholder.png"} alt={user.name} className="size-[45px] rounded-full object-cover" />
      <div>
        <h6 className="font-semibold">{user.name}</h6>
        <div className="flex items-center gap-1.5 text-teal-600">
          {user.role === "ADMIN" ? <Crown size={16} /> : <UserIcon size={16} strokeWidth={2.25} />}
          <p className="lowercase first-letter:uppercase text-sm text-neutral-500 font-medium">{user.role}</p>
        </div>
      </div>
      <div className="flex gap-2 ml-auto">
        <Link href={`/dashboard/user/${user.id}/edit`} className="size-9 grid place-content-center bg-teal-50 text-teal-600 rounded-lg">
          <Edit size={16} />
        </Link>
        <button className="size-9 grid place-content-center bg-red-50 text-red-600 rounded-lg cursor-pointer" onClick={handleDelete}>
          <Trash2Icon size={16} />
        </button>
      </div>
    </li>
  );
}
