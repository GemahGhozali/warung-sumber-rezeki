"use client";

import Link from "next/link";
import { Edit, Trash2Icon } from "lucide-react";
import { Crown, User as UserIcon } from "@solar-icons/react-perf/BoldDuotone";
import { UserCatalogItem } from "../types";

interface UserCardProps {
  user: UserCatalogItem;
  onDelete: () => void;
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <li className="flex items-center gap-3 p-3 bg-white border border-neutral-300 rounded-2xl">
      <img src={user.image || "/images/avatar-placeholder.png"} alt={user.name} className="size-[50px] rounded-full object-cover border border-neutral-300" />
      <div className="space-y-0.5">
        <h6 className="font-semibold">{user.name}</h6>
        <div className="flex items-center gap-1.5 text-teal-600">
          {user.role === "ADMIN" ? <Crown size={20} /> : <UserIcon size={20} />}
          <p className="lowercase first-letter:uppercase text-sm text-neutral-500 font-medium">{user.role}</p>
        </div>
      </div>
      <div className="flex gap-2 ml-auto">
        <Link href={`/dashboard/user/${user.id}/edit`} className="size-9 grid place-content-center bg-teal-100/50 text-teal-600 rounded-full">
          <Edit size={16} />
        </Link>
        <button className="size-9 grid place-content-center bg-red-100/50 text-red-600 rounded-full cursor-pointer" onClick={onDelete}>
          <Trash2Icon size={16} />
        </button>
      </div>
    </li>
  );
}
