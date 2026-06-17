"use client";

import { useRef } from "react";
import { ModalHandle } from "@/component/modal";
import OpenShiftModal from "./open-shift-modal";

export default function ShiftEmptyState() {
  const openShiftModalRef = useRef<ModalHandle>(null);
  const handleOpenModal = () => openShiftModalRef.current?.openModal();
  const handleCloseModal = () => openShiftModalRef.current?.closeModal();

  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <img src="/images/store-illustration.png" className="size-[100px] mb-3" />
      <h5 className="text-lg font-semibold">Kamu belum membuka toko</h5>
      <p className="text-neutral-500 text-sm mb-2">Silahkan buka toko untuk memulai operasional</p>
      <button type="button" className="bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={handleOpenModal}>
        Buka Toko Sekarang
      </button>
      <OpenShiftModal ref={openShiftModalRef} onClose={handleCloseModal} />
    </div>
  );
}
