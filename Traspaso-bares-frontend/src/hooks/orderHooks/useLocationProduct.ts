import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { AxiosError } from "axios";
import type { ApiError } from "../../types/api";

export type LocationProductItem = {
  productId: number;
  name: string;
  category: string;
  subcategory: string;
  unitType: string;
  quantity: number;
  quantityUnit:string;
  
  companyProduct?: {
    suggestedQuantity?: number | null;
  };

  locationProduct: {
    id: number;
    priceOverride?: number | null;
  };
};

export const useLocationProducts = (locationId?: number) => {
  return useQuery<
    LocationProductItem[],
    AxiosError<ApiError>
  >({
    queryKey: ["location-products", locationId],

    enabled: !!locationId, // 👈 clave importante

    queryFn: async () => {
      const res = await api.get<LocationProductItem[]>(
        `/locations/${locationId}/products`
      );

      return res.data;
    },
  });
};