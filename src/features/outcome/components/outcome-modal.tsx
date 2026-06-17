"use client";

import OutcomeCategorySelections from "./outcome-category-selections";
import { RefObject } from "react";
import { Modal, ModalHandle } from "@/component/modal";
import { RoundArrowRightUp } from "@solar-icons/react-perf/Bold";
import { useCreateOutcomeForm } from "../hooks";

interface OutcomeModalProps {
  ref: RefObject<ModalHandle | null>;
  onClose: () => void;
  currentCash: number;
}

export default function OutcomeModal({ currentCash, ref, onClose }: OutcomeModalProps) {
  const { register, handleSubmit, errors, isPending } = useCreateOutcomeForm({
    onSuccess: () => onClose(),
    currentCash,
  });

  return (
    <Modal ref={ref} className="bg-white p-4 rounded-t-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="size-20 bg-red-100 grid place-content-center rounded-full text-4xl leading-none mb-4">
          <RoundArrowRightUp size={48} color="#e7000b" />
        </div>
        <h5 className="text-xl font-semibold mb-0.5">Catat Pengeluaran</h5>
        <p className="text-sm text-neutral-500">Masukkan nominal serta kategori pengeluaran</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="space-y-2">
          <label className="block font-semibold">
            Total Pengeluaran <span className="text-red-600">*</span>
          </label>
          <input type="number" {...register("total")} placeholder="Masukkan total pengeluaran disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
          {errors.total && <small className="text-red-500 text-sm">{errors.total.message}</small>}
        </div>

        <OutcomeCategorySelections register={register} errors={errors} disabled={isPending} />

        <div className="space-y-2">
          <label className="block font-semibold">Keterangan (Opsional)</label>
          <input type="text" {...register("information")} placeholder="Masukkan keterangan pengeluaran disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
          {errors.information && <small className="text-red-500 text-sm">{errors.information.message}</small>}
        </div>

        <button type="submit" className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer">
          Tambah Pengeluaran
        </button>
        <button type="button" className="w-full bg-white text-neutral-500 border border-neutral-300 rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={onClose}>
          Batalkan
        </button>
      </form>
    </Modal>
  );
}
