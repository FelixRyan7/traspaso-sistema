import { DataTable } from '../ui/Tables/dataTable'
import type { Column } from '../../types/table';
import type { LocationRequestWithProduct } from '../../types/requests';
import type { AxiosError } from 'axios';
import type { ApiError } from '../../types/api';
import type { TransferSummaryItem } from '../../types/transfers';
import { formatSpanishDate } from '../../helpers/formatSpanishDate';
import { formatUnitType } from '../../helpers/formatUnitType';
import { useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

type TransferRow = LocationRequestWithProduct & {
  dateGroup: number;
  showDate: boolean;
};

type Props = {
    transfers: LocationRequestWithProduct[];
    movementsCount: number;
    deliveredUnits: number;
    loading: boolean;
    error: AxiosError<ApiError> | null;
    summary: TransferSummaryItem[];
    selectedProductIds: number[];
    onClearFilter: () => void;
}

export default function TransferList({transfers, movementsCount, deliveredUnits, loading, error, summary,  selectedProductIds, onClearFilter}: Props) {

    const columns: Column<TransferRow>[] = [
      {
        key: "product",
        header: "Producto",
        render: (_, row) => row.product.name,
      },
      {
        key: "quantity",
        header: "Cantidad",
        render: (_, row) =>
          `${row.quantity} ${formatUnitType(row.product.unitType, row.quantity)} · ${row.product.quantity}${row.product.quantityUnit}`,
      },
      {
        key: "date",
        header: "Fecha",
        render: (_, row) => (
          <span
            className={`
              inline-flex
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${
                row.dateGroup === 0
                  ? "bg-success-soft text-success-strong"
                  : "bg-success text-white"
              }
            `}
          >
            {formatSpanishDate(row.date)}
          </span>
        ),
      },
      {
        key: "status",
        header: "Estado",
        render: (status) =>
          status === "delivered" ? "Entregado" : "Pendiente",
      },
    ];

    const selectedProducts = summary.filter((item) =>
      selectedProductIds.includes(item.productId)
    );

    const transfersWithGroups: TransferRow[] = useMemo(() => {
    let currentDate = "";
    let group = -1;

  return transfers.map((transfer) => {
    const isNewGroup = transfer.date !== currentDate;

    if (isNewGroup) {
      currentDate = transfer.date;
      group++;
    }

    return {
      ...transfer,
      dateGroup: group % 2,
      showDate: isNewGroup,
    };
  });
}, [transfers]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return (
      <p className="text-error">
         Error al cargar los traspasos.
      </p>
    );
  }

  return (
    <>
    <section className="flex h-full min-h-0 flex-col">
    <div className="px-3 mb-3 mt-1">
        <p className="mb-2 text-sm font-medium text-gray-dark">
          Mostrando <span className='text-primary'>{movementsCount} movimientos</span>
        </p>

    <div className="flex flex-wrap items-center gap-2">
    {selectedProducts.length === 0 ? (
      <span
        className="
          inline-flex
          items-center
          rounded-full
          bg-gray-100
          px-3
          py-1
          text-sm
          text-gray-600
        "
      >
        Todos los productos
      </span>
    ) : (
      <>
        {selectedProducts.map((item) => (
          <span
            key={item.productId}
            className="
              inline-flex
              items-center
              rounded-full
              bg-primary-soft
              px-3
              py-1
              text-sm
              font-medium
              text-primary-strong
            "
          >
            {item.productName}
          </span>
        ))}

        <button
          onClick={onClearFilter}
          className="
            rounded-full
            border
            border-gray-light
            px-3
            py-1
            text-sm
            transition
            hover:bg-gray-100
          "
        >
          Limpiar
        </button>
      </>
    )}
  </div>
  
</div>
     <div className='flex-1 lg:flex min-h-0'> 
     <DataTable
              data={transfersWithGroups}
              columns={columns}
              stickyHeader
              mobileRender={(transfer) => (
                <>    
                  <div className="flex items-center justify-between">
                     <h3 className="font-semibold text-dark">
                      {transfer.product.name}
                    </h3>

                    <span className="text-xs rounded-full bg-green-100 px-2 py-1 text-green-700">
                      Entregado
                    </span>
                  </div>

                  <div className="mt-3 space-y-1 text-sm font-bold">
                    <p>
                      <span className="font-medium">Cantidad:</span>{" "}
                      {transfer.quantity} {formatUnitType(transfer.product.unitType, transfer.quantity)} · {transfer.product.quantity}{transfer.product.quantityUnit}
                    </p>

                    <p>
                      <span className="font-medium">Fecha:</span>{" "}
                      {formatSpanishDate(transfer.date)}
                    </p>
                  </div>
                </>
              )}
            />
        </div>
        
    </section>
    
    </>
  )
}
