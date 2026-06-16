"use client";

import { RefObject } from "react";
import { Modal, ModalHandle } from "@/component/modal";
import { Box } from "@solar-icons/react-perf/BoldDuotone";
import { useCustomMenuForm } from "@/features/transaction/hooks";

interface CustomMenuModalProps {
  ref: RefObject<ModalHandle | null>;
  onClose: () => void;
}

export default function CustomMenuModal({ ref, onClose }: CustomMenuModalProps) {
  const { register, errors, handleSubmit, resetForm } = useCustomMenuForm({
    onSuccess: () => {
      onClose();
    },
  });

  const handleCloseModal = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal ref={ref} className="bg-white p-4 pt-6 rounded-t-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className="size-20 bg-teal-100/60 grid place-content-center rounded-full text-4xl leading-none mb-4">
          <Box size={40} color="#009689" />
        </div>
        <h5 className="text-xl font-semibold">Tambah Menu Custom</h5>
        <p className="text-sm text-neutral-500">Masukkan nama, harga, serta HPP menu</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="block font-semibold">
            Nama Menu Custom <span className="text-red-600">*</span>
          </label>
          <input type="text" {...register("menuName")} placeholder="Masukkan nama menu custom disini..." className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
          {errors.menuName && <small className="text-red-500 text-sm">{errors.menuName.message}</small>}
        </div>

        <div className="space-y-1">
          <label className="block font-semibold">
            Harga <span className="text-red-600">*</span>
          </label>
          <input type="number" {...register("price")} placeholder="Masukkan harga disini..." className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
          {errors.price && <small className="text-red-500 text-sm">{errors.price.message}</small>}
        </div>

        <div className="space-y-1">
          <label className="block font-semibold">
            Estimasi HPP <span className="text-red-600">*</span>
          </label>
          <input type="number" {...register("hpp")} placeholder="Masukkan estimasi hpp disini..." className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
          {errors.hpp && <small className="text-red-500 text-sm">{errors.hpp.message}</small>}
        </div>

        <div className="space-y-4">
          <button type="submit" className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer">
            Tambah Menu Custom
          </button>
          <button type="button" className="w-full bg-white text-neutral-500 border border-neutral-300 rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={handleCloseModal}>
            Batalkan
          </button>
        </div>
      </form>
    </Modal>
  );
}
