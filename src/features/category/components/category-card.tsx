"use client";

import Link from "next/link";
import { Tag } from "@solar-icons/react-perf/BoldDuotone";
import { CategoryCatalogItem } from "../types";
import { Edit, Trash2Icon } from "lucide-react";

interface CategoryCardProps {
  category: CategoryCatalogItem;
  onDelete: () => void;
}

export default function CategoryCard({ category, onDelete }: CategoryCardProps) {
  return (
    <li className="p-3 bg-white border border-neutral-300 rounded-lg flex items-center gap-3">
      <div className="bg-teal-100/60 size-[50px] rounded-full grid place-content-center">
        <Tag size={24} color="#009689" />
      </div>
      <div className="space-y-0.5">
        <h6 className="font-semibold">{category.name}</h6>
        <p className="text-neutral-500 text-sm">{category.totalMenu} Total Menu</p>
      </div>
      <div className="flex gap-2 ml-auto">
        <Link href={`/dashboard/menu/category/${category.id}/edit`} className="size-9 grid place-content-center bg-teal-100/50 text-teal-600 rounded-full">
          <Edit size={16} />
        </Link>
        <button className="size-9 grid place-content-center bg-red-100/50 text-red-600 rounded-full cursor-pointer" onClick={onDelete}>
          <Trash2Icon size={16} />
        </button>
      </div>
    </li>
  );
}
