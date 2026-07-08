import { Building2 } from "lucide-react";

export default function ClinicEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-24">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#EEEDFC]">
        <Building2
          size={36}
          className="text-[#5046E4]"
        />
      </div>

      <h2 className="mt-8 text-2xl font-semibold text-[#14123A]">
        Nenhuma clínica encontrada
      </h2>

      <p className="mt-3 max-w-md text-center text-slate-500">
        Cadastre a primeira clínica para iniciar o ecossistema do Indica Estética.
      </p>
    </div>
  );
}
