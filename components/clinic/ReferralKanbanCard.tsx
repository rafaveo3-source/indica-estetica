import { AppCard } from "@/components/shared/AppCard";
import type { Referral } from "@/types/referral";

type Props = {
  referral: Referral;
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
  }).format(new Date(value));
}

export function ReferralKanbanCard({ referral }: Props) {
  return (
    <AppCard className="p-4 shadow-sm hover:translate-y-0">
      <div className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {referral.patient_name ?? "Paciente não informado"}
          </p>
          <p className="text-sm text-slate-600">{referral.referred_name}</p>
        </div>

        <div className="space-y-1 text-sm text-slate-600">
          <p>Telefone: {referral.referred_phone ?? "—"}</p>
          <p>Valor: {formatCurrency(referral.reward_amount)}</p>
          <p>Data: {formatDate(referral.created_at)}</p>
          <p>Status: {referral.status}</p>
        </div>
      </div>
    </AppCard>
  );
}
