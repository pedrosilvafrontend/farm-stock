import { Injectable } from '@angular/core';

import { StockItem } from '@app/models';
import { BaseService } from '@app/shared/base-data-table/base-service';

@Injectable({
  providedIn: 'root'
})
export class StockItemService extends BaseService<StockItem> {
  constructor() {
    super('stockItems');
  }
}
