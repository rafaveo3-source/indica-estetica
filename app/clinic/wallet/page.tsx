import { AppCard } from "@/components/shared/AppCard";

export default function ClinicWalletPage() {
  return (
    <main className="space-y-6">
      <AppCard>
        <h1 className="text-2xl font-semibold text-slate-900">Carteira</h1>
        <p className="mt-2 text-sm text-slate-600">Saldo e movimentações da clínica.</p>
      </AppCard>
    </main>
  );
}
