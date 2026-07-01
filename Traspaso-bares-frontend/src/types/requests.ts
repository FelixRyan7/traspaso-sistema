export type LocationRequestWithProduct = LocationRequest & {
  product: {
    id: number;
    name: string;
    category?: string;
    subcategory?: string;
    unitType?: string;
    quantity:number;
    quantityUnit: string;
  };
};

export type LocationRequest = {
  id: number;
  locationId: number;
  productId: number;
  quantity: number;
  status: "pending" | "delivered";
  deliveredAt: string | null;
  userId: number | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateLocationRequestDto = {
  locationId: number;
  productId: number;
  quantity: number;
  status: "pending" | "delivered";
};