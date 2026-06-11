"use client";

import Link from "next/link";
import ImageUploader from "@/component/image-uploader";
import CategorySelections from "./category-selections";
import { MenuInput } from "../schemas";
import { useCreateMenuForm, useEditMenuForm } from "../hooks";
import { Category } from "@/generated/prisma/client";

interface MenuFormProps {
  categories: Category[];
  menu?: MenuInput;
}

export default function MenuForm({ categories, menu }: MenuFormProps) {
  const { register, handleSubmit, setValue, watch, errors, state, isPending } = menu ? useEditMenuForm({ menuData: menu }) : useCreateMenuForm();

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6">
      <ImageUploader label="Foto Menu" fieldName="image" setValue={setValue} watch={watch} error={errors?.image?.message} imagePlaceholder="/images/menu-placeholder.png" />

      <div className="space-y-1">
        <label className="block font-semibold">
          Nama Menu <span className="text-red-600">*</span>
        </label>
        <input type="text" {...register("name")} placeholder="Masukkan nama menu disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
        {errors.name && <small className="text-red-500 text-sm">{errors.name.message}</small>}
      </div>

      <div className="space-y-1">
        <label className="block font-semibold">
          Harga <span className="text-red-600">*</span>
        </label>
        <input type="number" {...register("price")} placeholder="Masukkan harga disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
        {errors.price && <small className="text-red-500 text-sm">{errors.price.message}</small>}
      </div>

      <div className="space-y-1">
        <label className="block font-semibold">
          Estimasi HPP <span className="text-red-600">*</span>
        </label>
        <input type="number" {...register("hpp")} placeholder="Masukkan estimasi hpp disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
        {errors.hpp && <small className="text-red-500 text-sm">{errors.hpp.message}</small>}
      </div>

      <div className="space-y-1">
        <label className="block font-semibold">
          Stok Menu <span className="text-red-600">*</span>
        </label>
        <input type="number" {...register("stock")} placeholder="Masukkan stok menu disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
        {errors.stock && <small className="text-red-500 text-sm">{errors.stock.message}</small>}
      </div>

      <CategorySelections categories={categories} register={register} errors={errors} />

      <button type="submit" disabled={isPending} className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer">
        {menu ? "Edit Menu" : "Tambah Menu"}
      </button>
      <Link href="/menu" className="flex justify-center w-full bg-white text-neutral-500 border border-neutral-300 rounded-lg px-4 py-2 font-medium">
        Batalkan
      </Link>
    </form>
  );
}
