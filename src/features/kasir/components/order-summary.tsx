"use client";

import { useRef } from "react";
import { useCartStore } from "@/features/transaction/stores";
import { formatCurrency } from "@/utils/format-currency";
import { ModalHandle } from "@/component/modal";
import CheckoutModal from "./checkout-modal";

export default function OrderSummary() {
  const checkoutModalRef = useRef<ModalHandle>(null);
  const handleOpenCheckoutModal = () => checkoutModalRef.current?.openModal();
  const handleCloseCheckoutModal = () => checkoutModalRef.current?.closeModal();

  const { cart, getTotalPrice } = useCartStore();

  return (
    <>
      <div className="bg-neutral-800 p-4 rounded-2xl space-y-4">
        <h5 className="font-semibold text-white">Ringkasan Pemesanan</h5>
        <hr className="border-white" />
        <div className="flex justify-between items-center text-sm text-neutral-300 font-semibold">
          <p>Total Item</p>
          <p>{cart.length} Item</p>
        </div>
        <div className="flex justify-between items-center text-sm text-neutral-300 font-semibold">
          <p>Total Pembayaran</p>
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
