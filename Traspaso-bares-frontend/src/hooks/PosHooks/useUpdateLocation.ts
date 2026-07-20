import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateLocationInput } from "./useCreatePos";
import api from "../../api/axios";

export type UpdateLocationInput = {
  id: number;
  data: CreateLocationInput;
};

export const useUpdateLocation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: UpdateLocationInput) => {
      const res = await api.put(`/locations/${id}`, data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};