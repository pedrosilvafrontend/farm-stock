import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from '@app/components/data-grid/data-grid.component';
import { StockService } from '@app/services/stock.service';
import { Stock } from '@app/models';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StockFormComponent } from './stock-form/stock-form.component';
import { BaseDataTable } from '@app/shared/base-data-table/base-data-table';
import { ComponentType } from '@angular/cdk/portal';
import { DataForm } from '@app/models/data-form.interface';
import { Column } from '@app/models/data-table-page.interface';

@Component({
  selector: 'app-stocks',
  standalone: true,
  imports: [CommonModule, DataGridComponent, MatIconModule, MatButtonModule],
  templateUrl: 'stocks.component.html'
})
export class StocksComponent extends BaseDataTable<Stock> implements OnInit {
  protected override service: StockService = inject(StockService);

  public override columns: Column[] = [
    { field: 'name', header: 'Nome' },
    { field: 'type', header: 'Tipo' },
    { field: 'capacity', header: 'Capacidade' },
    { field: 'currentOccupation', header: 'Ocupação Atual' },
    { field: 'unit', header: 'Unidade' },
    { field: 'actions', header: 'Ações' }
  ];

  override ngOnInit() {
    super.ngOnInit();
  }

  override openNewDialog() {
    super.openNewDialog(StockFormComponent as ComponentType<DataForm<Stock>>);
  }

  override onEdit(stock: Stock) {
    super.onEdit(stock, StockFormComponent as ComponentType<DataForm<Stock>>);
  }

  override onDelete(stock: Stock) {
    super.onDelete(stock, `o estoque "${stock.name}"`);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
