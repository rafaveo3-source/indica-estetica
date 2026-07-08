type Props = {
  status: "active" | "inactive";
};

export default function ClinicStatusBadge({
  status,
}: Props) {
  const active = status === "active";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        active
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-100 text-slate-600",
      ].join(" ")}
    >
      <span
        className={[
          "mr-2 h-2 w-2 rounded-full",
          active ? "bg-emerald-500" : "bg-slate-400",
        ].join(" ")}
      />

      {active ? "Ativa" : "Inativa"}
    </span>
  );
}
