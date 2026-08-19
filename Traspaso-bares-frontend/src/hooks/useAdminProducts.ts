import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";
import { AxiosError } from "axios";
import type { ApiError } from "../types/api";

export type Product = {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  unitType: string;
  quantity: number;
  quantityUnit: string;

  locations: {
    id: number;
    name: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
};

type AdminProductsResponse = {
  products: Product[];
  locations: Location[];
};

export const useAdminProducts = () => {
  return useQuery<
    AdminProductsResponse,
    AxiosError<ApiError>
  >({
    queryKey: ["admin-products"],

    queryFn: async () => {
      const res = await api.get<AdminProductsResponse>(
        "/admin/products"
      );

      return res.data;
    },
  });
};