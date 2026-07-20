export type TransferFiltersType = {
  locationId?: number;
  from: string;
  to: string;
};

export type TransferSummaryItem = {
  productId: number;
  productName: string;
  quantity: number;
  quantityUnit: string;
  unitType: string;
  totalQuantity: number;
};