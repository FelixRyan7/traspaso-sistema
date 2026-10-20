import { useQuery, useMutation, useQueryClient, } from "@tanstack/react-query";
import api from "../api/axios";
import { AxiosError } from "axios";
import type { ApiError } from "../types/api";
import type { EditCompanyProductFormData } from "../schemas/editCompanyProduct.schema";

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

export type CompanyProduct = {
  id: number;
  productId: number;
  suggestedQuantity: number | null;
  isActive: boolean;
  isStockLow: boolean;
  inventoryUnit: "unit" | "kg" | "g" | "l" | "ml" | null;
  operationalArea: "bar" | "kitchen";

  product: {
    id: number;
    name: string;
    brand: string | null;
    category: string;
    subcategory: string;
    unitType: string;
    quantity: number;
    quantityUnit: string;
  };
};

// Brings all products from table products
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

// Brings all products from table CompanyProducts
export const useCompanyProducts = () => {
  return useQuery<CompanyProduct[], AxiosError<ApiError>>({
    queryKey: ["company-products"],
    queryFn: async () => {
      const res = await api.get<CompanyProduct[]>(
        "admin/products/company-products"
      );

      return res.data;
    },
  });
};

export const useToggleCompanyProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; data: CompanyProduct },
    AxiosError<ApiError>,
    number
  >({
    mutationFn: async (companyProductId) => {
      const res = await api.patch<{
        success: boolean;
        data: CompanyProduct;
      }>(
        `admin/products/company-products/${companyProductId}/toggle`
      );

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company-products"],
      });
    },
  });
};

export const useUpdateCompanyProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { success: boolean; data: CompanyProduct },
    AxiosError<ApiError>,
    { companyProductId: number; data: EditCompanyProductFormData }
  >({
    mutationFn: async ({ companyProductId, data }) => {
      const res = await api.patch<{
        success: boolean;
        data: CompanyProduct;
      }>(
        `/admin/products/company-products/${companyProductId}`,
        data
      );

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["company-products"],
      });
    },
  });
};
