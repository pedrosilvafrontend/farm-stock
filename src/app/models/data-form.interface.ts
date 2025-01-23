import { FormGroup } from "@angular/forms";

export interface DataForm<T> {
  onSubmit(): void;
  form: FormGroup;
  isEditing: boolean;
  data?: T;
}
