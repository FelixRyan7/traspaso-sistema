import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/api";

export type Location = {
  id: number;
  name: string;
  type: string;
  isActive: boolean;
  companyId: number;
};

export const useLocation = (locationId: string | undefined) => {
  return useQuery<Location, AxiosError<ApiError>>({
    queryKey: ["location", locationId],

    queryFn: async () => {
      const res = await api.get(`/locations/${locationId}`);
      return res.data;
    },

    enabled: !!locationId, // evita request sin param
  });
};