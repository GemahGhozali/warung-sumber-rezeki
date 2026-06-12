"use client";

import { RefObject } from "react";
import { Modal, ModalHandle } from "@/component/modal";
import { useOpenShiftForm } from "../hooks";

interface OpenShiftModalProps {
  ref: RefObject<ModalHandle | null>;
  onClose: () => void;
}

export default function OpenShiftModal({ ref, onClose }: OpenShiftModalProps) {
  const { register, handleSubmit, errors, state, isPending } = useOpenShiftForm();

  return (
    <Modal ref={ref} className="bg-white p-4 rounded-t-2xl">
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="space-y-2">
          <label className="block font-semibold">
            Modal Kas Awal <span className="text-red-600">*</span>
          </label>
          <input type="number" {...register("initialCapital")} placeholder="Masukkan harga disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
          {errors.initialCapital && <small className="text-red-500 text-sm">{errors.initialCapital.message}</small>}
        </div>
        <button type="submit" className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer">
          Buka Toko Sekarang
        </button>
        <button type="button" className="w-full bg-white text-neutral-500 border border-neutral-300 rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={onClose}>
          Jangan Buka Dulu
        </button>
      </form>
    </Modal>
  );
}
