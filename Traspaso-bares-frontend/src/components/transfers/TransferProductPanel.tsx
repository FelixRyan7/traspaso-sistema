import type { AxiosError } from "axios";
import type { ApiError } from "../../types/api";
import type { TransferSummaryItem } from "../../types/transfers";
import { formatSpanishDate } from "../../helpers/formatSpanishDate";
import { useEffect, useMemo, useRef, useState } from "react";
import SearchBar from "../ui/Filters/SearchBar";
import CheckIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type Props = {
  summary: TransferSummaryItem[];
  loading: boolean;
  error: AxiosError<ApiError> | null;
  from: string;
  to:string;
  selectedProductIds: number[];
  deliveredUnits: number;

  onProductSelect: (ids: number[]) => void;
  onClearFilter: () => void;
};

export default function TransferSummary({
  summary,
  loading,
  error,
  from,
  to,
  selectedProductIds,
  deliveredUnits,
  onProductSelect,
  onClearFilter
}: Props) {

  const [showScrollHint, setShowScrollHint] = useState(false);

  const totalProducts = summary.length;

  const [search, setSearch] = useState("");

  const filteredSummary = useMemo(() => {
  const term = search.trim().toLowerCase();

  if (!term) return summary;

  return summary.filter((item) =>
    item.productName.toLowerCase().includes(term)
  );
  }, [summary, search]);

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
  }, [filteredSummary]);


  if (loading) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-sm">
        Cargando resumen...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl bg-red-50 p-6 text-red-600">
        Error al cargar el resumen.
      </div>
    );
  }

  if (!summary.length) return null;

  


return (
    <section
      className="
        rounded-3xl
        bg-white-soft
        backdrop-blur-md
        shadow-sm
        overflow-hidden
      "
    >
        <div className="px-5 pt-5 pb-3 border-b border-gray-light/50">

            <h2 className="text-xl font-bold text-dark">
                Resumen por producto
            </h2>
            <p className="text-sm text-gray"> {formatSpanishDate(from) } - {formatSpanishDate(to)}</p>
            <p className="text-sm text-gray">Selecciona uno o varios productos para ver sus movimientos.</p>

        </div>

        <div className="grid grid-cols-2 gap-3 p-2 mt-1">

            <div className={`rounded-2xl p-3 ${selectedProductIds.length > 0 ? "bg-primary-soft" : "shadow"}`}>

              <p className="text-xs uppercase tracking-wide text-gray-dark">
                Productos
              </p>

              <p className="text-2xl font-bold text-primary-strong">
                {selectedProductIds.length > 0 ? selectedProductIds.length : totalProducts}
              </p>

            </div>

            <div className={`rounded-2xl p-3 ${selectedProductIds.length > 0 ? "bg-primary-soft" : "shadow"}`}>

            <p className="text-xs uppercase tracking-wide text-gray-dark">
              Unidades
            </p>

            <p className="text-2xl font-bold text-primary-strong">
              {deliveredUnits}
            </p>

            </div>

        </div>

        <div className="border-b border-gray-light/50 p-5">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-dark">
                Productos
              </h3>

              <span className="text-xs text-gray-dark">
                {filteredSummary.length > 0 && filteredSummary.length} resultados
              </span>
            </div>

            <SearchBar
              value={search}
              onChange={setSearch}
            />
        </div>

        <div className="relative">
  <div
    ref={listRef}
    className="scroll-area max-h-[520px] overflow-y-auto divide-y divide-gray-light/50 shadow-sm"
  >
    {filteredSummary.map((item) => {
      const selected = selectedProductIds.includes(item.productId);

      return (
        <div
          key={item.productId}
          onClick={() => {
            if (selected) {
              onProductSelect(
                selectedProductIds.filter((id) => id !== item.productId)
              );
            } else {
              onProductSelect([
                ...selectedProductIds,
                item.productId,
              ]);
            }
          }}
          className={`
            group
            flex items-center justify-between
            px-4 py-3
            cursor-pointer
            transition-all

            ${
              selected
                ? "bg-primary-soft"
                : "hover:bg-primary-soft/30"
            }
          `}
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-dark">
              {item.productName}
            </p>

            <p className="text-sm text-gray-dark/80">
              {item.quantity} {item.quantityUnit} · {item.unitType}
            </p>
          </div>

          <div className="ml-4 flex items-center gap-2">
            <div
              className={`
                flex h-8 min-w-8 items-center justify-center gap-2 rounded-full px-2
                font-semibold
                ${
                  selected
                    ? "bg-primary text-white-strong"
                    : "bg-primary-soft/30 text-primary-strong"
                }
              `}
            >
              {selected && <CheckIcon sx={{ fontSize: 14 }} />}
              {item.totalQuantity}
            </div>

            <ChevronRightIcon
              fontSize="small"
              className={`
                transition-all duration-200
                ${
                  selected
                    ? "translate-x-1 text-primary"
                    : "text-gray-400 group-hover:translate-x-1 group-hover:text-primary"
                }
              `}
            />
          </div>
        </div>
      );
    })}
  </div>

  {showScrollHint && (
    <div className="pointer-events-none absolute inset-x-0 bottom-0">
      <div className="h-20 bg-gradient-to-t from-white via-white/20 to-transparent">
        <div className="flex justify-center pt-8">
          <div className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full bg-dark-soft text-white shadow-xl">
            <KeyboardArrowDownIcon />
          </div>
        </div>
      </div>
    </div>
  )}
</div>
    </section>
  );
}