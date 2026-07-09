"use client";

import { ReferralKanbanCard } from "@/components/clinic/ReferralKanbanCard";
import { AppCard } from "@/components/shared/AppCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { useReferrals } from "@/hooks/useReferrals";
import type { Referral, ReferralPipelineStage } from "@/types/referral";

const PIPELINE_COLUMNS: Array<{ key: ReferralPipelineStage; title: string }> = [
  { key: "new", title: "Novas" },
  { key: "contacted", title: "Contato" },
  { key: "scheduled", title: "Agendadas" },
  { key: "completed", title: "Procedimento" },
  { key: "credited", title: "Crédito Liberado" },
];

function ColumnContent({
  referrals,
  stage,
  loading,
  onMoveBackward,
  onMoveForward,
}: {
  referrals: Referral[];
  stage: ReferralPipelineStage;
  loading: boolean;
  onMoveBackward: (id: string) => void;
  onMoveForward: (id: string) => void;
}) {
  const filtered = referrals.filter((referral) => referral.pipeline_stage === stage);

  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <EmptyState
        icon={<span className="text-2xl">📋</span>}
        title="Sem indicações"
        description="Ainda não há indicações nesta coluna."
      />
    );
  }

  return (
    <div className="space-y-3">
      {filtered.map((referral) => (
        <div key={referral.id} className="space-y-2">
          <ReferralKanbanCard referral={referral} />
          <div className="flex gap-2">
            <button
              type="button"
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
              onClick={() => onMoveBackward(referral.id)}
            >
              Etapa anterior
            </button>
            <button
              type="button"
              className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
              onClick={() => onMoveForward(referral.id)}
            >
              Próxima etapa
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ClinicIndicacoesPage() {
  const { referrals, loading, updatePipelineStage } = useReferrals();

  const moveToPreviousStage = async (id: string) => {
    const referral = referrals.find((item) => item.id === id);
    if (!referral) {
      return;
    }

    const currentIndex = PIPELINE_COLUMNS.findIndex((column) => column.key === referral.pipeline_stage);
    if (currentIndex <= 0) {
      return;
    }

    await updatePipelineStage(id, PIPELINE_COLUMNS[currentIndex - 1].key);
  };

  const moveToNextStage = async (id: string) => {
    const referral = referrals.find((item) => item.id === id);
    if (!referral) {
      return;
    }

    const currentIndex = PIPELINE_COLUMNS.findIndex((column) => column.key === referral.pipeline_stage);
    if (currentIndex === -1 || currentIndex >= PIPELINE_COLUMNS.length - 1) {
      return;
    }

    await updatePipelineStage(id, PIPELINE_COLUMNS[currentIndex + 1].key);
  };

  return (
    <main className="space-y-6">
      <AppCard>
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Indicações</h1>
            <p className="mt-2 text-sm text-slate-600">
              Acompanhamento das indicações da clínica.
            </p>
          </div>
        </div>
      </AppCard>

      <div className="grid gap-6 xl:grid-cols-5">
        {PIPELINE_COLUMNS.map((column) => {
          const filtered = referrals.filter((referral) => referral.pipeline_stage === column.key);

          return (
            <AppCard key={column.key} className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">{column.title}</h2>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                  {filtered.length}
                </span>
              </div>

              <ColumnContent
                referrals={referrals}
                stage={column.key}
                loading={loading}
                onMoveBackward={moveToPreviousStage}
                onMoveForward={moveToNextStage}
              />
            </AppCard>
          );
        })}
      </div>
    </main>
  );
}
