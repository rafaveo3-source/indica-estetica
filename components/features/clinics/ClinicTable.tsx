import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Clinic } from "@/types/clinic";
import ClinicStatusBadge from "./ClinicStatusBadge";

type Props = {
  clinics: Clinic[];
  onEdit: (clinic: Clinic) => void;
  onDelete: (clinic: Clinic) => void;
};

export default function ClinicTable({
  clinics,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b border-slate-200 bg-slate-50">

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Clínica
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Plano
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Status
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                WhatsApp
              </th>

              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                Ações
              </th>

            </tr>

          </thead>

          <tbody>

            {clinics.map((clinic) => (

              <tr
                key={clinic.id}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >

                <td className="px-6 py-5">

                  <div className="font-semibold text-[#14123A]">
                    {clinic.name}
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    {clinic.email ?? "-"}
                  </div>

                </td>

                <td className="px-6 py-5 capitalize">
                  {clinic.plan}
                </td>

                <td className="px-6 py-5">
                  <ClinicStatusBadge
                    status={clinic.status}
                  />
                </td>

                <td className="px-6 py-5">
                  {clinic.phone ?? "-"}
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(clinic)}
                    >
                      <Pencil className="mr-2 h-3.5 w-3.5" />
                      Editar
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(clinic)}
                    >
                      <Trash2 className="mr-2 h-3.5 w-3.5" />
                      Excluir
                    </Button>
                  </div>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
