import { Component, computed, inject, signal } from '@angular/core';
import { CustomBtn } from '../../../shared/components/custom-btn/custom-btn';
import { provideIcons } from '@ng-icons/core';
import { ionAddSharp } from '@ng-icons/ionicons';
import { ContainerDataLink } from '../../../shared/components/container-data-link/container-data-link';
import { LinkService } from '../../../core/services/linkservice/link.service';
import { CreateLinkRequestDto, LinkDto, PreviewDataDto, UpdateLinkRequestDto } from '../../../shared/interfaces/link.interface';
import { GenericResponseDto } from '../../../shared/interfaces/apiResponse.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddEditDialog } from '../../../shared/components/modals/add-edit-dialog/add-edit-dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  imports: [CustomBtn, ContainerDataLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  viewProviders: [provideIcons({ ionAddSharp })],
})
export class Dashboard {
  private _linkService = inject(LinkService);
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  //variable -> signal<TIPO>(EL VALOR INICIAL)
  //UPDATE Y SET
  loadingLinksSignal = signal<boolean>(false);
  errorLinksSignal = signal<string | null>(null);
  linksSignal = signal<LinkDto[]>([]);

  loadingPreviewSignal = signal<boolean>(false);
  errorPreviewSignal = signal<string | null>(null);
  previewDataSignal = signal<PreviewDataDto | null>(null);

  profileDataSignal = signal<Omit<PreviewDataDto, 'links'> | null>(null);

  dataLinks = computed(() => this.linksSignal());

  dataPreview = computed(() => {
    const profile = this.profileDataSignal();
    const currentLinks = this.linksSignal();

    if (!profile) return null;

    return {
      ...profile,
      // FILTRAR solo los activos para el preview visual
      links: currentLinks.filter((link) => link.isactive),
    };
  });

  //data:any = [1,2,3,4];
  ngOnInit(): void {
    console.log('INICIO DE SECCION DASHBOARD DESDE EL ADMIN');
    this.loadLinks();
    this.loadPreviewData();
  }

  loadLinks() {
    this.loadingLinksSignal.set(true);
    this.errorLinksSignal.set(null);
    this._linkService.getLinksByUsername().subscribe({
      next: (response: GenericResponseDto<LinkDto[]>) => {
        if (response.result) {
          console.log('Response de API', response);
          this.linksSignal.set(response.data);
          this.loadingLinksSignal.set(false);
        } else {
          this.errorLinksSignal.set('Error al obtener los links');
          this.loadingLinksSignal.set(false);
        }
      },
      error: (error) => {
        this.errorLinksSignal.set('Error al obtener los links, error: ' + error);
        this.loadingLinksSignal.set(false);
      },
    });
  }

  loadPreviewData() {
    this.loadingPreviewSignal.set(true);
    this.errorPreviewSignal.set(null);
    this._linkService.getPreviewDataByUsername().subscribe({
      next: (response: GenericResponseDto<PreviewDataDto>) => {
        if (response.result) {
          console.log('Response de API para preview', response);
          //this.previewDataSignal.set(response.data);
          this.profileDataSignal.set({
            pictureUrl: response.data.pictureUrl,
            username: response.data.username,
            description: response.data.description,
          });
          this.loadingPreviewSignal.set(false);
        } else {
          this.errorPreviewSignal.set('Error al obtener la informacion de preview');
          this.loadingPreviewSignal.set(false);
        }
      },
      error: (error) => {
        this.errorPreviewSignal.set('Error al obtener la informacion de preview, error: ' + error);
        this.loadingPreviewSignal.set(false);
      },
    });
  }

  openAddLink() {
    console.log('add link');
    const dialogRef = this.dialog.open(AddEditDialog, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('result luego de agregar en el formulario', result);
        const tmpLink = { ...result, id: Date.now() };
        this.linksSignal.update((links) => [...links, tmpLink]);
        const request:CreateLinkRequestDto = {
          title:result.title,
          url:result.url,
          isActive:result.isactive
        };
        this._linkService.createLink(request).subscribe({
          next: (response) => {
            if(response.result){
              this._snackBar.open('Se creo el link correctamente', 'Cerrar', {
                horizontalPosition: 'center',
                verticalPosition: 'top',
                duration: 3000,
              });
              this.loadLinks();
            }
          },
          error: (error) => {
            console.log('error al crear el link', error);
          },
        })
      }
    });
  }

  updateLinkInState(updateLink: LinkDto) {
    console.log('updateLinkInState desde el dashboard con id :', updateLink.id);
    this.linksSignal.update((links) =>
      // .map crea un nuevo array, y { ...updateLink } crea una nueva referencia del objeto
      links.map((link) => (link.id === updateLink.id ? { ...updateLink } : link)),
    );
    const updateRequest:UpdateLinkRequestDto = {
      title:updateLink.title,
      url:updateLink.url,
      isActive:updateLink.isactive
    };
    this._linkService.updateLinkByLinkId(updateLink.id,updateRequest).subscribe({
      next: (response) => {
        console.log('response al actualizar el link', response);
        this._snackBar.open('Se actualizo el link correctamente', 'Cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      },
      error: (error) => {
        console.log('error al actualizar el link', error);
        this._snackBar.open('Hubo un error al actualizar el link', 'Cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      },
    })
  }

  deleteLinkInState(linkId: number) {
    console.log('deleteLinkInState desde el dashboard con id :', linkId);
    this.linksSignal.update((links) => links.filter((link) => link.id !== linkId));
    this._linkService.deleteLinkById(linkId).subscribe({
      next: (response) => {
        //console.log('response al eliminar el link', response);
        this._snackBar.open('Se elimino el link correctamente', 'Cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      },
      error: (error) => {
        console.log('error al eliminar el link', error);
        this._snackBar.open('Hubo un error al eliminar el link', 'Cerrar', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
        });
      },
    });
  }
}
