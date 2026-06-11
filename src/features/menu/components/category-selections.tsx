import { MenuFormInput } from "../schemas";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { Category } from "@/generated/prisma/client";

interface RoleSelectionsProps {
  categories: Category[];
  register: UseFormRegister<MenuFormInput>;
  errors: FieldErrors<MenuFormInput>;
  disabled?: boolean;
}

export default function CategorySelections({ categories, register, errors, disabled }: RoleSelectionsProps) {
  return (
    <div className="space-y-1">
      <label className="block font-semibold">Kategori Menu</label>
      <select {...register("categoryId")} disabled={disabled} className="w-full py-2 px-3 rounded-lg border border-neutral-300 bg-white">
        <option value="">--- Pilih Kategori (Opsional) ---</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      {errors.categoryId && <small className="text-red-500 text-sm">{errors.categoryId.message}</small>}
    </div>
  );
}
