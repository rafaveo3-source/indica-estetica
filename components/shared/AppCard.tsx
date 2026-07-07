import { cn } from "@/lib/utils";

type AppCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function AppCard({
  children,
  className,
}: AppCardProps) {
  return (
    <div
      className={cn(
        "glass shadow-soft rounded-4xl border border-border bg-card p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}