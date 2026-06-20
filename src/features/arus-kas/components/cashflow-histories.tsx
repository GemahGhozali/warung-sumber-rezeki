"use client";

import CahsflowHistoryCard from "./cashflow-history-card";
import { WalletMoney } from "@solar-icons/react-perf/BoldDuotone";
import { CashflowHistory } from "@/features/shift/types";
import CashflowInfoModal from "./cahsflow-info-modal";
import { useRef, useState } from "react";
import { ModalHandle } from "@/component/modal";

interface CashflowHistoriesProps {
  cashflow: CashflowHistory[];
}

export default function CashflowHistories({ cashflow }: CashflowHistoriesProps) {
  if (cashflow.length === 0) {
    return (
      <div className="p-6 flex flex-col h-full justify-center items-center rounded-2xl">
        <div className="bg-teal-100/50 size-[60px] shrink-0 rounded-full grid place-content-center mb-3">
          <WalletMoney size={32} color="#009689" />
        </div>
        <h6 className="font-semibold mb-0.5">Uang kas masih utuh</h6>
        <p className="text-neutral-500 text-sm">Setiap mutasi kas akan terlihat disini</p>
      </div>
    );
  }

  const [selectedHistory, setSelectedHistory] = useState<CashflowHistory>(cashflow[0]);

  const cashflowInfoModalRef = useRef<ModalHandle>(null);

  const handleCloseModal = () => cashflowInfoModalRef.current?.closeModal();

  const handleOpenModal = (history: CashflowHistory) => {
    setSelectedHistory(history);
    cashflowInfoModalRef.current?.openModal();
  };

  return (
    <>
      <ul className="space-y-4">
        {cashflow.map((history) => (
          <CahsflowHistoryCard key={history.id} history={history} onClick={() => handleOpenModal(history)} />
        ))}
      </ul>
      <CashflowInfoModal ref={cashflowInfoModalRef} onClose={handleCloseModal} cashflow={selectedHistory} />
    </>
  );
}
