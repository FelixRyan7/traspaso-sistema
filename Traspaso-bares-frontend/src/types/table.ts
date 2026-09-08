import type { ReactNode } from "react";

export type Column<T> = {
  key: keyof T | string;
  header: string;
  render?: (value: T[keyof T] | undefined, row: T) => ReactNode;
};

export type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
};