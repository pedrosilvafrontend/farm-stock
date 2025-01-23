import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '@app/models';
import { StockMovement } from '@app/models';
import { BaseService } from '@app/shared/base-data-table/base-service';

@Injectable({
  providedIn: 'root'
})
export class StockMovementService extends BaseService<StockMovement> {
  constructor() {
    super('stockMovements');
  }
}
