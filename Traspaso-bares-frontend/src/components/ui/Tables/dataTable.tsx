import type { ReactNode } from "react";
import type { DataTableProps } from "../../../types/table";

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

export type ResponsiveDataTableProps<T extends Record<string, any>> =
  DataTableProps<T> & {
    mobileRender?: (row: T) => ReactNode;
    stickyHeader?: boolean;
    className?: string;
  };

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  mobileRender,
  stickyHeader = false,
  className = "",
}: ResponsiveDataTableProps<T>) {
  if (!data.length) {
    return (
      <div className="rounded-2xl border border-gray-light bg-white-soft p-6 text-center text-gray-dark">
        No hay registros disponibles
      </div>
    );
  }

  return (
    <>
      {/* Desktop */}
          <div
            className={`
              hidden md:flex
              flex-1
              min-h-0
              overflow-auto
              rounded-3xl
              border border-gray-light/70
              bg-white-soft
              shadow-sm
              ${className}
            `}
          >        
          <table className="min-w-full self-start">
          <thead
            className={`bg-gradient-to-r
              from-primary-soft
              via-white-soft
              to-primary-soft
               ${stickyHeader ? "sticky top-0 z-20" : ""}`}
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

      {/* Mobile */}
      <div className="space-y-3 md:hidden">
        {data.map((row, index) => (
          <div
            key={index}
            onClick={() => onRowClick?.(row)}
            className="
              rounded-2xl
              bg-white-soft
              p-4
              shadow-sm
              cursor-pointer
              active:scale-[0.99]
              transition
            "
          >
            {mobileRender ? (
              mobileRender(row)
            ) : (
              <div className="space-y-2">
                {columns.map((column) => (
                  <div
                    key={String(column.key)}
                    className="flex justify-between gap-4"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-gray-dark">
                      {column.header}
                    </span>

                    <span className="text-sm text-right text-dark">
                      {column.render
                        ? column.render(row[column.key], row)
                        : String(row[column.key])}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}