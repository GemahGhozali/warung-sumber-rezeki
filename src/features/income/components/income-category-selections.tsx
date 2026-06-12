import { IncomeFormInput } from "../schemas";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface IncomeCategorySelectionsProps {
  register: UseFormRegister<IncomeFormInput>;
  errors: FieldErrors<IncomeFormInput>;
  disabled?: boolean;
}

export default function IncomeCategorySelections({ register, errors, disabled }: IncomeCategorySelectionsProps) {
  return (
    <div className="space-y-1">
      <label className="block font-semibold">
        Kategori Pemasukan <span className="text-red-600">*</span>
      </label>
      <select {...register("category")} disabled={disabled} className="w-full py-2 px-3 rounded-lg border border-neutral-300 bg-white">
        <option value="MODAL_TAMBAHAN">Modal Tambahan</option>
        <option value="LAINNYA">Lainnya</option>
      </select>
      {errors.category && <small className="text-red-500 text-sm">{errors.category.message}</small>}
    </div>
  );
}
