"use client";

import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function UserMenu() {
  return (
    <div className="flex items-center gap-4">
      <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-card transition hover:scale-105">
        <Bell className="h-5 w-5 text-slate-600" />
      </button>

      <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-2 shadow-card">
        <Avatar className="h-10 w-10">
          <AvatarFallback>RA</AvatarFallback>
        </Avatar>

        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold text-slate-900">
            Rafael
          </p>

          <p className="text-xs text-slate-500">
            Master
          </p>
        </div>
      </div>
    </div>
  );
}