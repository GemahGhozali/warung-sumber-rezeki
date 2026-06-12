"use client";

import { RefObject } from "react";
import { Modal, ModalHandle } from "@/component/modal";
import { useCreateIncomeForm } from "../hooks";
import IncomeCategorySelections from "./income-category-selections";

interface IncomeModalProps {
  ref: RefObject<ModalHandle | null>;
  onClose: () => void;
}

export default function IncomeModal({ ref, onClose }: IncomeModalProps) {
  const { register, handleSubmit, errors, state, isPending } = useCreateIncomeForm();

  return (
    <Modal ref={ref} className="bg-white p-4 rounded-t-2xl">
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="space-y-2">
          <label className="block font-semibold">
            Total Pemasukan <span className="text-red-600">*</span>
          </label>
          <input type="number" {...register("total")} placeholder="Masukkan total pemasukan disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
          {errors.total && <small className="text-red-500 text-sm">{errors.total.message}</small>}
        </div>

        <IncomeCategorySelections register={register} errors={errors} disabled={isPending} />

        <div className="space-y-2">
          <label className="block font-semibold">Keterangan (Opsional)</label>
          <input type="text" {...register("information")} placeholder="Masukkan keterangan pemasukan disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
          {errors.information && <small className="text-red-500 text-sm">{errors.information.message}</small>}
        </div>

        <button type="submit" className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer">
          Tambah Pemasukan
        </button>
        <button type="button" className="w-full bg-white text-neutral-500 border border-neutral-300 rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={onClose}>
          Batalkan
        </button>
      </form>
    </Modal>
  );
}
