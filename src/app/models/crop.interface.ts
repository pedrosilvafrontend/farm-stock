export enum CropType {
  BEAN = 'BEAN',
  CORN = 'CORN',
  WHEAT = 'WHEAT',
  RICE = 'RICE',
  BARLEY = 'BARLEY',
  OATS = 'OATS',
  SUNFLOWER = 'SUNFLOWER'
}

export enum CropStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Crop {
  id: number;
  fieldId: number;
  name: string;
  type: CropType;
  status: CropStatus;
  startDate: string;
  endDate: string | null;
  estimatedProduction: number;
  actualProduction: number | null;
}
