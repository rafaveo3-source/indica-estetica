"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, CheckCircle2, MailPlus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePatients } from "@/hooks/usePatients";
import type { Patient, PatientStatus } from "@/types/patient";

const patientSchema = z.object({
  name: z.string().trim().min(2, "Informe o nome do paciente."),
  cpf: z.string().trim().min(11, "CPF inválido."),
  phone: z.string().trim().min(10, "Informe o WhatsApp."),
  status: z.enum(["active", "inactive", "archived"]),
  email: z.string().trim().email("E-mail inválido.").optional().or(z.literal("")),
  clinic_id: z.string().nullable().optional(),
  balance: z.number().min(0).optional(),
});

export type PatientFormValues = z.infer<typeof patientSchema>;

type PatientFormProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patient?: Patient | null;
  onSaved?: () => void;
};

const statusOptions: Array<{ value: PatientStatus; label: string }> = [
  { value: "active", label: "Ativo" },
  { value: "inactive", label: "Inativo" },
  { value: "archived", label: "Arquivado" },
];

const cpfMask = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

const phoneMask = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

export function PatientForm({
  open,
  onOpenChange,
  patient,
  onSaved,
}: PatientFormProps) {
  const { createPatient, updatePatient } = usePatients();
  const [step, setStep] = useState(1);
  const [showEmail, setShowEmail] = useState(Boolean(patient?.email));
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    reset,
  } = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    mode: "onChange",
    defaultValues: {
      name: patient?.name ?? "",
      cpf: patient?.cpf ?? "",
      phone: patient?.phone ?? "",
      status: patient?.status ?? "active",
      email: patient?.email ?? "",
      clinic_id: patient?.clinic_id ?? null,
      balance: patient?.balance ?? 0,
    },
  });

  useEffect(() => {
    reset({
      name: patient?.name ?? "",
      cpf: patient?.cpf ?? "",
      phone: patient?.phone ?? "",
      status: patient?.status ?? "active",
      email: patient?.email ?? "",
      clinic_id: patient?.clinic_id ?? null,
      balance: patient?.balance ?? 0,
    });
    setShowEmail(Boolean(patient?.email));
    setStep(1);
  }, [patient, reset]);

  const values = watch();
  const summary = useMemo(() => ({
    name: values.name || "—",
    cpf: values.cpf || "—",
    phone: values.phone || "—",
    status: values.status || "active",
    clinic: "Clínica atual",
    referralCode: "Gerado automaticamente",
    balance: "R$ 0,00",
  }), [values]);

  const onSubmit = async (data: PatientFormValues) => {
    setSubmitting(true);

    try {
      if (patient) {
        await updatePatient(patient.id, {
          name: data.name,
          cpf: data.cpf || null,
          phone: data.phone || null,
          status: data.status,
          email: data.email || null,
          clinic_id: data.clinic_id ?? null,
          balance: data.balance ?? 0,
        });
        toast.success("Paciente atualizado com sucesso.");
      } else {
        await createPatient({
          name: data.name,
          cpf: data.cpf || null,
          phone: data.phone || null,
          status: data.status,
          email: data.email || null,
          clinic_id: data.clinic_id ?? null,
          balance: data.balance ?? 0,
        });
        toast.success("Paciente cadastrado com sucesso.");
      }

      onSaved?.();
      onOpenChange(false);
      reset();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Não foi possível salvar o paciente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>{patient ? "Editar paciente" : "Novo paciente"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  placeholder="Nome completo"
                  {...register("name")}
                />
                {errors.name ? <p className="text-sm text-rose-600">{errors.name.message}</p> : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="cpf">CPF</Label>
                <Input
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={values.cpf ?? ""}
                  onChange={(event) => setValue("cpf", cpfMask(event.target.value), { shouldValidate: true })}
                />
                {errors.cpf ? <p className="text-sm text-rose-600">{errors.cpf.message}</p> : null}
              </div>

              <div className="flex justify-end">
                <Button type="button" onClick={() => setStep(2)} disabled={!isValid}>
                  Continuar <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">WhatsApp</Label>
                <Input
                  id="phone"
                  placeholder="(11) 99999-9999"
                  value={values.phone ?? ""}
                  onChange={(event) => setValue("phone", phoneMask(event.target.value), { shouldValidate: true })}
                />
                {errors.phone ? <p className="text-sm text-rose-600">{errors.phone.message}</p> : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none"
                  {...register("status")}
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {!showEmail ? (
                <Button type="button" variant="outline" onClick={() => setShowEmail(true)}>
                  <MailPlus className="mr-2 h-4 w-4" /> Adicionar e-mail
                </Button>
              ) : null}

              {showEmail ? (
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="email@exemplo.com" {...register("email")} />
                  {errors.email ? <p className="text-sm text-rose-600">{errors.email.message}</p> : null}
                </div>
              ) : null}

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                </Button>
                <Button type="button" onClick={() => setStep(3)} disabled={!isValid}>
                  Continuar <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold">Resumo</p>
                <ul className="mt-3 space-y-2">
                  <li>Nome: {summary.name}</li>
                  <li>CPF: {summary.cpf}</li>
                  <li>WhatsApp: {summary.phone}</li>
                  <li>Status: {summary.status}</li>
                  <li>Clínica: {summary.clinic}</li>
                  <li>Referral Code: {summary.referralCode}</li>
                  <li>Saldo Inicial: {summary.balance}</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(2)}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                </Button>
                <Button type="submit" disabled={submitting}>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  {patient ? "Salvar alterações" : "Cadastrar paciente"}
                </Button>
              </div>
            </div>
          ) : null}
        </form>
      </DialogContent>
    </Dialog>
  );
}
