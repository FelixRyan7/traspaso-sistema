import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import type { AxiosError } from "axios";
import type { ApiError } from "../types/api";

export type DashboardResponse = {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };

  company: {
    id: number;
    name: string;
  };

  locations: {
    id: number;
    name: string;
    type: string;
    isActive: boolean;
  }[];
};

export const useDashboard = () => {
  return useQuery<
    DashboardResponse,
    AxiosError<ApiError>
  >({
    queryKey: ["dashboard"],

    queryFn: async () => {
      const res = await api.get<DashboardResponse>("/dashboard");
      return res.data;
    },

    retry: false,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });
};