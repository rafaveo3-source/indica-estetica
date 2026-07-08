"use client";

import { Breadcrumb } from "./Breadcrumb";
import { SearchInput } from "./SearchInput";
import { UserMenu } from "./UserMenu";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/60 bg-[#F7F8FC]/90 backdrop-blur-xl">
      <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
        <Breadcrumb />

        <div className="flex items-center gap-4">
          <SearchInput />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}