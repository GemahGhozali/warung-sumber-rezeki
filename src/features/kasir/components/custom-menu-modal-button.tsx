"use client";

import { ModalHandle } from "@/component/modal";
import { Utensils } from "lucide-react";
import { useRef } from "react";
import CustomMenuModal from "./custom-menu-modal";

export default function CustomMenuModalButton() {
  const customMenuModalRef = useRef<ModalHandle>(null);
  const handleOpenCustomMenuModal = () => customMenuModalRef.current?.openModal();
  const handleCloseCustomMenuModal = () => customMenuModalRef.current?.closeModal();

  return (
    <>
      <button className="grid place-content-center rounded-full size-10 border border-neutral-300 cursor-pointer" onClick={handleOpenCustomMenuModal}>
        <Utensils size={20} />
      </button>
      <CustomMenuModal ref={customMenuModalRef} onClose={handleCloseCustomMenuModal} />
    </>
  );
}
