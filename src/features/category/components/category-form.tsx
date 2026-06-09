"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { CategoryInput } from "../schemas";
import { useCreateCategoryForm, useEditCategoryForm } from "../hooks";

interface EditCategoryFormProps {
  category?: CategoryInput;
}

export default function CategoryForm({ category }: EditCategoryFormProps) {
  const { register, handleSubmit, errors, state, isPending } = category ? useEditCategoryForm({ categoryData: category }) : useCreateCategoryForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-1">
        <label className="block font-semibold">Nama Kategori</label>
        <input type="text" {...register("name")} placeholder="Masukkan nama kategori disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
        {errors.name && <small className="text-red-500 text-sm">{errors.name.message}</small>}
      </div>
      <div className="space-y-1">
        <label className="block font-semibold">Keterangan</label>
        <textarea {...register("information")} placeholder="Masukkan keterangan disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300"></textarea>
        {errors.information && <small className="text-red-500 text-sm">{errors.information.message}</small>}
      </div>
      <button type="submit" disabled={isPending} className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer">
        Edit Kategori
      </button>
      <Link href="/category" className="flex justify-center w-full bg-white text-neutral-500 border border-neutral-300 rounded-lg px-4 py-2 font-medium">
        Batalkan
      </Link>
      {!state?.success && state?.message && (
        <div className="p-3 bg-red-100 rounded-lg flex items-center gap-1.5">
          <X size={24} className="text-red-500" />
          <p className="text-red-500">{state.message}</p>
        </div>
      )}
    </form>
  );
}
