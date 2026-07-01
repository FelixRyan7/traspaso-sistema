import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

export const useTogglePos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const res = await api.patch(`/locations/${id}/toggle`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};