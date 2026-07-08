import { Building2, Plus } from "lucide-react";

import { AppCard } from "@/components/shared/AppCard";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageHeader } from "@/components/shared/PageHeader";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { StatBadge } from "@/components/shared/StatBadge";

import ClinicTable from "@/components/features/clinics/ClinicTable";

import { Button } from "@/components/ui/button";

import { listClinics } from "@/services/clinics";

export default async function ClinicsPage() {
  const clinics = await listClinics();

  return (
    <main className="space-y-8">

      <PageHeader
        eyebrow="Painel Master"
        title="Clínicas"
        description="Gerencie todas as clínicas cadastradas na plataforma."
        actions={
          <Button className="h-12 rounded-xl bg-[#5046E4] px-6 hover:bg-[#4338CA]">
            <Plus className="mr-2 h-4 w-4" />
            Nova Clínica
          </Button>
        }
      />

      <AppCard>

        <SectionTitle
          title="Clínicas cadastradas"
          subtitle="Todas as clínicas registradas no sistema."
          action={
            <StatBadge
              value={`${clinics.length} clínica(s)`}
            />
          }
        />

        {clinics.length === 0 ? (

          <EmptyState
            icon={
              <Building2
                size={34}
              />
            }
            title="Nenhuma clínica cadastrada"
            description="Cadastre a primeira clínica para iniciar o ecossistema do Indica Estética."
          />

        ) : (

          <ClinicTable clinics={clinics} />

        )}

      </AppCard>

    </main>
  );
}
