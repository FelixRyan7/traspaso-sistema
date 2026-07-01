import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";
import type { CreateLocationRequestDto } from "../../types/requests";



export const useCreateLocationRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateLocationRequestDto) => {
      const { locationId, ...body } = data;

      const res = await api.post(
        `/locationRequests/${locationId}/items`,
        body
      );

      return res.data;
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["location-requests", variables.locationId],
      });
    },
  });
};