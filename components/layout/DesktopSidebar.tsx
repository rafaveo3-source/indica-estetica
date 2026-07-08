"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { Logo } from "@/components/brand/Logo";
import { masterNavigation } from "@/config/navigation/master";
import { cn } from "@/lib/utils";

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200/70 bg-white border-border bg-white xl:flex xl:flex-col">

      <div className="border-b border-border p-8">
        <Logo />
      </div>

      <div className="px-6 py-6">

        <div className="bg-[#5046E4] text-white rounded-2xl p-5 text-white shadow-card">

          <p className="text-xs uppercase tracking-[0.08em]st text-white/70">
            Clínica Ativa
          </p>

          <h2 className="mt-2 text-lg font-bold">
            Indica Estética
          </h2>

          <p className="mt-1 text-sm text-white/80">
            Plano Premium
          </p>

        </div>

      </div>

      <nav className="flex-1 px-4">

        {masterNavigation.map((item) => {

          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`);

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group mb-2 flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-200",

                active
                  ? "bg-[#5046E4] text-white text-white shadow-card"
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >

              <div className="flex items-center gap-3">

                <Icon size={20} />

                <span className="font-semibold">
                  {item.title}
                </span>

              </div>

              <ChevronRight
                size={18}
                className={cn(
                  "transition",

                  active
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                )}
              />

            </Link>
          );
        })}

      </nav>

      <div className="border-t border-border p-6">

        <div className="rounded-2xl bg-slate-50 p-4">

          <p className="text-xs uppercase tracking-[0.08em]r text-slate-400">
            Sistema
          </p>

          <p className="mt-2 font-semibold">
            Indica Estética
          </p>

          <p className="text-sm text-slate-500">
            MVP • v0.1.0
          </p>

        </div>

      </div>

    </aside>
  );
}