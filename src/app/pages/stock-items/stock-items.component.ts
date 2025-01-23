import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from '@app/components/data-grid/data-grid.component';
import { StockItemService } from '@app/services/stock-item.service';
import { StockItem } from '@app/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StockItemFormComponent } from './stock-item-form/stock-item-form.component';
import { BaseDataTable } from '@app/shared/base-data-table/base-data-table';
import { Column } from '@app/models/data-table-page.interface';
import { ComponentType } from '@angular/cdk/portal';
import { DataForm } from '@app/models/data-form.interface';

@Component({
  selector: 'app-stock-items',
  standalone: true,
  imports: [CommonModule, DataGridComponent, MatIconModule, MatButtonModule],
  template: `
    <div class="page-header">
      <h2>Itens de Estoque</h2>
      <div class="page-actions">
        <button mat-raised-button color="primary" (click)="openNewDialog()">
          <mat-icon>add</mat-icon>
          Novo Item
        </button>
      </div>
    </div>

    <app-data-grid
      [data]="data"
      [columns]="columns"
      [totalItems]="totalItems"
      [pageSize]="pageSize"
      [pageIndex]="pageIndex"
      [sortable]="true"
      [filterable]="true"
      [pageable]="true"
      (page)="onPageChange($event)"
      (edit)="onEdit($event)"
      (delete)="onDelete($event)">
    </app-data-grid>
  `
})
export class StockItemsComponent extends BaseDataTable<StockItem> implements OnInit, OnDestroy {
  protected override service: StockItemService = inject(StockItemService);

  public override columns: Column[] = [
    { field: 'name', header: 'Nome' },
    { field: 'category', header: 'Categoria' },
    { field: 'quantity', header: 'Quantidade' },
    { field: 'unit', header: 'Unidade' },
    { field: 'batchNumber', header: 'Lote' },
    { field: 'expirationDate', header: 'Validade' },
    { field: 'actions', header: 'Ações' }
  ];

  override ngOnInit() {
    super.ngOnInit();
  }

  override openNewDialog() {
    super.openNewDialog(StockItemFormComponent as ComponentType<DataForm<StockItem>>);
  }

  override onEdit(stockItem: StockItem) {
    super.onEdit(stockItem, StockItemFormComponent as ComponentType<DataForm<StockItem>>);
  }

  override onDelete(stockItem: StockItem) {
    super.onDelete(stockItem, `o item "${stockItem.name}"`);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

}
