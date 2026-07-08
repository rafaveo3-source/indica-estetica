import { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  action?: ReactNode;
};

export function SectionTitle({
  title,
  subtitle,
  action,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

      <div>

        <h2 className="text-2xl font-semibold tracking-tight text-[#14123A]">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-slate-500">
            {subtitle}
          </p>
        )}

      </div>

      {action && (
        <div className="flex items-center gap-3">
          {action}
        </div>
      )}

    </div>
  );
}
