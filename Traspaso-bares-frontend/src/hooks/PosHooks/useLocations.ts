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

export const useLocations = () => {
  return useQuery<Location[], AxiosError<ApiError>>({
    queryKey: ["locations"],

    queryFn: async () => {
      const res = await api.get<Location[]>("/locations");
      return res.data;
    },

    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};