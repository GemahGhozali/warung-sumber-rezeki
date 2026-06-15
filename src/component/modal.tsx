"use client";

import { useImperativeHandle, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";

export interface ModalHandle {
  openModal: () => void;
  closeModal: () => void;
}

interface ModalProps {
  ref: React.Ref<ModalHandle>;
  children: ReactNode;
  className?: string;
}

export function Modal({ ref, className = "", children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);
  const [isClosing, setIsClosing] = useState(false);

  const executeClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.close();
      }
      setIsClosing(false);
    }, 300);
  };

  useImperativeHandle(ref, () => {
    return {
      closeModal: () => {
        executeClose();
      },
      openModal: () => {
        if (modalRef.current) {
          modalRef.current.showModal();
        }
      },
    };
  }, []);

  const handleCloseModal = (e: MouseEvent<HTMLDialogElement>) => {
    if (!modalRef.current) return;
    if (e.target === modalRef.current) executeClose();
  };

  return (
    <dialog
      ref={modalRef}
      className={`
      fixed bottom-0 left-1/2 -translate-x-1/2 z-50 bg-transparent w-full max-w-[430px] h-fit my-0 mt-auto
      backdrop:bg-black/30 backdrop:transition-opacity backdrop:duration-300 duration-300 ease-out starting:open:translate-y-full starting:open:opacity-0 ${isClosing ? "open:translate-y-full" : "open:translate-y-0"}
    `}
      onClick={handleCloseModal}
    >
      <div className={`mx-auto ${className}`}>{children}</div>
    </dialog>
  );
}
