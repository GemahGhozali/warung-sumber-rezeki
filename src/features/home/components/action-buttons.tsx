"use client";

import { useRef } from "react";
import { logoutAction } from "@/features/auth/actions";
import { ModalHandle } from "@/component/modal";
import { ActiveShift } from "@/features/shift/types";
import CloseShiftModal from "@/features/shift/components/close-shift-modal";

interface ActionButtonsProps {
  shift: ActiveShift;
}

export default function ActionButtons({ shift }: ActionButtonsProps) {
  const closeShiftModalRef = useRef<ModalHandle>(null);
  const handleOpenModal = () => closeShiftModalRef.current?.openModal();
  const handleCloseModal = () => closeShiftModalRef.current?.closeModal();
  const handleLogout = async () => await logoutAction();

  return (
    <>
      <div className="flex gap-4">
        <button type="button" className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={handleOpenModal}>
          Tutup Toko
        </button>
        <button type="button" className="w-full bg-red-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <CloseShiftModal ref={closeShiftModalRef} onClose={handleCloseModal} expectedCash={shift.expectedCash} />
    </>
  );
}
