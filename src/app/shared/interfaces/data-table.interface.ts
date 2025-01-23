import { PageEvent } from "@angular/material/paginator";
import { Column } from "@app/models/data-table-page.interface";

export interface DataTableData<T> {
  data: T[];
  columns: Column[];
  totalItems: number;
  pageSize: number;
  pageIndex: number;
}

export interface DataTablePagination {
  onPageChange(event: PageEvent): void;
}

export interface DataTableActions<T> {
  onEdit(item: T): void;
  onDelete(item: T): void;
  onAdd(): void;
}
