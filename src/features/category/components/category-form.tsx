"use client";

import Link from "next/link";
import { CategoryInput } from "../schemas";
import { useCreateCategoryForm, useEditCategoryForm } from "../hooks";

interface EditCategoryFormProps {
  category?: CategoryInput;
}

export default function CategoryForm({ category }: EditCategoryFormProps) {
  const { register, handleSubmit, errors, isPending } = category ? useEditCategoryForm({ categoryData: category }) : useCreateCategoryForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 h-full flex flex-col">
      <div className="space-y-1">
        <label className="block font-semibold">
          Nama Kategori <span className="text-red-600">*</span>
        </label>
        <input type="text" {...register("name")} placeholder="Masukkan nama kategori disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
        {errors.name && <small className="text-red-500 text-sm">{errors.name.message}</small>}
      </div>
      <div className="space-y-1">
        <label className="block font-semibold">
          Keterangan <span className="text-red-600">*</span>
        </label>
        <textarea {...register("information")} placeholder="Masukkan keterangan disini..." rows={3} disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300"></textarea>
        {errors.information && <small className="text-red-500 text-sm">{errors.information.message}</small>}
      </div>
      <div className="space-y-4 mt-auto">
        <button type="submit" disabled={isPending} className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer">
          {category ? "Edit Kategori" : "Tambah Kategori"}
        </button>
        <Link href="/dashboard/menu/category" className="flex justify-center w-full bg-white text-neutral-500 border border-neutral-300 rounded-lg px-4 py-2 font-medium">
          Batalkan
        </Link>
      </div>
    </form>
  );
}
