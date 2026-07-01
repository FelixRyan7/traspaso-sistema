import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

type DeliverParams = {
  id: number;
  quantity: number;
  locationId: number;
};

export const useDeliverLocationRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, quantity }: DeliverParams) => {
      const res = await api.patch(
        `/locationRequests/${id}/deliver`,
        {
          quantity,
        }
      );

      return res.data;
    },

    onSuccess: (_, variables) => {
      // 🔥 1. invalidate lista principal
      queryClient.invalidateQueries({
        queryKey: ["location-requests", variables.locationId],
      });

      // 🔥 2. opcional: también invalida dashboard/listas secundarias
      queryClient.invalidateQueries({
        queryKey: ["current-order", variables.locationId],
      });
    },
  });
};