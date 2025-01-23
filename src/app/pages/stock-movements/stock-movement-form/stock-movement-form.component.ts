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
import { StockMovementService } from '@app/services/stock-movement.service';
import { StockMovement, LocationType } from '@app/models';
import { BaseForm } from '@app/shared/base-data-table/base-form';
import { DataForm } from '@app/models/data-form.interface';
import { BaseService } from '@app/shared/base-data-table/base-service';

@Component({
  selector: 'app-stock-movement-form',
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
    { provide: BaseService, useClass: StockMovementService }
  ],
  template: `
    <h2 mat-dialog-title>{{isEditing ? 'Editar' : 'Nova'}} Movimentação</h2>

    <mat-dialog-content>
      <form [formGroup]="form" class="movement-form">
        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Item</mat-label>
            <mat-select formControlName="stockItemId">
              <mat-option value="1">Soja em Grão</mat-option>
              <mat-option value="2">Milho em Grão</mat-option>
              <mat-option value="3">Fertilizante NPK</mat-option>
            </mat-select>
            <mat-error *ngIf="form.get('stockItemId')?.errors?.['required']">
              Item é obrigatório
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Tipo de Movimento</mat-label>
            <mat-select formControlName="movementType">
              <mat-option value="IN">Entrada</mat-option>
              <mat-option value="OUT">Saída</mat-option>
              <mat-option value="TRANSFER">Transferência</mat-option>
            </mat-select>
            <mat-error *ngIf="form.get('movementType')?.errors?.['required']">
              Tipo é obrigatório
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
            <mat-label>Unidade</mat-label>
            <mat-select formControlName="unit">
              <mat-option value="TON">Tonelada</mat-option>
              <mat-option value="KG">Quilograma</mat-option>
              <mat-option value="L">Litro</mat-option>
            </mat-select>
            <mat-error *ngIf="form.get('unit')?.errors?.['required']">
              Unidade é obrigatória
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Local de Origem</mat-label>
            <mat-select formControlName="sourceLocation">
              <mat-option *ngFor="let type of locationTypes" [value]="type">
                {{type}}
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Local de Destino</mat-label>
            <mat-select formControlName="destinationLocation">
              <mat-option *ngFor="let type of locationTypes" [value]="type">
                {{type}}
              </mat-option>
            </mat-select>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Data de Ocorrência</mat-label>
          <input matInput [matDatepicker]="picker" formControlName="occurrenceDate">
          <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
          <mat-datepicker #picker></mat-datepicker>
          <mat-error *ngIf="form.get('occurrenceDate')?.errors?.['required']">
            Data é obrigatória
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Observações</mat-label>
          <textarea matInput formControlName="observations" rows="3"></textarea>
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
    .movement-form {
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
export class StockMovementFormComponent extends BaseForm<StockMovement> implements DataForm<StockMovement> {
  locationTypes = Object.values(LocationType);

  constructor() {
    super();

    this.form = this.fb.group({
      stockItemId: [this.data?.stockItemId || '', Validators.required],
      quantity: [this.data?.quantity || '', Validators.required],
      unit: [this.data?.unit || '', Validators.required],
      movementType: [this.data?.movementType || '', Validators.required],
      sourceLocation: [this.data?.sourceLocation || null],
      destinationLocation: [this.data?.destinationLocation || null],
      occurrenceDate: [this.data?.occurrenceDate ? new Date(this.data.occurrenceDate) : '', Validators.required],
      observations: [this.data?.observations || ''],
      status: [this.data?.status || 'PENDING']
    });
  }


  override onSubmit() {
    super.onSubmit();
  }
}
