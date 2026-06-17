import Link from "next/link";
import { Plus } from "lucide-react";

export default function UserHeader() {
  return (
    <div className="flex justify-between items-end mb-4">
      <div>
        <h5 className="text-xl font-semibold">Akun Pengguna</h5>
        <p className="text-sm text-neutral-500">Daftar akun pengguna aplikasi</p>
      </div>
      <Link href="/dashboard/user/create" className="flex items-center gap-1.5 bg-teal-600 p-1.5 pl-3 pr-1.5 text-white text-sm rounded-lg font-medium cursor-pointer">
        Tambah <Plus size={16} />
      </Link>
    </div>
  );
}
