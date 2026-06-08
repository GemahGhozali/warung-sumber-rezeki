"use client";

import { X } from "lucide-react";
import { useLoginForm } from "@/features/auth/hooks";

export default function LoginPage() {
  const { register, handleSubmit, errors, state, isPending } = useLoginForm();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="space-y-1">
        <label className="block font-semibold">Username</label>
        <input type="text" {...register("username")} placeholder="Masukkan username disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
        {errors.username && <small className="text-red-500 text-sm">{errors.username.message}</small>}
      </div>
      <div className="space-y-1">
        <label className="block font-semibold">Password</label>
        <input type="password" {...register("password")} placeholder="Masukkan password disini..." disabled={isPending} className="w-full py-2 px-3 rounded-lg border border-neutral-300" />
        {errors.password && <small className="text-red-500 text-sm">{errors.password.message}</small>}
      </div>
      <button type="submit" disabled={isPending} className="w-full bg-teal-600 text-white rounded-lg p-2 font-medium">
        Login
      </button>
      {!state?.success && state?.message && (
        <div className="p-3 bg-red-100 rounded-lg flex items-center gap-1.5">
          <X size={24} className="text-red-500" />
          <p className="text-red-500">{state.message}</p>
        </div>
      )}
    </form>
  );
}
