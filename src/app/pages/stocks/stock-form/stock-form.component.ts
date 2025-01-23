import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { StockService } from '@app/services/stock.service';
import { Stock, StockType } from '@app/models';
import { BaseForm } from '@app/shared/base-data-table/base-form';
import { BaseService } from '@app/shared/base-data-table/base-service';
import { DataForm } from '@app/models/data-form.interface';

@Component({
  selector: 'app-stock-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [
    { provide: BaseService, useClass: StockService }
  ],
  template: `
    <h2 mat-dialog-title>{{isEditing ? 'Editar' : 'Novo'}} Estoque</h2>

    <mat-dialog-content>
      <form [formGroup]="form" class="stock-form">
        <mat-form-field appearance="outline">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="name" placeholder="Nome do estoque">
          <mat-error *ngIf="form.get('name')?.errors?.['required']">
            Nome é obrigatório
          </mat-error>
        </mat-form-field>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Tipo</mat-label>
            <mat-select formControlName="type">
              <mat-option *ngFor="let type of stockTypes" [value]="type">
                {{type}}
              </mat-option>
            </mat-select>
            <mat-error *ngIf="form.get('type')?.errors?.['required']">
              Tipo é obrigatório
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
            <mat-label>Capacidade</mat-label>
            <input matInput type="number" formControlName="capacity">
            <mat-error *ngIf="form.get('capacity')?.errors?.['required']">
              Capacidade é obrigatória
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Ocupação Atual</mat-label>
            <input matInput type="number" formControlName="currentOccupation">
            <mat-error *ngIf="form.get('currentOccupation')?.errors?.['required']">
              Ocupação atual é obrigatória
            </mat-error>
          </mat-form-field>
        </div>
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
    .stock-form {
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
export class StockFormComponent extends BaseForm<Stock> implements DataForm<Stock> {
  stockTypes = Object.values(StockType);

  constructor() {
    super();

    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      type: [this.data?.type || '', Validators.required],
      capacity: [this.data?.capacity || '', Validators.required],
      currentOccupation: [this.data?.currentOccupation || '', Validators.required],
      unit: [this.data?.unit || '', Validators.required],
      farmId: [this.data?.farmId || '1'] // TODO: Implementar seleção de fazenda
    });
  }

  override onSubmit() {
    super.onSubmit();
  }
}
