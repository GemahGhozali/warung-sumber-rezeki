"use client";

import { X } from "lucide-react";
import { useLoginForm } from "@/features/auth/hooks";

export default function LoginPage() {
  const { register, handleSubmit, errors, state, isPending } = useLoginForm();

  return (
    <div className="bg-teal-500 h-full flex flex-col justify-end items-center bg-[url('/images/auth-background.png')] bg-cover bg-center">
      <form onSubmit={handleSubmit} className="w-full space-y-4 p-4 pt-6 bg-neutral-50 rounded-t-3xl shadow-[0px_0px_16px_0px_rgba(0,_0,_0,_0.2)]">
        <div className="flex flex-col items-center mb-8 text-center">
          <img src="/images/store-illustration.png" className="size-[100px] mb-6" />
          <h5 className="text-xl font-semibold mb-0.5">Selamat Datang Kembali 👋</h5>
          <p className="text-sm text-neutral-500">Silahkan login untuk menggunakan aplikasi</p>
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
        <button type="submit" disabled={isPending} className="w-full bg-teal-600 text-white rounded-lg px-4 py-2 font-medium cursor-pointer">
          Login dan Gunakan Aplikasi
        </button>
        {!state?.success && state?.message && (
          <div className="p-3 bg-red-100 rounded-lg flex items-center gap-1.5">
            <X size={24} className="text-red-500" />
            <p className="text-red-500">{state.message}</p>
          </div>
        )}
      </form>
    </div>
  );
}
