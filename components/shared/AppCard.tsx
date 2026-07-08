import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function AppCard({
  children,
  className,
}: Props) {
  return (
    <section
      className={cn(
        [
          "rounded-[28px]",
          "border border-slate-200/80",
          "bg-white",
          "p-6 md:p-8",
          "shadow-card",
          "transition-all",
          "duration-300",
          "hover:-translate-y-[1px]",
          "hover:shadow-xl",
        ].join(" "),
        className,
      )}
    >
      {children}
    </section>
  );
}
