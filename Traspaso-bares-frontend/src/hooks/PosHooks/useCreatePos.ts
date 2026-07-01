import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios";

export type CreateLocationInput = {
  name: string;
  type: "bar" | "restaurant" | "storage" | "kitchen" | "rooftop" | "beach_bar" | "other";
};

export const useCreatePos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateLocationInput) => {
      const res = await api.post("/locations", data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
};