import { ReactNode } from "react";

export type DataTableColumn<T> = {
  key: keyof T | string;
  title: string;
  className?: string;
  render?: (row: T) => ReactNode;
};

type Props<T> = {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
};

export function DataTable<T>({
  columns,
  data,
  rowKey,
}: Props<T>) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-card">

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b border-slate-200 bg-slate-50">

              {columns.map((column) => (

                <th
                  key={String(column.key)}
                  className={[
                    "px-6 py-4 text-left text-xs font-semibold uppercase tracking-[.18em] text-slate-500",
                    column.className ?? "",
                  ].join(" ")}
                >
                  {column.title}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            {data.map((row) => (

              <tr
                key={rowKey(row)}
                className="border-b border-slate-100 transition hover:bg-slate-50"
              >

                {columns.map((column) => (

                  <td
                    key={String(column.key)}
                    className="px-6 py-5 align-middle"
                  >
                    {column.render
                      ? column.render(row)
                      : String(
                          (row as Record<string, unknown>)[
                            String(column.key)
                          ] ?? ""
                        )}
                  </td>

                ))}

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
