import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

export const useUpdateLocationDeliveredRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      quantity,
    }: {
      id: number;
      quantity: number;
    }) => {
      const res = await api.patch(
        `/locationRequests/${id}`,
        { quantity }
      );

      return res.data;
    },

    onSuccess: (_,) => {
      // refrescar listas relevantes
      queryClient.invalidateQueries({
        queryKey: ["location-requests-delivered"],
      });

      queryClient.invalidateQueries({
        queryKey: ["location-requests"],
      });
    },
  });
};