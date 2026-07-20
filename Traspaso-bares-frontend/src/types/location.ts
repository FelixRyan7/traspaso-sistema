export type LocationType =
  | "bar"
  | "kitchen"
  | "storage"
  | "restaurant"
  | "beach_bar"
  | "rooftop"
  | "other";

export interface Location {
  id: number;
  companyId: number;
  name: string;
  type: LocationType;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}