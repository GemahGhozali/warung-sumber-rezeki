"use client";

import Link from "next/link";

export default function CartEmptyState() {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center">
      <h5 className="text-lg font-semibold">Keranjang belanja kosong</h5>
      <p className="text-neutral-500 text-sm mb-2">Silahkan tambahkan menu untuk membuat transaksi</p>
      <Link href="/kasir" type="button" className="bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer">
        Kembali ke kasir
      </Link>
    </div>
  );
}
