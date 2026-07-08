"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function Breadcrumb() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Bom dia"
      : hour < 18
      ? "Boa tarde"
      : "Boa noite";

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {greeting}, Rafael 👋
      </h1>

      <p className="mt-1 text-sm text-slate-500">
        {format(new Date(), "EEEE, dd 'de' MMMM", {
          locale: ptBR,
        })}
      </p>
    </div>
  );
}