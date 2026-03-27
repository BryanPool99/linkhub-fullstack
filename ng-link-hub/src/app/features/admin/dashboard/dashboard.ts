import { Component, computed, inject, signal } from '@angular/core';
import { CustomBtn } from '../../../shared/components/custom-btn/custom-btn';
import { provideIcons } from '@ng-icons/core';
import { ionAddSharp } from '@ng-icons/ionicons';
import { ContainerDataLink } from '../../../shared/components/container-data-link/container-data-link';
import { LinkService } from '../../../core/services/linkservice/link.service';
import { LinkDto, PreviewDataDto } from '../../../shared/interfaces/link.interface';
import { GenericResponseDto } from '../../../shared/interfaces/apiResponse.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddAndEditLinkDialog } from '../../../shared/components/modals/add-and-edit-link-dialog/add-and-edit-link-dialog';

@Component({
  selector: 'app-dashboard',
  imports: [CustomBtn, ContainerDataLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  viewProviders: [provideIcons({ ionAddSharp })],
})
export class Dashboard {
  private _linkService = inject(LinkService);
  private _dialog = inject(MatDialog);
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

  updateLinkInState(updateLink: LinkDto) {
    console.log('update link', updateLink);
    this.linksSignal.update((links) =>
      // .map crea un nuevo array, y { ...updateLink } crea una nueva referencia del objeto
      links.map((link) => (link.id === updateLink.id ? { ...updateLink } : link)),
    );
  }

  deleteLinkInState(id: number) {
    console.log('Delete link in state con id:', id);
    this.linksSignal.update((links) => links.filter((link) => link.id !== id));
  }

  openAddDialog() {
    console.log('abriendo add dialog');
    const dialogAddRef = this._dialog.open(AddAndEditLinkDialog, {
      width: '400px',
      autoFocus: false,
    });
    dialogAddRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Agregar link con result', result);
        //se hace asi para que no salga error
        // Creamos un ID temporal basado en el timestamp para que sea único
        const tempLink = { ...result, id: Date.now() };
        this.linksSignal.update((links) => [...links, tempLink]);
      }
    });
  }
}
