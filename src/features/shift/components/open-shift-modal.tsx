"use client";

import { RefObject } from "react";
import { Modal, ModalHandle } from "@/component/modal";
import { useOpenShiftForm } from "../hooks";
import { getCurrentDaytime } from "@/utils/daytime";

interface OpenShiftModalProps {
  ref: RefObject<ModalHandle | null>;
  onClose: () => void;
  userName: string;
}

export default function OpenShiftModal({ ref, onClose, userName }: OpenShiftModalProps) {
  const { register, handleSubmit, errors, isPending } = useOpenShiftForm();

  return (
    <Modal ref={ref} className="bg-white p-4 pt-6 rounded-t-2xl">
      <div className="flex flex-col items-center mb-8 text-center">
        <img src="/images/store-illustration.png" className="size-[100px] mb-4" />
        <h5 className="text-xl font-semibold mb-0.5">
          Selamat {getCurrentDaytime()}, {userName} 🙌
        </h5>
        <p className="text-sm text-neutral-500">Silahkan buka toko dengan cara memasukkan modal awal sebelum memulai operasional</p>
      </div>
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
