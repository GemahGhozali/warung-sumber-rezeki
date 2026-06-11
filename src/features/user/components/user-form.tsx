"use client";

import Link from "next/link";
import ImageUploader from "@/component/image-uploader";
import { RoleSelections } from "./role-selections";
import { useCreateUserForm, useEditUserForm } from "../hooks";
import { EditUserInput } from "../schemas";

interface UserFormProps {
  user?: EditUserInput;
}

export default function UserForm({ user }: UserFormProps) {
  const { register, handleSubmit, setValue, watch, errors, state, isPending } = user ? useEditUserForm({ userData: user }) : useCreateUserForm();

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-6">
      <ImageUploader label="Foto Profil" fieldName="image" setValue={setValue} watch={watch} error={errors?.image?.message} imagePlaceholder="/images/avatar-placeholder.png" />

      <div className="space-y-1">
        <label className="block font-semibold">
          Nama Lengkap <span className="text-red-600">*</span>
        </label>
        <input type="text" {...register("name")} placeholder="Masukkan nama lengkap disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
        {errors.name && <small className="text-red-500 text-sm">{errors.name.message}</small>}
      </div>

      <div className="space-y-1">
        <label className="block font-semibold">
          Username <span className="text-red-600">*</span>
        </label>
        <input type="text" {...register("username")} placeholder="Masukkan username disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
        {errors.username && <small className="text-red-500 text-sm">{errors.username.message}</small>}
      </div>

      <div className="space-y-1">
        <label className="block font-semibold">
          Password <span className="text-red-600">*</span>
        </label>
        <input type="password" {...register("password")} placeholder="Masukkan password disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
        {errors.password && <small className="text-red-500 text-sm">{errors.password.message}</small>}
      </div>

      <RoleSelections register={register} errors={errors} />

      <button type="submit" disabled={isPending} className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer">
        {user ? "Edit Pengguna" : "Tambah Pengguna"}
      </button>
      <Link href="/user" className="flex justify-center w-full bg-white text-neutral-500 border border-neutral-300 rounded-lg px-4 py-2 font-medium">
        Batalkan
      </Link>
    </form>
  );
}
