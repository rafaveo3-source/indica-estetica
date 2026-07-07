import { LogoMark } from "./LogoMark";

type LogoProps = {
  size?: number;
};

export function Logo({
  size = 56,
}: LogoProps) {
  return (
    <div className="flex items-center gap-4">
      <LogoMark size={size} />

      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Indica Estética
        </h1>

        <p className="text-sm text-muted-foreground">
          Transformando clientes em novos clientes.
        </p>
      </div>
    </div>
  );
}