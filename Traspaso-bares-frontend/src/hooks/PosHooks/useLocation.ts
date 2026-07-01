// hooks/locationHooks/useLocation.ts

import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import type { AxiosError } from "axios";
import type { ApiError } from "../../types/api";

export type Location = {
  id: number;
  name: string;
  type: string;
  isActive: boolean;
  companyId: number;
};

export const useWorkspaceLocation = (locationId: number) => {
  return useQuery<Location, AxiosError<ApiError>>({
    queryKey: ["location", locationId],

    queryFn: async () => {
      const res = await api.get<Location>(
        `/locations/${locationId}`
      );

      return res.data;
    },

    enabled: !!locationId,
    retry: false,
  });
};