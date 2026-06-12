"use client";

import Link from "next/link";
import { Edit, Trash2Icon } from "lucide-react";
import { startTransition } from "react";
import { deleteCategoryAction } from "../actions";

interface CategoryCardProps {
  category: { id: string; name: string; totalMenu: number };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const handleDelete = () => {
    const isConfirmed = confirm(`Apakah Anda yakin ingin menghapus kategori "${category.name}"?`);
    if (!isConfirmed) return;

    startTransition(async () => {
      const response = await deleteCategoryAction(null, { id: category.id, name: category.name });
      if (response && !response.success) alert(response.message);
    });
  };

  return (
    <li key={category.id} className="p-3 bg-white border border-neutral-300 rounded-lg flex items-center justify-between">
      <div>
        <h6 className="font-semibold">{category.name}</h6>
        <p className="text-neutral-500 text-sm">{category.totalMenu} Total Menu</p>
      </div>
      <div className="flex gap-2">
        <Link href={`/dashboard/menu/category/${category.id}/edit`} className="size-9 grid place-content-center bg-teal-50 text-teal-600 rounded-lg">
          <Edit size={16} />
        </Link>
        <button className="size-9 grid place-content-center bg-red-50 text-red-600 rounded-lg cursor-pointer" onClick={handleDelete}>
          <Trash2Icon size={16} />
        </button>
      </div>
    </li>
  );
}
