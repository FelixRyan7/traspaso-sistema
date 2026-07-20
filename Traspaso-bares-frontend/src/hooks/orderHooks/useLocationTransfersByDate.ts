import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import api from "../../api/axios";
import type { ApiError } from "../../types/api";
import type { LocationRequestWithProduct } from "../../types/requests";


export const useLocationTransfersByDate = (
  locationId?: number,
  from?: string,
  to?: string
) => {
  return useQuery<LocationRequestWithProduct[], AxiosError<ApiError>>({
    queryKey: [
      "locationTransfersByDate",
      locationId,
      from,
      to,
    ],

    enabled: false,

    queryFn: async () => {
      const res = await api.get<LocationRequestWithProduct[]>("/locationRequests/transfers", {
        params: {
          locationId,
          from,
          to,
        },
      });

      return res.data;
    },

    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};