import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import type { LocationRequestWithProduct } from "../../types/requests";

export const useLocationRequests = (locationId: number) => {
  return useQuery<LocationRequestWithProduct[]>({
    queryKey: ["location-requests", locationId],
    queryFn: async () => {
      const res = await api.get<LocationRequestWithProduct[]>(
        `/locationRequests/${locationId}?status=pending`
      );

      return res.data;
    },
    enabled: !!locationId,
  });
};