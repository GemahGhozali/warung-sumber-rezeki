"use client";

import { useRef } from "react";
import { ModalHandle } from "@/component/modal";
import { Plus } from "lucide-react";
import CustomMenuModal from "./custom-menu-modal";

interface CustomMenuModalButtonProps {
  className?: string;
}

export default function CustomMenuModalButton({ className = "bg-teal-600 text-white" }: CustomMenuModalButtonProps) {
  const customMenuModalRef = useRef<ModalHandle>(null);
  const handleOpenCustomMenuModal = () => customMenuModalRef.current?.openModal();
  const handleCloseCustomMenuModal = () => customMenuModalRef.current?.closeModal();

  return (
    <>
      <button className={`flex items-center gap-1.5 p-1.5 pl-3 pr-1.5 text-sm rounded-lg font-medium cursor-pointer ${className}`} onClick={handleOpenCustomMenuModal}>
        Custom <Plus size={16} />
      </button>
      <CustomMenuModal ref={customMenuModalRef} onClose={handleCloseCustomMenuModal} />
    </>
  );
}
