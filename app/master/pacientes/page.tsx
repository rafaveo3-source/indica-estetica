"use client";

import { Edit3, Plus, Share2, Trash2, Users, Wallet } from "lucide-react";
import { useMemo, useState } from "react";

import { AppCard } from "@/components/shared/AppCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { StatBadge } from "@/components/shared/StatBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePatients } from "@/hooks/usePatients";
import type { Patient, PatientStatus } from "@/types/patient";

const statusLabels: Record<PatientStatus, string> = {
  active: "Ativo",
  inactive: "Inativo",
  archived: "Arquivado",
};

export default function PatientsPage() {
  const {
    patients,
    loading,
    error,
    refresh,
    createPatient,
    updatePatient,
    deletePatient,
    searchPatients,
  } = usePatients();

  const [query, setQuery] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const filteredPatients = useMemo(() => patients, [patients]);

  const handleCreate = async () => {
    setSubmitting(true);
    setFeedback(null);

    try {
      await createPatient({
        name: "Novo Paciente",
        status: "active",
      });
      setFeedback("Paciente criado com sucesso.");
      await refresh();
    } catch (err) {
      setFeedback(
        err instanceof Error ? err.message : "Não foi possível criar o paciente.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (patient: Patient) => {
    setSubmitting(true);
    setFeedback(null);

    try {
      await updatePatient(patient.id, {
        status: patient.status === "active" ? "inactive" : "active",
      });
      setFeedback("Paciente atualizado com sucesso.");
      await refresh();
    } catch (err) {
      setFeedback(
        err instanceof Error ? err.message : "Não foi possível atualizar o paciente.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (patient: Patient) => {
    if (!window.confirm(`Excluir o paciente ${patient.name}?`)) {
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      await deletePatient(patient.id);
      setFeedback("Paciente removido com sucesso.");
      await refresh();
    } catch (err) {
      setFeedback(
        err instanceof Error ? err.message : "Não foi possível remover o paciente.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleShare = async (patient: Patient) => {
    if (!patient.referral_code) {
      setFeedback("Paciente sem código de indicação disponível.");
      return;
    }

    const shareText = `Indica Estética - Código de indicação: ${patient.referral_code}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Código de indicação",
          text: shareText,
        });
        setFeedback("Código compartilhado com sucesso.");
      } catch {
        setFeedback("Compartilhamento cancelado.");
      }
      return;
    }

    await navigator.clipboard.writeText(patient.referral_code);
    setFeedback("Código copiado para a área de transferência.");
  };

  const handleSearch = async (value: string) => {
    setQuery(value);
    await searchPatients(value);
  };

  return (
    <main className="space-y-8">
      <PageHeader
        eyebrow="Painel de Pacientes"
        title="Pacientes"
        description="Gerencie pacientes, códigos de indicação e saldo de recompensas."
        actions={
          <Button
            className="h-12 rounded-xl bg-[#5046E4] px-6 hover:bg-[#4338CA]"
            onClick={handleCreate}
            disabled={submitting}
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Paciente
          </Button>
        }
      />

      <AppCard>
        <SectionTitle
          title="Pacientes cadastrados"
          subtitle="Busque pacientes por nome, telefone, e-mail ou código de indicação."
          action={<StatBadge value={`${filteredPatients.length} paciente(s)`} />}
        />

        {feedback ? (
          <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            {feedback}
          </div>
        ) : null}

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Input
            value={query}
            onChange={(event) => {
              void handleSearch(event.target.value);
            }}
            placeholder="Buscar pacientes"
            className="max-w-md"
          />
          <Button variant="outline" onClick={() => void refresh()} disabled={submitting}>
            Atualizar
          </Button>
        </div>

        {loading && patients.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-sm text-slate-500">
            Carregando pacientes...
          </div>
        ) : null}

        {error ? (
          <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
            {error.message}
          </div>
        ) : null}

        {filteredPatients.length === 0 && !loading ? (
          <EmptyState
            icon={<Users size={34} />}
            title="Nenhum paciente encontrado"
            description="Cadastre o primeiro paciente para iniciar o fluxo de indicações."
          />
        ) : null}

        {filteredPatients.length > 0 ? (
          <div className="space-y-4">
            {filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-semibold text-slate-900">
                        {patient.name}
                      </h3>
                      <span className="rounded-full bg-[#EEEDFC] px-3 py-1 text-xs font-semibold uppercase tracking-[.2em] text-[#5046E4]">
                        {statusLabels[patient.status]}
                      </span>
                    </div>

                    <div className="text-sm text-slate-600">
                      <p>Código: {patient.referral_code ?? "—"}</p>
                      <p>WhatsApp: {patient.phone ?? "—"}</p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[280px]">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Wallet size={16} className="text-[#5046E4]" />
                        Saldo
                      </div>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        R$ {Number(patient.balance ?? 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <Users size={16} className="text-[#5046E4]" />
                        Indicações
                      </div>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        {patient.total_indications}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void handleEdit(patient)}
                    disabled={submitting}
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void handleDelete(patient)}
                    disabled={submitting}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void handleShare(patient)}
                    disabled={submitting || !patient.referral_code}
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </AppCard>
    </main>
  );
}
