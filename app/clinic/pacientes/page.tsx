import { AppCard } from "@/components/shared/AppCard";

export default function ClinicPatientsRoutePage() {
  return (
    <main className="space-y-6">
      <AppCard>
        <h1 className="text-2xl font-semibold text-slate-900">Pacientes</h1>
        <p className="mt-2 text-sm text-slate-600">Rota consolidada para o módulo de pacientes da clínica.</p>
      </AppCard>
    </main>
  );
}
