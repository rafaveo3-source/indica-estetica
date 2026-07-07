import { Menu } from "lucide-react";
import { LogoMark } from "@/components/brand/LogoMark";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white/90 px-5 backdrop-blur lg:hidden">
      <div className="flex items-center gap-3">
        <LogoMark size={34} />
        <span className="font-semibold">Indica Estética</span>
      </div>

      <button className="rounded-xl p-2 hover:bg-slate-100">
        <Menu size={22} />
      </button>
    </header>
  );
}