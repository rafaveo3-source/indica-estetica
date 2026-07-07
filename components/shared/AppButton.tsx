import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof Button>;

export function AppButton({
  className,
  children,
  ...props
}: Props) {
  return (
    <Button
      className={cn(
        "gradient-primary h-14 w-full rounded-2xl text-base font-semibold text-white shadow-soft hover:opacity-95",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}