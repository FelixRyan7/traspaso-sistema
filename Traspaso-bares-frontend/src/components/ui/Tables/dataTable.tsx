import { useEffect, useRef, useState, type ReactNode } from "react";
import type { DataTableProps } from "../../../types/table";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
  
  const [showScrollHint, setShowScrollHint] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  
    useEffect(() => {
      const list = listRef.current;
  
      if (!list) return;
  
      const updateHint = () => {
        const hasOverflow = list.scrollHeight > list.clientHeight;
        const isAtTop = list.scrollTop < 10;
  
        setShowScrollHint(hasOverflow && isAtTop);
      };
  
      updateHint();
  
      list.addEventListener("scroll", updateHint);
      window.addEventListener("resize", updateHint);
  
      return () => {
        list.removeEventListener("scroll", updateHint);
        window.removeEventListener("resize", updateHint);
      };
    },);

   if (!data.length) {
  return (
    <div className="flex h-full min-h-[320px] items-center justify-center rounded-3xl bg-white-soft ring-1 ring-gray-light/50 shadow-sm">
      <div className="max-w-sm text-center">
        <p className="text-lg font-semibold text-dark">
          No hay registros
        </p>

        <p className="mt-2 text-sm text-gray-dark">
          Cuando existan movimientos aparecerán aquí.
        </p>
      </div>
    </div>
  );
}

return (
  <>
    {/* Desktop */}
    <div
      ref={listRef}
      className={`
        relative
        hidden md:flex
        flex-1
        min-h-0
        overflow-auto
        scrollbar-hide
        rounded-3xl
        bg-white-soft
        ring-1 ring-gray-light/50
        shadow-sm
        ${className}
      `}
    >
      <table className="min-w-full border-separate border-spacing-0">
        <thead
          className={`
            bg-dark-soft
            backdrop-blur-md
            border-b border-gray-light/50
            ${stickyHeader ? "sticky top-0 z-20" : ""}
          `}
        >
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="
                  first:pl-8
                  last:pr-8
                  px-6
                  py-5
                  text-left
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-white
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
                group
                cursor-pointer
                border-b border-gray-light/40
                transition-colors duration-200
                hover:bg-primary-soft/30
              "
            >
              {columns.map((column, columnIndex) => (
                <td
                  key={String(column.key)}
                  className={`
                    first:pl-8
                    last:pr-8
                    px-6
                    py-5
                    align-middle
                    text-sm
                    ${
                      columnIndex === 0
                        ? "font-medium text-dark"
                        : "font-normal text-gray-dark"
                    }
                  `}
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

      {showScrollHint && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
          <div className="h-20 bg-gradient-to-t from-white-soft via-white-soft/70 to-transparent">
            <div className="flex justify-center pt-8">
              <div className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-dark-soft text-white shadow-lg">
                <KeyboardArrowDownIcon fontSize="small" />
              </div>
            </div>
          </div>
        </div>
      )}
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