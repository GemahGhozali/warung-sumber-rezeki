"use client";

import { useRef } from "react";
import { ModalHandle } from "@/component/modal";
import OutcomeModal from "@/features/outcome/components/outcome-modal";

interface OutcomeModalButtonProps {
  currentCash: number;
}

export default function OutcomeModalButton({ currentCash }: OutcomeModalButtonProps) {
  const outcomeModalRef = useRef<ModalHandle>(null);
  const handleOpenOutcomeModal = () => outcomeModalRef.current?.openModal();
  const handleCloseOutcomeModal = () => outcomeModalRef.current?.closeModal();

  return (
    <>
      <button type="button" className="w-full gap-1.5 bg-red-600 text-white rounded-lg pl-3 pr-1.5 py-1.5 font-medium text-sm cursor-pointer" onClick={handleOpenOutcomeModal}>
        Pengeluaran -
      </button>
      <OutcomeModal ref={outcomeModalRef} onClose={handleCloseOutcomeModal} currentCash={currentCash} />
    </>
  );
}
