import { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
};

export default function KpiCard({
  title,
  value,
  subtitle,
  icon,
}: Props) {
  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[.18em] text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-[#14123A]">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEEDFC] text-[#5046E4]">
          {icon}
        </div>
      </div>
    </div>
  );
}
