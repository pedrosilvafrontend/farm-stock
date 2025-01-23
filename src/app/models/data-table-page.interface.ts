import { ComponentType } from '@angular/cdk/portal';
import { PageEvent } from '@angular/material/paginator';
import { DataForm } from '@app/models/data-form.interface';

export interface Column {
  field: string;
  header: string;
}

export interface DataTablePage<T> {
  data: T[];
  columns: Column[];
  totalItems: number;
  pageSize: number;
  pageIndex: number;

  loadData(): void;
  onPageChange(event: PageEvent): void;
  onEdit(item: T, formComponent: ComponentType<DataForm<T>>): void;
  onDelete(item: T, sufixMsg: string): void;
  openNewDialog(formComponent: ComponentType<DataForm<T>>): void;
}
