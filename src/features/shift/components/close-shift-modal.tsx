"use client";

import { RefObject } from "react";
import { Modal, ModalHandle } from "@/component/modal";
import { useCloseShiftForm } from "../hooks";

interface CloseShiftModalProps {
  ref: RefObject<ModalHandle | null>;
  onClose: () => void;
  expectedCash: number;
}

export default function CloseShiftModal({ ref, onClose }: CloseShiftModalProps) {
  const { register, handleSubmit, errors, state, isPending } = useCloseShiftForm();

  return (
    <Modal ref={ref} className="bg-white p-4 rounded-t-2xl">
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="space-y-2">
          <label className="block font-semibold">
            Kas Yang Sebenarnya <span className="text-red-600">*</span>
          </label>
          <input type="number" {...register("actualCash")} placeholder="Masukkan harga disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
          {errors.actualCash && <small className="text-red-500 text-sm">{errors.actualCash.message}</small>}
        </div>
        <button type="submit" className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer">
          Tutup Toko Sekarang
        </button>
        <button type="button" className="w-full bg-white text-neutral-500 border border-neutral-300 rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={onClose}>
          Jangan Tutup Dulu
        </button>
      </form>
    </Modal>
  );
}
