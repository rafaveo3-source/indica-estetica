import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: Props) {
  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

      <div>

        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[.22em] text-[#5046E4]">
            {eyebrow}
          </span>
        )}

        <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#14123A]">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-3xl text-slate-500">
            {description}
          </p>
        )}

      </div>

      {actions && (
        <div className="flex items-center gap-3">
          {actions}
        </div>
      )}

    </header>
  );
}
