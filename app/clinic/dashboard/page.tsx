import { AppCard } from "@/components/shared/AppCard";

export default function ClinicDashboardPage() {
  return (
    <main className="space-y-6">
      <AppCard>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard da clínica</h1>
        <p className="mt-2 text-sm text-slate-600">Resumo operacional do painel da clínica.</p>
      </AppCard>
    </main>
  );
}
