export enum StockType {
  WAREHOUSE = 'WAREHOUSE',
  SILO = 'SILO',
  STORAGE = 'STORAGE',
  CONVEYOR = 'CONVEYOR',
  TRUCK = 'TRUCK',
  TRAILER = 'TRAILER',
  CONTAINER = 'CONTAINER',
  PALLET = 'PALLET',
  BOX = 'BOX',
  OTHER = 'OTHER',
}

export interface Stock {
  id: string;
  farmId: string;
  name: string;
  type: StockType;
  capacity: number;
  currentOccupation: number;
  unit: string;
}
