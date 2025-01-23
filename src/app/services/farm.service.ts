import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '@app/models';
import { BaseService } from '@app/shared/base-data-table/base-service';

export interface Farm {
  id: number;
  name: string;
  totalArea: number;
  cultivableArea: number;
  city: string;
  state: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class FarmService extends BaseService<Farm> {
  constructor() {
    super('farms');
  }

  override getData(page: number, perPage: number): Observable<PaginatedResponse<Farm>> {
    return super.getData(page, perPage);
  }

  override createItem(item: Partial<Farm>): Observable<Farm> {
    return super.createItem(item);
  }

  override updateItem(id: number, item: Partial<Farm>): Observable<Farm> {
    return super.updateItem(id, item);
  }

  override deleteItem(id: number): Observable<void> {
    return super.deleteItem(id);
  }
}
