import Image from "next/image";

type LogoMarkProps = {
  size?: number;
  className?: string;
};

export function LogoMark({
  size = 56,
  className,
}: LogoMarkProps) {
  return (
    <Image
      src="/brand/logo-mark.svg"
      alt="Indica Estética"
      width={size}
      height={size}
      priority
      className={className}
    />
  );
}