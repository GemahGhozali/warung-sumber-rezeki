import { Crown, User } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CreateUserInput } from "../schemas";

interface RoleSelectionsProps {
  register: UseFormRegister<CreateUserInput>;
  errors: FieldErrors<CreateUserInput>;
}

export function RoleSelections({ register, errors }: RoleSelectionsProps) {
  return (
    <div className="space-y-2">
      <label className="block font-semibold">
        Role Pengguna <span className="text-red-600">*</span>
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="cursor-pointer">
          <input type="radio" value="KASIR" className="sr-only peer" {...register("role")} />
          <div className="flex items-center justify-center gap-1.5 p-3 rounded-xl ring ring-neutral-300 text-neutral-500 peer-checked:ring-2 peer-checked:ring-teal-600 peer-checked:bg-teal-50 peer-checked:text-teal-600">
            <User size={20} strokeWidth={2.25} />
            <p className="font-medium">Kasir</p>
          </div>
        </label>
        <label className="cursor-pointer">
          <input type="radio" value="ADMIN" className="sr-only peer" {...register("role")} />
          <div className="flex items-center justify-center gap-1.5 p-3 rounded-xl ring ring-neutral-300 text-neutral-500 peer-checked:ring-2 peer-checked:ring-teal-600 peer-checked:bg-teal-50 peer-checked:text-teal-600">
            <Crown size={20} />
            <p className="font-medium">Admin</p>
          </div>
        </label>
      </div>
      {errors.role && <small className="text-red-500 text-sm">{errors.role.message}</small>}
    </div>
  );
}
