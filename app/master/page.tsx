import {
  ArrowUpRight,
  Building2,
  Gift,
  Megaphone,
  Plus,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";

import KpiCard from "@/components/dashboard/KpiCard";
import QuickAction from "@/components/dashboard/QuickAction";
import RevenueChart from "@/components/dashboard/RevenueChart";
import RecentReferrals from "@/components/dashboard/RecentReferrals";
import TopClinics from "@/components/dashboard/TopClinics";

export default function MasterDashboard() {
  return (
    <main className="space-y-8">

      <section>
        <span className="text-xs font-semibold tracking-[.25em] uppercase text-[#5046E4]">
          Painel Master
        </span>

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#14123A]">
          Dashboard
        </h1>

        <p className="mt-2 max-w-3xl text-slate-500">
          Gerencie toda a plataforma, acompanhe indicadores e monitore o
          crescimento das clínicas em tempo real.
        </p>
      </section>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <KpiCard
          title="Clínicas"
          value="24"
          subtitle="+3 esta semana"
          icon={<Building2 size={24} />}
        />

        <KpiCard
          title="Pacientes"
          value="8.254"
          subtitle="+412 este mês"
          icon={<Users size={24} />}
        />

        <KpiCard
          title="Indicações"
          value="1.287"
          subtitle="73% conversão"
          icon={<Gift size={24} />}
        />

        <KpiCard
          title="Cashback"
          value="R$ 28.940"
          subtitle="Saldo distribuído"
          icon={<Wallet size={24} />}
        />

      </section>

      <section className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <RevenueChart />
        </div>

        <TopClinics />

      </section>

      <section className="grid gap-6 lg:grid-cols-3">

        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-7 shadow-card">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-[#14123A]">
              Ações rápidas
            </h2>

            <p className="mt-1 text-slate-500">
              Principais operações administrativas.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">

            <QuickAction
              title="Nova Clínica"
              description="Cadastrar nova clínica."
              icon={<Plus size={22} />}
            />

            <QuickAction
              title="Novo Paciente"
              description="Cadastrar paciente."
              icon={<UserPlus size={22} />}
            />

            <QuickAction
              title="Promoções"
              description="Criar campanha."
              icon={<Megaphone size={22} />}
            />

            <QuickAction
              title="Relatórios"
              description="Visualizar indicadores."
              icon={<ArrowUpRight size={22} />}
            />

          </div>

        </div>

        <RecentReferrals />

      </section>

    </main>
  );
}
