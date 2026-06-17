"use client";

import { RefObject } from "react";
import { Modal, ModalHandle } from "@/component/modal";
import { useCloseShiftForm } from "../hooks";
import { Banknote2, WalletMoney } from "@solar-icons/react-perf/BoldDuotone";
import { MinusCircle } from "@solar-icons/react-perf/Bold";
import { formatCurrency } from "@/utils/format-currency";

interface CloseShiftModalProps {
  ref: RefObject<ModalHandle | null>;
  onClose: () => void;
  expectedCash: number;
}

export default function CloseShiftModal({ ref, onClose, expectedCash }: CloseShiftModalProps) {
  const { actualCash, register, handleSubmit, errors, isPending } = useCloseShiftForm();

  return (
    <Modal ref={ref} className="bg-white p-4 pt-6 rounded-t-2xl">
      <div className="flex flex-col items-center mb-8 text-center">
        <img src="/images/store-illustration.png" className="size-[100px] mb-4" />
        <h5 className="text-xl font-semibold mb-0.5">Sudah Waktunya Tutup Toko 👋</h5>
        <p className="text-sm text-neutral-500">Masukkan nominal kas yang anda pegang sekarang untuk menyelesaikan operasional hari ini</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6 text-left">
        <div className="space-y-2">
          <label className="block font-semibold">
            Kas Yang Sebenarnya <span className="text-red-600">*</span>
          </label>
          <input type="number" {...register("actualCash")} placeholder="Masukkan kas yang sebenarnya disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
          {errors.actualCash && <small className="text-red-500 text-sm">{errors.actualCash.message}</small>}
        </div>

        <FinalCashflowSummary expectedCash={expectedCash} actualCash={actualCash} />

        <div className="space-y-4">
          <button type="submit" className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer">
            Tutup Toko Sekarang
          </button>
          <button type="button" className="w-full bg-white text-neutral-500 border border-neutral-300 rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={onClose}>
            Jangan Tutup Dulu
          </button>
        </div>
      </form>
    </Modal>
  );
}

function FinalCashflowSummary({ expectedCash, actualCash }: { expectedCash: number; actualCash: number }) {
  const cashDifferences = actualCash - expectedCash;

  return (
    <div className="space-y-2">
      <p className="font-semibold">Ringkasan Akhir Kas</p>
      <div className="p-3 bg-white border border-neutral-300 rounded-lg space-y-3">
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <WalletMoney size={20} color="#009689" /> Kas Yang Tercatat
          </p>
          <p className="text-sm font-semibold">{formatCurrency(expectedCash)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <Banknote2 size={20} color="#00c950" /> Kas Yang Sebenarnya
          </p>
          <p className="text-sm font-semibold">{formatCurrency(actualCash)}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm text-neutral-500 font-semibold flex items-center gap-1.5">
            <MinusCircle size={20} color="#e7000b" /> Selisih Kas
          </p>
          <p className={`text-sm font-semibold ${getCashDifferenceColor(cashDifferences)}`}>{getFinalCashDifference(cashDifferences)}</p>
        </div>
      </div>
    </div>
  );
}

const getCashDifferenceColor = (cashDifference: number) => {
  if (cashDifference === 0) return "text-black";
  if (cashDifference > 0) return "text-green-500";
  return "text-red-500";
};

function getFinalCashDifference(cashDifference: number) {
  if (cashDifference === 0) return "Rp 0";
  if (cashDifference > 0) return `+ ${formatCurrency(cashDifference)}`;
  return `- ${formatCurrency(Math.abs(cashDifference))}`;
}
