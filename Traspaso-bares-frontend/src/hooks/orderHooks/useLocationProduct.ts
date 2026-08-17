import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios";
import { AxiosError } from "axios";
import type { ApiError } from "../../types/api";

export type LocationProductItem = {
  productId: number;
  name: string;
  brand?: string | null;
  category: string;
  subcategory: string;
  unitType: string;
  quantity: number;
  quantityUnit: string;

  companyProduct: {
    id: number;
    suggestedQuantity?: number | null;
    inventoryUnit?: "unit" | "kg" | "g" | "l" | "ml" | null;
    operationalArea: "bar" | "kitchen";
    isActive: boolean;
    isStockLow: boolean;
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