"use client";
import { RefObject } from "react";
import { Modal, ModalHandle } from "@/component/modal";
import { RoundArrowLeftDown, RoundArrowRightUp } from "@solar-icons/react-perf/Bold";
import { CashflowHistory } from "@/features/shift/types";
import { formatCurrency } from "@/utils/format-currency";

interface CashflowInfoModalProps {
  ref: RefObject<ModalHandle | null>;
  onClose: () => void;
  cashflow: CashflowHistory;
}

export default function CashflowInfoModal({ ref, onClose, cashflow }: CashflowInfoModalProps) {
  const cashflowType = cashflow.type === "INCOME" ? `Pemasukan ${cashflow.label}` : `Pengeluaran ${cashflow.label}`;

  console.log(cashflow.information);

  return (
    <Modal ref={ref} className="bg-white p-4 pt-6 rounded-t-2xl">
      <div className="flex flex-col items-center mb-8">
        <div className={`size-20 grid place-content-center rounded-full text-4xl leading-none mb-4 ${cashflow.type === "INCOME" ? "bg-green-100" : "bg-red-100"}`}>
          {cashflow.type === "INCOME" ? <RoundArrowLeftDown size={48} color="#00c950" /> : <RoundArrowRightUp size={48} color="#e7000b" />}
        </div>
        <h5 className="text-2xl font-semibold">{formatCurrency(cashflow.amount)}</h5>
        <p className="text-neutral-500">{cashflowType}</p>
      </div>
      <div className="space-y-2 mb-4">
        <p className="block font-semibold">Keterangan</p>
        <div className="w-full py-2 px-3 rounded-lg border border-neutral-300">{cashflow.information}</div>
      </div>
      <button type="button" className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={onClose}>
        Tutup
      </button>
    </Modal>
  );
}
