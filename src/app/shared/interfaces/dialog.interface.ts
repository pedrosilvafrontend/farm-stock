import { ComponentType } from "@angular/cdk/portal";
import { Observable } from "rxjs";

export interface DialogService {
  open<T>(component: ComponentType<T>, config?: any): DialogRef<T>;
  confirm(message: string, config?: any): Observable<boolean>;
}

export interface DialogRef<T> {
  afterClosed(): Observable<T>;
}
