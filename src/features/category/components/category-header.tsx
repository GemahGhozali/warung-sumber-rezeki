import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

export default function CategoryHeader() {
  return (
    <>
      <Link href="/dashboard/menu" className="bg-white grid place-content-center shrink-0 rounded-full size-10 border border-neutral-300 mb-6">
        <ArrowLeft size={24} />
      </Link>
      <div className="flex justify-between items-end mb-4">
        <div>
          <h5 className="text-xl font-semibold">Daftar Kategori Menu</h5>
          <p className="text-sm text-neutral-500">Daftar kategori menu yang tersedia</p>
        </div>
        <Link href="/dashboard/menu/category/create" className="flex items-center gap-1.5 bg-teal-600 p-1.5 pl-3 pr-1.5 text-white text-sm rounded-lg font-medium cursor-pointer">
          Tambah <Plus size={16} />
        </Link>
      </div>
    </>
  );
}
