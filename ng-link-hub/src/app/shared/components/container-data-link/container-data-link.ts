import { Component, inject, input, output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionPencilSharp, ionReorderFourOutline, ionTrashSharp } from '@ng-icons/ionicons';
import { CustomBtn } from '../custom-btn/custom-btn';
import { LinkDto } from '../../interfaces/link.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../modals/confirm-dialog/confirm-dialog';
import { AddEditDialog } from '../modals/add-edit-dialog/add-edit-dialog';

@Component({
  selector: 'app-container-data-link',
  imports: [NgIcon, MatSlideToggleModule, CustomBtn],
  templateUrl: './container-data-link.html',
  styleUrl: './container-data-link.scss',
  viewProviders: [provideIcons({ ionReorderFourOutline, ionPencilSharp, ionTrashSharp })],
})
export class ContainerDataLink {
  readonly dialog = inject(MatDialog);

  dataLink = input.required<LinkDto>();

  onUpdate = output<LinkDto>();

  onDeleteLinkId = output<number>();

  toogleActive(checked: boolean) {
    const updatedLik = { ...this.dataLink(), isactive: checked };
    this.onUpdate.emit(updatedLik);
  }

  openConfirmDialog(linkId: number) {
    console.log('open confirm dialog con id:', linkId);
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        title: 'Eliminar Link',
        message: '¿Estas seguro de eliminar este link?',
      },
      autoFocus: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('se elimino el link con id:', linkId);
        this.onDeleteLinkId.emit(linkId);
      } else {
        console.log('no se elimino el link con id:', linkId);
      }
    });
  }

  openEditDialog(link: LinkDto) {
    console.log('open edit dialog con link:', link);
    const dialogEditRef = this.dialog.open(AddEditDialog, {
      width: '500px',
      data: link,
      autoFocus: false,
    });
    dialogEditRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('se edito el link con id:', link.id);
        this.onUpdate.emit(result);
      } else {
        console.log('no se edito el link con id:', link.id);
      }
    });
  }
}
