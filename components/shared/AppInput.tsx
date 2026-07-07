import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof Input>;

export function AppInput({
  className,
  ...props
}: Props) {
  return (
    <Input
      className={cn(
        "h-14 rounded-2xl border-border bg-white px-5 text-base shadow-none focus-visible:ring-2 focus-visible:ring-primary",
        className,
      )}
      {...props}
    />
  );
}