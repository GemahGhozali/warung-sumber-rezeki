"use client";

import { RefObject } from "react";
import { Modal, ModalHandle } from "@/component/modal";
import { DangerTriangle } from "@solar-icons/react-perf/Bold";

interface DeleteConfirmationModalProps {
  children: React.ReactNode;
  ref: RefObject<ModalHandle | null>;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteConfirmationModal({ children, ref, onClose, onDelete }: DeleteConfirmationModalProps) {
  return (
    <Modal ref={ref} className="bg-white p-4 pt-6 rounded-t-2xl">
      <div className="flex flex-col items-center mb-6 text-center">
        <div className="size-20 bg-red-100 grid place-content-center rounded-full text-4xl leading-none mb-4">
          <DangerTriangle size={40} color="#e7000b" />
        </div>
        <h5 className="text-xl font-semibold mb-1">Anda yakin ingin menghapus?</h5>
        <p className="text-sm text-neutral-500">{children}</p>
      </div>
      <div className="space-y-4">
        <button type="submit" className="w-full bg-red-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={onDelete}>
          Hapus
        </button>
        <button type="button" className="w-full bg-white text-neutral-500 border border-neutral-300 rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={onClose}>
          Batalkan
        </button>
      </div>
    </Modal>
  );
}
