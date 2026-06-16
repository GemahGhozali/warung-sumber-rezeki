"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CustomMenuModalButton from "./custom-menu-modal-button";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialSearchValue = searchParams.get("search") || "";
  const [value, setValue] = useState(initialSearchValue);

  useEffect(() => {
    setValue(searchParams.get("search") || "");
  }, [searchParams]);

  const handleSearch = (inputValue: string) => {
    setValue(inputValue);
    const params = new URLSearchParams(searchParams.toString());
    inputValue.trim() ? params.set("search", inputValue) : params.delete("search");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="absolute top-4 inset-x-4 flex items-center pr-2 bg-white rounded-2xl">
      <input type="text" value={value} onChange={(e) => handleSearch(e.target.value)} placeholder="Cari nama menu disini..." className="w-full py-3 pl-4 rounded-lg bg-white text-neutral-900 placeholder-neutral-500 outline-none" />
      <CustomMenuModalButton />
    </div>
  );
}
