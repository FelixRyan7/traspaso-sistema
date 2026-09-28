import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ApiError } from "../../types/api";
import api from "../../api/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type LocationProductManageItem = {
  productId: number;
  companyProductId: number;
  name: string;
  brand?: string | null;
  category: string;
  subcategory: string;
  unitType: string;
  quantity: number;
  quantityUnit: string;
  assigned: boolean;
};

// Returns company products and location products
export const useLocationProductsManage = (locationId?: number) => {
  return useQuery<
    LocationProductManageItem[],
    AxiosError<ApiError>
  >({
    queryKey: ["location-products-manage", locationId],
    enabled: !!locationId,
    queryFn: async () => {
      const res = await api.get<LocationProductManageItem[]>(
        `/locations/${locationId}/products/manage`
      );

      return res.data;
    },
  });
};

// Adds product to location
export const useAddLocationProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    unknown,
    AxiosError<ApiError>,
    {
      locationId: number;
      companyProductId: number;
    }
  >({
    mutationFn: async ({ locationId, companyProductId }) => {
      const res = await api.post(
        `/locations/${locationId}/products/${companyProductId}`
      );
      return res.data;
    },
    

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["location-products-manage", variables.locationId],
      });
    },
  });
};

export const useDeleteLocationProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<ApiError>,
    {
      locationId: number;
      companyProductId: number;
    }
  >({
    mutationFn: async ({
      locationId,
      companyProductId,
    }) => {
      await api.delete(
        `/locations/${locationId}/products/${companyProductId}`
      );
    },

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["location-products-manage", variables.locationId],
      });
    },
  });
};