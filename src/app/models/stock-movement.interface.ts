export enum LocationType {
  STOCK = 'stockLocation',
  FIELD = 'fieldLocation',
  EXTERNAL = 'externalLocation',
  SUPPLIER = 'supplierLocation',
  CLIENT = 'clientLocation',
  PRODUCTION = 'productionLocation',
  LOSS = 'lossLocation'
}

export interface StockLocation {
  type: LocationType;
  id: string;
}

export interface StockMovement {
  id: string;
  stockItemId: string;
  quantity: number;
  unit: string;
  occurrenceDate: string;
  observations?: string;
  sourceLocation: StockLocation;
  destinationLocation: StockLocation;
  createdAt: string;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  movementType: 'IN' | 'OUT' | 'TRANSFER';
}

export function createLocationKey(type: LocationType, id: string): string {
  return `${type}::${id}`;
}

export function parseLocationKey(key: string): StockLocation {
  const [type, id] = key.split('::');
  return {
    type: type as LocationType,
    id
  };
}
