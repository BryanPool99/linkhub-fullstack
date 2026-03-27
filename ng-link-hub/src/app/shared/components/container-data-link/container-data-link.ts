import { Component, inject, input, output } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ionPencilSharp, ionReorderFourOutline, ionTrashSharp } from '@ng-icons/ionicons';
import { CustomBtn } from '../custom-btn/custom-btn';
import { LinkDto } from '../../interfaces/link.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../modals/confirm-dialog/confirm-dialog';
import { AddAndEditLinkDialog } from '../modals/add-and-edit-link-dialog/add-and-edit-link-dialog';

@Component({
  selector: 'app-container-data-link',
  imports: [NgIcon, MatSlideToggleModule, CustomBtn],
  templateUrl: './container-data-link.html',
  styleUrl: './container-data-link.scss',
  viewProviders: [provideIcons({ ionReorderFourOutline, ionPencilSharp, ionTrashSharp })],
})
export class ContainerDataLink {
  private readonly dialog = inject(MatDialog);

  dataLink = input.required<LinkDto>();

  onUpdate = output<LinkDto>();

  onDeleteLinkId = output<number>();

  toogleActive(checked: boolean) {
    const updatedLik = { ...this.dataLink(), isactive: checked };
    this.onUpdate.emit(updatedLik);
  }

  openConfirmDialog(id: number) {
    console.log('abriendo confirm dialog', id);
    const dialogConfirmRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: { title: 'Eliminar link', message: 'Estas seguro de eliminar este elemento?'},
      autoFocus: false,
    });
    dialogConfirmRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Eliminar link con id', id);
        this.onDeleteLinkId.emit(id);
      }
    })
  }

  openEditDialog(linkDto: LinkDto) {
    console.log('abriendo edit dialog', linkDto);
    const dialogEditRef = this.dialog.open(AddAndEditLinkDialog, {
      width: '400px',
      data: linkDto ,
      autoFocus: false,
    });
    dialogEditRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Editar link con id', linkDto.id);
        console.log('result', result);
        this.onUpdate.emit(result);
      }
    })
  }
}
