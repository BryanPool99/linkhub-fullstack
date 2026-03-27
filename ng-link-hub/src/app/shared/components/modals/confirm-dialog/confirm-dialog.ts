import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {
  // Inyectamos los datos y la referencia del diálogo
  readonly dialogRef = inject(MatDialogRef<ConfirmDialog>);
  readonly data = inject(MAT_DIALOG_DATA);
}
