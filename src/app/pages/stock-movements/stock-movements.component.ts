import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from '@app/components/data-grid/data-grid.component';
import { StockMovementService } from '@app/services/stock-movement.service';
import { StockMovement } from '@app/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { MatNativeDateModule } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { StockMovementFormComponent } from './stock-movement-form/stock-movement-form.component';
import { BaseDataTable } from '@app/shared/base-data-table/base-data-table';
import { Column } from '@app/models/data-table-page.interface';
import { ComponentType } from '@angular/cdk/portal';
import { DataForm } from '@app/models/data-form.interface';

@Component({
  selector: 'app-stock-movements',
  standalone: true,
  imports: [CommonModule, DataGridComponent, MatIconModule, MatButtonModule, MatNativeDateModule],
  template: `
    <div class="page-header">
      <h2>Movimentações de Estoque</h2>
      <div class="page-actions">
        <button mat-raised-button color="primary" (click)="openNewDialog()">
          <mat-icon>add</mat-icon>
          Nova Movimentação
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
export class StockMovementsComponent extends BaseDataTable<StockMovement> implements OnInit, OnDestroy {
  protected override service: StockMovementService = inject(StockMovementService);

  public override columns: Column[] = [
    { field: 'stockItemId', header: 'Item' },
    { field: 'quantity', header: 'Quantidade' },
    { field: 'unit', header: 'Unidade' },
    { field: 'movementType', header: 'Tipo' },
    { field: 'status', header: 'Status' },
    { field: 'occurrenceDate', header: 'Data' },
    { field: 'actions', header: 'Ações' }
  ];

  override ngOnInit() {
    super.ngOnInit();
  }

  override openNewDialog() {
    super.openNewDialog(StockMovementFormComponent as ComponentType<DataForm<StockMovement>>);
  }

  override onEdit(movement: StockMovement) {
    super.onEdit(movement, StockMovementFormComponent as ComponentType<DataForm<StockMovement>>);
  }

  override onDelete(movement: StockMovement) {
    super.onDelete(movement, `a movimentação ${movement.stockItemId} do tipo ${movement.movementType}?`);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
