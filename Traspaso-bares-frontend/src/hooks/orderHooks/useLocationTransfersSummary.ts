import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import api from "../../api/axios";
import type { ApiError } from "../../types/api";
import type { TransferSummaryItem } from "../../types/transfers";

export const useLocationTransfersSummary = (
  locationId?: number,
  from?: string,
  to?: string
) => {
  return useQuery<TransferSummaryItem[], AxiosError<ApiError>>({
    queryKey: [
      "locationTransfersSummary",
      locationId,
      from,
      to,
    ],

    enabled: false,

    queryFn: async () => {
      const res = await api.get<TransferSummaryItem[]>(
        "/locationRequests/transfers/summary",
        {
          params: {
            locationId,
            from,
            to,
          },
        }
      );

      return res.data;
    },

    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};