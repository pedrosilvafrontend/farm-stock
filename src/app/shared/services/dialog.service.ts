import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';
import { DialogService } from '../interfaces/dialog.interface';

@Injectable({
  providedIn: 'root'
})
export class MaterialDialogService implements DialogService {
  constructor(private dialog: MatDialog) {}

  open<T>(component: ComponentType<T>, config?: any): MatDialogRef<T> {
    return this.dialog.open(component, config);
  }

  confirm(message: string, config?: any): Observable<boolean> {
    return this.dialog.open(ConfirmDialogComponent, {
      data: { message, ...config }
    }).afterClosed();
  }
}
