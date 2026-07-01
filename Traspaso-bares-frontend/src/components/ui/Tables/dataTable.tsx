import type { ReactNode } from "react";
import type { DataTableProps } from "../../../types/table";

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick
}: DataTableProps<T>) {
  if (!data.length) {
    return (
      <div className="rounded-2xl border border-gray-light bg-white-soft p-6 text-center text-gray-dark">
        No hay registros disponibles
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-light/70 bg-white-soft shadow-sm">
      <table className="min-w-full">
        <thead
          className="
            bg-gradient-to-r
            from-primary-soft/80
            via-white-soft
            to-primary-soft/80
          "
        >
      <tr>
        {columns.map((column) => (
          <th
            key={String(column.key)}
            className="
              px-6 py-5 text-left
              text-[11px] font-black uppercase
              tracking-[0.22em]
              text-primary-strong
            "
          >
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(row)}
              className="
                border-t border-gray-light/70
                transition-all duration-200
                hover:bg-primary-soft/20
                cursor-pointer active:scale-[0.998]
                hover:shadow-[inset_0_1px_3px_rgba(26,117,159,0.1)]
                group
              "
            >
            {columns.map((column) => (
              <td
                key={String(column.key)}
                className="
                  px-6 py-5
                  text-sm font-medium
                  text-dark
                  group-hover:text-primary-strong
                "
              >
                {column.render
                  ? column.render(row[column.key], row)
                  : String(row[column.key])}
              </td>
            ))}
            </tr>
         ))}
        </tbody>
      </table>
    </div>
  );
}