import { PageHeader } from "@/components/shared/PageHeader";
import { AppCard } from "@/components/shared/AppCard";

export default function MasterDashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Bem-vindo ao painel master."
      />

      <AppCard>
        <p className="text-muted-foreground">
          Sua área administrativa começará a ser construída a partir desta tela.
        </p>
      </AppCard>
    </>
  );
}