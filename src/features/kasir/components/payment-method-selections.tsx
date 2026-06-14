import { UseFormRegister, FieldErrors } from "react-hook-form";
import { CheckoutTransactionFormInput } from "@/features/transaction/schemas";

interface PaymentMethodSelectionsProps {
  register: UseFormRegister<CheckoutTransactionFormInput>;
  errors: FieldErrors<CheckoutTransactionFormInput>;
}

export function PaymentMethodSelections({ register, errors }: PaymentMethodSelectionsProps) {
  return (
    <div className="space-y-2">
      <label className="block font-semibold text-sm">
        Metode Pembayaran <span className="text-red-600">*</span>
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="cursor-pointer">
          <input type="radio" value="TUNAI" className="sr-only peer" {...register("paymentMethod")} />
          <div className="flex items-center justify-center gap-1.5 p-3 rounded-xl ring ring-neutral-300 text-neutral-500 peer-checked:ring-2 peer-checked:ring-teal-600 peer-checked:bg-teal-50 peer-checked:text-teal-600">
            <p className="font-medium">💵 Tunai</p>
          </div>
        </label>
        <label className="cursor-pointer">
          <input type="radio" value="TRANSFER" className="sr-only peer" {...register("paymentMethod")} />
          <div className="flex items-center justify-center gap-1.5 p-3 rounded-xl ring ring-neutral-300 text-neutral-500 peer-checked:ring-2 peer-checked:ring-teal-600 peer-checked:bg-teal-50 peer-checked:text-teal-600">
            <p className="font-medium">📱 Transfer</p>
          </div>
        </label>
      </div>
      {errors.paymentMethod && <small className="text-red-500 text-sm">{errors.paymentMethod.message}</small>}
    </div>
  );
}
