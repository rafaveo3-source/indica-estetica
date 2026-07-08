"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange(value: string): void;
  placeholder?: string;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Pesquisar...",
}: Props) {
  return (
    <div className="relative w-full max-w-md">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 outline-none transition focus:border-[#5046E4]"
      />

    </div>
  );
}
