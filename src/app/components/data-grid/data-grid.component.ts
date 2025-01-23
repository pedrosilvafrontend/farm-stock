import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-data-grid',
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule
  ],
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent {
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() sortable: boolean = true;
  @Input() filterable: boolean = true;
  @Input() pageable: boolean = true;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageIndex: number = 0;

  @Output() page = new EventEmitter<PageEvent>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<any>;

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];

  ngOnInit() {
    this.displayedColumns = this.columns.map(col => col.field);
    this.dataSource = new MatTableDataSource(this.data);
  }

  ngOnChanges() {
    if (this.dataSource) {
      this.dataSource.data = this.data;
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  onPageChange(event: any) {
    this.page.emit({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
      length: event.length
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
