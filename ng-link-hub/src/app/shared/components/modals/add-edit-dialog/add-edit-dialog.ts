import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LinkDto } from '../../../interfaces/link.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ContainerCustomInput } from '../../container-custom-input/container-custom-input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-add-edit-dialog',
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule, ContainerCustomInput,MatSlideToggleModule],
  templateUrl: './add-edit-dialog.html',
  styleUrl: './add-edit-dialog.scss',
})
export class AddEditDialog {
  private _dialogRef = inject(MatDialogRef<AddEditDialog>);

  private _fb = inject(FormBuilder);

  data = inject<LinkDto>(MAT_DIALOG_DATA);

  linkForm = this._fb.group({
    id: [null as number | null],
    title: ['', [Validators.required, Validators.minLength(3)]],
    url: ['', [Validators.required, Validators.pattern('https?://.+')]],
    isactive: [false],
  });

  ngOnInit(): void {
    if(this.data){
      console.log("ESTAS EN MODO EDICION");
      console.log(this.data);
      this.linkForm.patchValue(this.data);
    }else{
      console.log("ESTAS EN MODO CREACION")
    }
  }

  getErrorMessage(field: string) {
    let message = '';
    if (this.linkForm.get(field)?.hasError('required')) {
      message = 'El campo es requerido';
    } else if (this.linkForm.get(field)?.hasError('minlength')) {
      message = 'El campo debe tener al menos 3 caracteres';
    } else if (this.linkForm.get(field)?.hasError('pattern')) {
      message = 'El campo debe ser una url válida';
    }
    return message;
  }

  onCancel() {
    console.log('onCancel');
    this._dialogRef.close(null);
  }

  onSave() {
    console.log('onSave', this.linkForm.value);
    if(this.linkForm.valid){
      this._dialogRef.close(this.linkForm.value);
    }
  }
}
