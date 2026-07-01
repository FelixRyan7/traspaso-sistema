import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import type { LocationRequestWithProduct } from "../../types/requests";

export const useLocationDeliveredRequests = (locationId: number) => {
    const today = new Date().toISOString().split("T")[0];
  return useQuery<LocationRequestWithProduct[]>({
    queryKey: ["location-requests-delivered", locationId],
    queryFn: async () => {
      const res = await api.get<LocationRequestWithProduct[]>(
        `/locationRequests/${locationId}?status=delivered&date=${today}`
      );

      return res.data;
    },
    enabled: !!locationId,
  });
};