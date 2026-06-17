import { MenuFormInput } from "../schemas";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { ChevronDown } from "lucide-react";
import { CategoryCatalog } from "@/features/category/types";

interface RoleSelectionsProps {
  categories: CategoryCatalog;
  register: UseFormRegister<MenuFormInput>;
  errors: FieldErrors<MenuFormInput>;
  disabled?: boolean;
}

export default function CategorySelections({ categories, register, errors, disabled }: RoleSelectionsProps) {
  return (
    <div className="space-y-1">
      <label className="block font-semibold">Kategori Menu (Opsional)</label>
      <div className="w-full relative">
        <select {...register("categoryId")} disabled={disabled} className="peer w-full py-2 px-3 rounded-lg border border-neutral-300 bg-white appearance-none relative">
          <option value="">Pilih Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-3 peer-focus:rotate-180 transition-transform duration-300" />
      </div>
      {errors.categoryId && <small className="text-red-500 text-sm">{errors.categoryId.message}</small>}
    </div>
  );
}
