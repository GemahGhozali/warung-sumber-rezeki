"use client";

import { useRef } from "react";
import { ModalHandle } from "@/component/modal";
import IncomeModal from "@/features/income/components/income-modal";

export default function IncomeModalButton() {
  const incomeModalRef = useRef<ModalHandle>(null);
  const handleOpenIncomeModal = () => incomeModalRef.current?.openModal();
  const handleCloseIncomeModal = () => incomeModalRef.current?.closeModal();

  return (
    <>
      <button type="button" className="w-full gap-1.5 bg-green-600 text-white rounded-lg pl-3 pr-1.5 py-1.5 font-medium text-sm cursor-pointer" onClick={handleOpenIncomeModal}>
        Pemasukan +
      </button>
      <IncomeModal ref={incomeModalRef} onClose={handleCloseIncomeModal} />
    </>
  );
}
