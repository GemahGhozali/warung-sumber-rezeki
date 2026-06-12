"use client";

import { useRef } from "react";
import { ModalHandle } from "@/component/modal";
import OutcomeModal from "@/features/outcome/components/outcome-modal";
import IncomeModal from "@/features/income/components/income-modal";

interface ActionButtonsProps {
  currentCash: number;
}

export default function ActionButtons({ currentCash }: ActionButtonsProps) {
  const outcomeModalRef = useRef<ModalHandle>(null);
  const handleOpenOutcomeModal = () => outcomeModalRef.current?.openModal();
  const handleCloseOutcomeModal = () => outcomeModalRef.current?.closeModal();

  const incomeModalRef = useRef<ModalHandle>(null);
  const handleOpenIncomeModal = () => incomeModalRef.current?.openModal();
  const handleCloseIncomeModal = () => incomeModalRef.current?.closeModal();

  return (
    <>
      <div className="flex gap-4">
        <button type="button" className="w-full gap-1.5 bg-green-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={handleOpenIncomeModal}>
          Pemasukan
        </button>
        <button type="button" className="w-full gap-1.5 bg-red-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={handleOpenOutcomeModal}>
          Pengeluaran
        </button>
      </div>
      <OutcomeModal ref={outcomeModalRef} onClose={handleCloseOutcomeModal} currentCash={currentCash} />
      <IncomeModal ref={incomeModalRef} onClose={handleCloseIncomeModal} />
    </>
  );
}
