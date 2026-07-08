"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { name: "Seg", value: 18 },
  { name: "Ter", value: 24 },
  { name: "Qua", value: 21 },
  { name: "Qui", value: 32 },
  { name: "Sex", value: 37 },
  { name: "Sáb", value: 42 },
  { name: "Dom", value: 46 },
];

export default function RevenueChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[.18em] text-slate-400">
          Crescimento
        </p>

        <h3 className="mt-2 text-2xl font-bold text-[#14123A]">
          Indicações da Semana
        </h3>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Area
              dataKey="value"
              stroke="#5046E4"
              fill="#EEEDFC"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
