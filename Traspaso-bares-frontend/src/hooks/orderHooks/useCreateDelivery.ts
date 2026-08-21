import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

type DirectDeliveryParams = {
  locationId: number;
  productId: number;
  quantity: number;
  deliveryDate?: string;
};

export const useCreateDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      locationId,
      productId,
      quantity,
      deliveryDate
    }: DirectDeliveryParams) => {
      const res = await api.post(
        `/locationRequests/${locationId}/deliveries`,
        {
          productId,
          quantity,
          deliveryDate
        }
      );

      return res.data;
    },

    onSuccess: (_, variables) => {
      // Actualiza el historial de movimientos
      queryClient.invalidateQueries({
        queryKey: ["location-requests", variables.locationId],
      });

      // Si tienes dashboard o estadísticas
      queryClient.invalidateQueries({
        queryKey: ["current-order", variables.locationId],
      });
    },
  });
};