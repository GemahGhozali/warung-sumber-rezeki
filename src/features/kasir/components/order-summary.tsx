"use client";

import { useRef } from "react";
import { useCartStore } from "@/features/transaction/stores";
import { formatCurrency } from "@/utils/format-currency";
import { ModalHandle } from "@/component/modal";
import { CartLarge2, Banknote2 } from "@solar-icons/react-perf/BoldDuotone";
import CheckoutModal from "./checkout-modal";
import CustomMenuModalButton from "./custom-menu-modal-button";

export default function OrderSummary() {
  const checkoutModalRef = useRef<ModalHandle>(null);
  const handleOpenCheckoutModal = () => checkoutModalRef.current?.openModal();
  const handleCloseCheckoutModal = () => checkoutModalRef.current?.closeModal();

  const { cart, getTotalPrice } = useCartStore();

  return (
    <>
      <div className="bg-neutral-800 p-4 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-semibold text-white">Ringkasan Pemesanan</h5>
          <CustomMenuModalButton className="bg-white text-black" />
        </div>
        <hr className="border-neutral-300" />
        <div className="flex justify-between items-center text-sm text-neutral-300 font-semibold">
          <p className="flex items-center gap-1.5">
            <CartLarge2 size={20} color="#fff" /> Total Item
          </p>
          <p>{cart.length} Item</p>
        </div>
        <div className="flex justify-between items-center text-sm text-neutral-300 font-semibold">
          <p className="flex items-center gap-1.5">
            <Banknote2 size={20} color="#fff" /> Total Pembayaran
          </p>
          <p>{formatCurrency(getTotalPrice())}</p>
        </div>
        <button type="submit" className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer" onClick={handleOpenCheckoutModal}>
          Checkout Pemesanan
        </button>
      </div>
      <CheckoutModal ref={checkoutModalRef} onClose={handleCloseCheckoutModal} />
    </>
  );
}
