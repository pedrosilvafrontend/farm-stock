import { inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BaseService } from "./base-service";
import { DataForm } from "@app/models/data-form.interface";

export class BaseForm<T> implements DataForm<T> {
  public form!: FormGroup;
  public isEditing: boolean = false;
  public data: T | undefined = inject(MAT_DIALOG_DATA);
  protected service: BaseService<T> = inject( BaseService<T>);
  protected dialogRef: MatDialogRef<BaseForm<T>> = inject(MatDialogRef<BaseForm<T>>);
  protected fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.isEditing = !!this.data;
    // this.form = this.fb.group({
    //   name: [this.data?.name || '', Validators.required],
    //   totalArea: [this.data?.totalArea || '', Validators.required],
    //   cultivableArea: [this.data?.cultivableArea || '', Validators.required],
    //   city: [this.data?.city || '', Validators.required],
    //   state: [this.data?.state || '', Validators.required],
    //   status: [this.data?.status || 'active']
    // });
  }

  onSubmit() {
    if (this.form.valid) {
      const operation = this.isEditing
        ? this.service.updateItem((this.data as any)?.id, this.form.value)
        : this.service.createItem(this.form.value);

      operation.subscribe({
        next: (item) => {
          this.dialogRef.close(item);
        },
        error: (error) => {
          console.error('Erro ao salvar', error);
        }
      });
    }
  }
}
