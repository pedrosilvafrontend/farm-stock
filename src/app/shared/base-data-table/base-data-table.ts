import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Column, DataTablePage } from '@app/models/data-table-page.interface';
import { BaseService } from './base-service';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { DataForm } from '@app/models/data-form.interface';
import { MaterialDialogService } from '@app/shared/services/dialog.service';
import { Observable } from 'rxjs';

@Component({ template: '' })
export abstract class BaseDataTable<T> implements OnInit, OnDestroy, DataTablePage<T> {

  protected service!: BaseService<T>;
  protected dialog: MatDialog = inject(MatDialog);
  protected sub: Subscription = new Subscription();
  protected dialogService: MaterialDialogService = inject(MaterialDialogService);

  public data: T[] = [];
  public columns: Column[] = [];
  public totalItems: number = 0;
  public pageSize: number = 10;
  public pageIndex: number = 0;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.service.getData(this.pageIndex + 1, this.pageSize).subscribe({
      next: (response) => {
        this.data = response.data;
        this.totalItems = response.items;
      },
      error: (error) => {
        console.error('Erro ao carregar dados:', error);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  openNewDialog(formComponent: ComponentType<DataForm<T>>) {
    const dialogRef = this.dialog.open(formComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

  onEdit(item: T, formComponent: ComponentType<DataForm<T>>) {
    const dialogRef = this.dialog.open(formComponent, {
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

  onDelete(item: T, sufixMsg?: string) {
    const { id, name } = item as any;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirmar Exclusão',
        message: `Deseja realmente excluir ${sufixMsg || name || ''}?`,
        confirmText: 'Excluir',
        confirmColor: 'warn',
        cancelText: 'Cancelar'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.service.deleteItem(id).subscribe({
          next: () => {
            this.loadData();
          },
          error: (error) => {
            console.error(`Erro ao excluir ${sufixMsg}:`, error);
          }
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  protected openDialog<R>(component: ComponentType<R>, config?: any): Observable<R> {
    return this.dialogService.open(component, config).afterClosed();
  }

  protected confirmDelete(message: string): Observable<boolean> {
    return this.dialogService.confirm(message);
  }

}
