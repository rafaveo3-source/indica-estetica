"use client";

import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function ClinicSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Pesquisar clínica..."
        className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 outline-none transition focus:border-[#5046E4]"
      />
    </div>
  );
}
