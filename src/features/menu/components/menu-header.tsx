import Link from "next/link";
import { Layers, Plus } from "lucide-react";

export default function MenuHeader() {
  return (
    <>
      <h5 className="text-xl font-semibold">Daftar Menu</h5>
      <p className="text-sm text-neutral-500 mb-4">Daftar menu yang tersedia pada aplikasi</p>
      <div className="flex gap-4 mb-4">
        <Link href="/dashboard/menu/create" className="w-full flex justify-center items-center gap-1.5 bg-teal-600 px-4 pr-2 py-2 text-white rounded-lg font-medium cursor-pointer">
          Tambah Menu <Plus size={16} />
        </Link>
        <Link href="/dashboard/menu/category" className="w-full flex justify-center items-center gap-1.5 bg-white px-4 pr-2 py-2 text-neutral-500 rounded-lg font-medium cursor-pointer border border-neutral-300">
          Kategori Menu <Layers size={16} />
        </Link>
      </div>
    </>
  );
}
