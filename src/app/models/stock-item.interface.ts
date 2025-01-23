export enum StockItemCategory {
  GRAIN = 'GRAIN',
  SEED = 'SEED',
  FERTILIZER = 'FERTILIZER',
  PESTICIDE = 'PESTICIDE',
  FUEL = 'FUEL',
  EQUIPMENT = 'EQUIPMENT',
  OTHER = 'OTHER'
}

export interface StockItem {
  id: string;
  stockId: string;
  name: string;
  category: StockItemCategory;
  quantity: number;
  unit: string;
  batchNumber: string;
  expirationDate: string;
}
