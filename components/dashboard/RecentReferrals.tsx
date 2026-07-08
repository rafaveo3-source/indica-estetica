const items = [
  {
    patient: "Maria Oliveira",
    clinic: "Bella Face",
    value: "R$150",
  },
  {
    patient: "João Pedro",
    clinic: "Studio Prime",
    value: "R$80",
  },
  {
    patient: "Ana Souza",
    clinic: "Estética Life",
    value: "R$120",
  },
];

export default function RecentReferrals() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <h3 className="text-xl font-semibold">
        Últimas indicações
      </h3>

      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div
            key={item.patient}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
          >
            <div>
              <p className="font-medium">
                {item.patient}
              </p>

              <p className="text-sm text-slate-500">
                {item.clinic}
              </p>
            </div>

            <span className="font-bold text-[#5046E4]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
