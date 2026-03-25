import { Component, computed, inject, signal } from '@angular/core';
import { CustomBtn } from '../../../shared/components/custom-btn/custom-btn';
import { provideIcons } from '@ng-icons/core';
import { ionAddSharp } from '@ng-icons/ionicons';
import { ContainerDataLink } from '../../../shared/components/container-data-link/container-data-link';
import { LinkService } from '../../../core/services/linkservice/link.service';
import { LinkDto } from '../../../shared/interfaces/link.interface';
import { GenericResponseDto } from '../../../shared/interfaces/apiResponse.interface';

@Component({
  selector: 'app-dashboard',
  imports: [CustomBtn, ContainerDataLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  viewProviders: [provideIcons({ ionAddSharp })],
})
export class Dashboard {
  private _linkService = inject(LinkService);
  //variable -> signal<TIPO>(EL VALOR INICIAL)
  //UPDATE Y SET
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  linksSignal = signal<LinkDto[]>([]);

  dataLinks = computed(() => this.linksSignal());

  //data:any = [1,2,3,4];
  ngOnInit(): void {
    console.log('INICIO DE SECCION DASHBOARD DESDE EL ADMIN');
    this.loadLinks();
  }

  loadLinks() {
    this.loading.set(true);
    this.error.set(null);
    this._linkService.getLinksByUsername().subscribe({
      next: (response: GenericResponseDto<LinkDto[]>) => {
        if(response.result){
          console.log("Response de API", response);
          this.linksSignal.set(response.data);
          this.loading.set(false);
        }else{
          this.error.set('Error al obtener los links');
          this.loading.set(false);
        }
      },
      error: (error) => {
        this.error.set('Error al obtener los links, error: ' + error);
        this.loading.set(false);
      },
    });
  }

  addLink() {
    console.log('add link');
    alert('add link');
  }
}
