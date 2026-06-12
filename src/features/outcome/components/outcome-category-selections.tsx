import { OutcomeFormInput } from "../schemas";
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface OutcomeCategorySelectionsProps {
  register: UseFormRegister<OutcomeFormInput>;
  errors: FieldErrors<OutcomeFormInput>;
  disabled?: boolean;
}

export default function OutcomeCategorySelections({ register, errors, disabled }: OutcomeCategorySelectionsProps) {
  return (
    <div className="space-y-1">
      <label className="block font-semibold">
        Kategori Pengeluaran <span className="text-red-600">*</span>
      </label>
      <select {...register("category")} disabled={disabled} className="w-full py-2 px-3 rounded-lg border border-neutral-300 bg-white">
        <option value="BIAYA_PRODUKSI">Biaya Produksi</option>
        <option value="BIAYA_OPERASIONAL">Biaya Operasional</option>
        <option value="PEMASARAN_PROMOSI">Pemasaran dan Promosi</option>
        <option value="PEMELIHARAAN">Pemeliharaan</option>
        <option value="LAINNYA">Lainnya</option>
      </select>
      {errors.category && <small className="text-red-500 text-sm">{errors.category.message}</small>}
    </div>
  );
}
