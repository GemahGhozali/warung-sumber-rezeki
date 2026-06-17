"use client";

import { CategoryCatalog } from "@/features/category/types";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryTabFiltersProp {
  categories: CategoryCatalog;
}

export default function CategoryTabFilters({ categories }: CategoryTabFiltersProp) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  const handleCategoryClick = (categoryName: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    !categoryName ? params.delete("category") : params.set("category", categoryName);
    router.push(`?${params.toString()}`);
  };

  const baseStyle = "py-4 cursor-pointer";
  const activeStyle = "font-semibold text-teal-500 shadow-[inset_0_-3px_0_0_#14b8a6]";

  return (
    <div className="bg-white overflow-x-auto whitespace-nowrap px-4 scrollbar-hidden shrink-0 border-b border-neutral-300">
      <div className="flex gap-8 w-max rounded-lg">
        <button type="button" className={`${baseStyle} ${!currentCategory ? activeStyle : ""}`} onClick={() => handleCategoryClick(null)}>
          Semua
        </button>
        {categories.map((category) => {
          const isActive = currentCategory === category.name;
          return (
            <button key={category.id} type="button" className={`${baseStyle} ${isActive ? activeStyle : ""}`} onClick={() => handleCategoryClick(category.name)}>
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
