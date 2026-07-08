import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
}: Props) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-200 bg-white px-8 py-20 text-center shadow-card">

      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#EEEDFC] text-[#5046E4]">
        {icon}
      </div>

      <h2 className="mt-8 text-2xl font-bold tracking-tight text-[#14123A]">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-slate-500">
        {description}
      </p>

      {action && (
        <div className="mt-8">
          {action}
        </div>
      )}

    </div>
  );
}
