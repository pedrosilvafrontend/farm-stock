import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BaseForm } from '@app/shared/base-data-table/base-form';
import { Farm } from '@app/models';
import { DataForm } from '@app/models/data-form.interface';
import { BaseService } from '@app/shared/base-data-table/base-service';
import { FarmService } from '@app/services/farm.service';

@Component({
  selector: 'app-farm-form',
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
    { provide: BaseService, useClass: FarmService }
  ],
  template: `
    <h2 mat-dialog-title>{{isEditing ? 'Editar' : 'Nova'}} Fazenda</h2>

    <mat-dialog-content>
      <form [formGroup]="form" class="farm-form">
        <mat-form-field appearance="outline">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="name" placeholder="Nome da fazenda">
          <mat-error *ngIf="form.get('name')?.errors?.['required']">
            Nome é obrigatório
          </mat-error>
        </mat-form-field>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Área Total (ha)</mat-label>
            <input matInput type="number" formControlName="totalArea">
            <mat-error *ngIf="form.get('totalArea')?.errors?.['required']">
              Área total é obrigatória
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Área Cultivável (ha)</mat-label>
            <input matInput type="number" formControlName="cultivableArea">
            <mat-error *ngIf="form.get('cultivableArea')?.errors?.['required']">
              Área cultivável é obrigatória
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-row">
          <mat-form-field appearance="outline">
            <mat-label>Cidade</mat-label>
            <input matInput formControlName="city">
            <mat-error *ngIf="form.get('city')?.errors?.['required']">
              Cidade é obrigatória
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Estado</mat-label>
            <mat-select formControlName="state">
              <mat-option value="AC">Acre</mat-option>
              <mat-option value="AL">Alagoas</mat-option>
              <mat-option value="AP">Amapá</mat-option>
              <mat-option value="AM">Amazonas</mat-option>
              <mat-option value="BA">Bahia</mat-option>
              <mat-option value="CE">Ceará</mat-option>
              <mat-option value="ES">Espírito Santo</mat-option>
              <mat-option value="GO">Goiás</mat-option>
              <mat-option value="MA">Maranhão</mat-option>
              <mat-option value="MT">Mato Grosso</mat-option>
              <mat-option value="MS">Mato Grosso do Sul</mat-option>
              <mat-option value="MG">Minas Gerais</mat-option>
              <mat-option value="PA">Pará</mat-option>
              <mat-option value="PB">Paraíba</mat-option>
              <mat-option value="PR">Paraná</mat-option>
              <mat-option value="PE">Pernambuco</mat-option>
              <mat-option value="PI">Piauí</mat-option>
              <mat-option value="RJ">Rio de Janeiro</mat-option>
              <mat-option value="RN">Rio Grande do Norte</mat-option>
              <mat-option value="RS">Rio Grande do Sul</mat-option>
              <mat-option value="RO">Rondônia</mat-option>
              <mat-option value="RR">Roraima</mat-option>
              <mat-option value="SC">Santa Catarina</mat-option>
              <mat-option value="SP">São Paulo</mat-option>
              <mat-option value="SE">Sergipe</mat-option>
              <mat-option value="TO">Tocantins</mat-option>
              <mat-option value="DF">Distrito Federal</mat-option>
            </mat-select>
            <mat-error *ngIf="form.get('state')?.errors?.['required']">
              Estado é obrigatório
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
    .farm-form {
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
export class FarmFormComponent extends BaseForm<Farm> implements DataForm<Farm> {

  constructor() {
    super();

    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      totalArea: [this.data?.totalArea || '', Validators.required],
      cultivableArea: [this.data?.cultivableArea || '', Validators.required],
      city: [this.data?.city || '', Validators.required],
      state: [this.data?.state || '', Validators.required]
    });
  }

  override onSubmit() {
    super.onSubmit();
  }
}
