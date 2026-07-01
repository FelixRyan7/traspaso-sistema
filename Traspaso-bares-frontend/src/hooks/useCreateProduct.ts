import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductFormData } from "../schemas/createProduct.schema";
import api from "../api/axios";


export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ProductFormData) => {
      const res = await api.post("/admin/products", data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-products"],
      });
    },
  });
};