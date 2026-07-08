type Props = {
  value: string;
};

export function StatBadge({
  value,
}: Props) {
  return (
    <span className="inline-flex h-9 items-center rounded-full bg-[#EEEDFC] px-4 text-sm font-semibold tracking-tight text-[#5046E4]">
      {value}
    </span>
  );
}
