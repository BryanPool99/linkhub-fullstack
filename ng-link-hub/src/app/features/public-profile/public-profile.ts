import { Component, inject, input, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIcon, provideIcons } from "@ng-icons/core";
import { ionLogoAngular } from '@ng-icons/ionicons';
import { PublicService } from '../../core/services/public/public.service';
import { GenericResponseDto } from '../../shared/interfaces/apiResponse.interface';
import { PublicProfileDto } from './../../shared/interfaces/public.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as ionIcons from '@ng-icons/ionicons';
@Component({
  selector: 'app-public-profile',
  imports: [NgIcon,MatProgressSpinnerModule],
  templateUrl: './public-profile.html',
  styleUrl: './public-profile.scss',
  providers: [provideIcons(ionIcons)]
})
export class PublicProfile {
  //usando signals con ayuda del app config para obtener los parametros de entrada de la URL
  username = input.required<string>();
  loading = signal(true);
  dataPublicProfile!: PublicProfileDto;
  //route = inject(ActivatedRoute);
  //username: string | null = null;

  _publicService = inject(PublicService);

  ngOnInit(): void {
    console.log('INICIO DEL COMPONENTE PUBLIC-PROFILE');
    console.log(this.username());
    //this.username = this.route.snapshot.paramMap.get('username');
    //console.log(this.username);
    /*
    this.route.paramMap.subscribe((params) => {
      this.username = params.get('username');
      console.log(this.username);
    });
    */

    this._publicService.getProfilePublicByUsername(this.username()).subscribe({
      next: (response: GenericResponseDto<PublicProfileDto>) => {
        if(response.result){
          this.dataPublicProfile = response.data;
          this.loading.set(false);
        }
      },
      error: (error) => console.log(error)
    })
  }
}
