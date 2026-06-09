"use client";

import Link from "next/link";

interface CategoryErrorPageProps {
  error: Error & { digest?: string };
}

export default function EditCategoryErrorPage({ error }: CategoryErrorPageProps) {
  return (
    <div className="p-4 h-full flex justify-center items-center flex-col">
      <h5 className="text-xl font-semibold">Terjadi Kesalahan!</h5>
      <p className="text-neutral-500 mb-2">{error.message}</p>
      <Link href="/category" className="bg-teal-600 text-white rounded-lg px-4 py-2 font-medium">
        Kembali ke halaman kategori
      </Link>
    </div>
  );
}
