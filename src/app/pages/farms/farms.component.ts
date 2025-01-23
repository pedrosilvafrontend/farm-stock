import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from '../../components/data-grid/data-grid.component';
import { FarmService, Farm } from '../../services/farm.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FarmFormComponent } from './farm-form/farm-form.component';
import { PageEvent } from '@angular/material/paginator';
import { Column } from '@app/models/data-table-page.interface';
import { BaseDataTable } from '@app/shared/base-data-table/base-data-table';
import { ComponentType } from '@angular/cdk/portal';
import { DataForm } from '@app/models/data-form.interface';

@Component({
  selector: 'app-farms',
  templateUrl: 'farms.component.html',
  styleUrls: ['farms.component.scss'],
  imports: [CommonModule, DataGridComponent, MatIconModule, MatButtonModule]
})
export class FarmsComponent extends BaseDataTable<Farm> implements OnInit, OnDestroy {
  protected override service: FarmService = inject(FarmService);

  public override columns: Column[] = [
    { field: 'name', header: 'Nome' },
    { field: 'totalArea', header: 'Área Total (ha)' },
    { field: 'cultivableArea', header: 'Área Cultivável (ha)' },
    { field: 'city', header: 'Cidade' },
    { field: 'state', header: 'Estado' },
    { field: 'actions', header: 'Ações' }
  ];

  override ngOnInit() {
    super.ngOnInit();
  }

  override loadData() {
    super.loadData();
  }

  override onPageChange(event: PageEvent) {
    super.onPageChange(event);
  }

  override openNewDialog() {
    super.openNewDialog(FarmFormComponent as ComponentType<DataForm<Farm>>);
  }

  override onEdit(farm: Farm) {
    super.onEdit(farm, FarmFormComponent as ComponentType<DataForm<Farm>>);
  }

  override onDelete(farm: Farm) {
    super.onDelete(farm, `a fazenda "${farm.name}"`);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }
}
