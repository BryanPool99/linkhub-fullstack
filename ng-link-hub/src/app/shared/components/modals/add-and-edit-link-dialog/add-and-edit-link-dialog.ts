import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogActions,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContainerCustomInput } from '../../container-custom-input/container-custom-input';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { LinkDto } from '../../../interfaces/link.interface';
@Component({
  selector: 'app-add-and-edit-link-dialog',
  imports: [
    MatDialogContent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ContainerCustomInput,
    MatSlideToggle,
    MatDialogActions,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-and-edit-link-dialog.html',
  styleUrl: './add-and-edit-link-dialog.scss',
})
export class AddAndEditLinkDialog {
  private _fb = inject(FormBuilder);
  private _dialogRef = inject(MatDialogRef<AddAndEditLinkDialog>);
  // Recibimos la data (si es null es "Crear", si tiene objeto es "Editar")
  public data = inject<LinkDto>(MAT_DIALOG_DATA);

  linkForm = this._fb.group({
    id: [null as number | null],
    title: ['', [Validators.required, Validators.minLength(3)]],
    url: ['', [Validators.required, Validators.pattern('https?://.+')]],
    isactive: [true],
  });

  ngOnInit() {
    if (this.data) {
      // Si hay data, llenamos el formulario automáticamente
      console.log('data', this.data);
      this.linkForm.patchValue(this.data);
    }
  }

  onSave() {
    if (this.linkForm.valid) {
      // Devolvemos el valor del form al cerrar
      this._dialogRef.close(this.linkForm.value);
    }
  }

  onCancel() {
    this._dialogRef.close(null);
  }

  getErrorMessage(controlName: string): string {
    const control = this.linkForm.get(controlName);
    if (control?.hasError('required')) return 'Este campo es obligatorio';
    if (control?.hasError('pattern')) return 'Formato de URL inválido';
    return '';
  }
}
