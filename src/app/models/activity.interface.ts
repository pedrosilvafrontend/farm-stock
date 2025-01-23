export enum ActivityType {
  SEEDING = 'SEEDING',
  FERTILIZING = 'FERTILIZING',
  SPRAYING = 'SPRAYING',
  HARVESTING = 'HARVESTING'
}

export enum ActivityStatus {
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface Activity {
  id: number;
  cropId: number;
  type: ActivityType;
  status: ActivityStatus;
  startDate: string;
  endDate: string | null;
  description: string;
  notes: string;
}
