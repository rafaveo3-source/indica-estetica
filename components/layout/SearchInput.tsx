"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchInput() {
  return (
    <div className="relative hidden w-full max-w-md lg:block">
      <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

      <Input
        placeholder="Pesquisar..."
        className="h-11 rounded-2xl border-0 bg-white pl-11 shadow-soft"
      />
    </div>
  );
}