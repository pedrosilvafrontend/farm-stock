import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StockItem, StockItemCategory } from '@app/models';
import { BaseForm } from '@app/shared/base-data-table/base-form';
import { DataForm } from '@app/models/data-form.interface';
import { BaseService } from '@app/shared/base-data-table/base-service';
import { StockItemService } from '@app/services/stock-item.service';

@Component({
  selector: 'app-stock-item-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    { provide: BaseService, useClass: StockItemService }
  ],
  template: `
    <h2 mat-dialog-title>{{isEditing ? 'Editar' : 'Novo'}} Item de Estoque</h2>

    <mat-dialog-content>
      <form [formGroup]="form" class="stock-item-form">
        <mat-form-field appearance="outline">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="name" placeholder="Nome do item">
          <mat-error *ngIf="form.get('name')?.errors?.['required']">
            Nome é obrigatório
          </mat-error>
        </mat-form-field>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Categoria</mat-label>
            <mat-select formControlName="category">
              <mat-option *ngFor="let category of categories" [value]="category">
                {{category}}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="form.get('category')?.errors?.['required']">
              Categoria é obrigatória
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Unidade</mat-label>
            <mat-select formControlName="unit">
              <mat-option value="TON">Tonelada</mat-option>
              <mat-option value="KG">Quilograma</mat-option>
              <mat-option value="L">Litro</mat-option>
              <mat-option value="M3">Metro Cúbico</mat-option>
            </mat-select>
            <mat-error *ngIf="form.get('unit')?.errors?.['required']">
              Unidade é obrigatória
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Quantidade</mat-label>
            <input matInput type="number" formControlName="quantity">
            <mat-error *ngIf="form.get('quantity')?.errors?.['required']">
              Quantidade é obrigatória
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Lote</mat-label>
            <input matInput formControlName="batchNumber">
            <mat-error *ngIf="form.get('batchNumber')?.errors?.['required']">
              Lote é obrigatório
            </mat-error>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Data de Validade</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="expirationDate">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="form.get('expirationDate')?.errors?.['required']">
            Data de validade é obrigatória
          </mat-error>
        </mat-form-field>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button color="primary" (click)="onSubmit()" [disabled]="form.invalid">
        Salvar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .stock-item-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
      min-width: 500px;
      padding: 20px 0;
    }

    .form-row {
      display: flex;
      gap: 20px;

      mat-form-field {
        flex: 1;
      }
    }
  `]
})
export class StockItemFormComponent extends BaseForm<StockItem> implements DataForm<StockItem> {
  categories = Object.values(StockItemCategory);

  constructor() {
    super();

    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      category: [this.data?.category || '', Validators.required],
      quantity: [this.data?.quantity || '', Validators.required],
      unit: [this.data?.unit || '', Validators.required],
      batchNumber: [this.data?.batchNumber || '', Validators.required],
      expirationDate: [this.data?.expirationDate ? new Date(this.data.expirationDate) : '', Validators.required],
      stockId: [this.data?.stockId || '1'] // TODO: Implementar seleção de estoque
    });
  }

  override onSubmit() {
    super.onSubmit();
  }

}
