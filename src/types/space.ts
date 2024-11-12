export interface PricePlan {
  duration: string;
  price: number;
}

export interface Space {
  SpaceID: number;
  Name: string;
  Location: string;
  Type: string;
  Capacity: number;
  Amenities: string[];
  FloorPlan: number;
  OccupationStatus: boolean;
  price_plans: PricePlan[];
}