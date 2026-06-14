"use client";

import { RefObject } from "react";
import { Modal, ModalHandle } from "@/component/modal";
import { PaymentMethodSelections } from "./payment-method-selections";
import { useCheckoutForm } from "@/features/transaction/hooks";
import { formatCurrency } from "@/utils/format-currency";

interface CheckoutModalProps {
  ref: RefObject<ModalHandle | null>;
  onClose: () => void;
}

export default function CheckoutModal({ ref, onClose }: CheckoutModalProps) {
  const { register, errors, isPending, totalChange, totalPrice, selectedPaymentMethod, handleSubmit } = useCheckoutForm();

  return (
    <Modal ref={ref} className="bg-white p-4 pt-6 rounded-t-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="size-20 bg-teal-100/60 grid place-content-center rounded-full text-4xl leading-none mb-4">💵</div>
        <p className="text-sm text-neutral-500 font-semibold">Total Keseluruhan</p>
        <h4 className="text-2xl font-semibold text-teal-600">{formatCurrency(totalPrice)}</h4>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <PaymentMethodSelections register={register} errors={errors} />

        {selectedPaymentMethod === "TUNAI" && (
          <>
            <div className="space-y-2">
              <label className="block font-semibold text-sm">
                Nominal Pembayaran <span className="text-red-600">*</span>
              </label>
              <input type="number" {...register("totalPayment", { valueAsNumber: true })} placeholder="Masukkan total pembayaran disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
              {errors.totalPayment && <small className="text-red-500 text-sm">{errors.totalPayment.message}</small>}
            </div>

            <div className="space-y-2">
              <label className="block font-semibold text-sm">Total Kembalian</label>
              <div className={`w-full py-2 px-3 rounded-lg border border-neutral-300 font-medium ${totalChange > 0 ? "text-red-600" : "text-neutral-500"}`}>{formatCurrency(totalChange)}</div>
            </div>
          </>
        )}

        <div className="space-y-4">
          <button type="submit" disabled={isPending} className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer">
            Konfirmasi Pembayaran
          </button>
          <button type="button" disabled={isPending} className="w-full bg-white text-neutral-500 border border-neutral-300 rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={onClose}>
            Batalkan
          </button>
        </div>
      </form>
    </Modal>
  );
}
