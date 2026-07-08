"use client";

import { Building2, Plus } from "lucide-react";
import { useState, type FormEvent } from "react";

import { AppCard } from "@/components/shared/AppCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { StatBadge } from "@/components/shared/StatBadge";

import ClinicTable from "@/components/features/clinics/ClinicTable";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useClinics } from "@/hooks/useClinics";
import type { Clinic, ClinicPlan, ClinicStatus } from "@/types/clinic";

const emptyForm = {
  name: "",
  slug: "",
  email: "",
  phone: "",
  plan: "trial" as ClinicPlan,
  status: "active" as ClinicStatus,
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function ClinicsPage() {
  const {
    clinics,
    loading,
    error,
    refresh,
    createClinic,
    updateClinic,
    deleteClinic,
  } = useClinics();

  const [open, setOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [feedback, setFeedback] = useState<string | null>(null);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingClinic(null);
  };

  const handleOpenCreate = () => {
    resetForm();
    setOpen(true);
  };

  const handleOpenEdit = (clinic: Clinic) => {
    setEditingClinic(clinic);
    setForm({
      name: clinic.name,
      slug: clinic.slug,
      email: clinic.email ?? "",
      phone: clinic.phone ?? "",
      plan: clinic.plan,
      status: clinic.status,
    });
    setOpen(true);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFeedback(null);

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || slugify(form.name),
      email: form.email.trim() || null,
      phone: form.phone.trim() || null,
      plan: form.plan,
      status: form.status,
    };

    try {
      if (editingClinic) {
        await updateClinic(editingClinic.id, payload);
        setFeedback("Clínica atualizada com sucesso.");
      } else {
        await createClinic(payload);
        setFeedback("Clínica cadastrada com sucesso.");
      }

      setOpen(false);
      resetForm();
      await refresh();
    } catch (err) {
      setFeedback(
        err instanceof Error ? err.message : "Não foi possível salvar a clínica.",
      );
    }
  };

  const handleDelete = async (clinic: Clinic) => {
    if (!window.confirm(`Excluir a clínica ${clinic.name}?`)) {
      return;
    }

    try {
      await deleteClinic(clinic.id);
      setFeedback("Clínica removida com sucesso.");
      await refresh();
    } catch (err) {
      setFeedback(
        err instanceof Error ? err.message : "Não foi possível remover a clínica.",
      );
    }
  };

  return (
    <main className="space-y-8">
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          setOpen(nextOpen);

          if (!nextOpen) {
            resetForm();
          }
        }}
      >
        <PageHeader
          eyebrow="Painel Master"
          title="Clínicas"
          description="Gerencie todas as clínicas cadastradas na plataforma."
          actions={
            <DialogTrigger>
              <Button className="h-12 rounded-xl bg-[#5046E4] px-6 hover:bg-[#4338CA]" onClick={handleOpenCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Clínica
              </Button>
            </DialogTrigger>
          }
        />

        <AppCard>
          <SectionTitle
            title="Clínicas cadastradas"
            subtitle="Todas as clínicas registradas no sistema."
            action={<StatBadge value={`${clinics.length} clínica(s)`} />}
          />

          {feedback ? (
            <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              {feedback}
            </div>
          ) : null}

          {loading && clinics.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-white px-4 py-8 text-sm text-slate-500">
              Carregando clínicas...
            </div>
          ) : null}

          {error ? (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
              {error.message}
            </div>
          ) : null}

          {clinics.length === 0 && !loading ? (
            <EmptyState
              icon={<Building2 size={34} />}
              title="Nenhuma clínica cadastrada"
              description="Cadastre a primeira clínica para iniciar o ecossistema do Indica Estética."
            />
          ) : (
            <ClinicTable
              clinics={clinics}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          )}
        </AppCard>

        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingClinic ? "Editar clínica" : "Nova clínica"}
            </DialogTitle>
            <DialogDescription>
              {editingClinic
                ? "Atualize os dados da clínica selecionada."
                : "Cadastre uma nova clínica no banco de dados."}
            </DialogDescription>
          </DialogHeader>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                  placeholder="Nome da clínica"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, slug: event.target.value }))
                  }
                  placeholder="slug-da-clinica"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan">Plano</Label>
                <select
                  id="plan"
                  value={form.plan}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      plan: event.target.value as ClinicPlan,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                >
                  <option value="trial">Trial</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                  placeholder="contato@clinica.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">WhatsApp</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, phone: event.target.value }))
                  }
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      status: event.target.value as ClinicStatus,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                >
                  <option value="active">Ativa</option>
                  <option value="inactive">Inativa</option>
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-[#5046E4] hover:bg-[#4338CA]">
                {editingClinic ? "Salvar alterações" : "Cadastrar clínica"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
