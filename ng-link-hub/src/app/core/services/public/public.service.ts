import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericResponseDto } from '../../../shared/interfaces/apiResponse.interface';
import { PublicProfileDto } from '../../../shared/interfaces/public.interface';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  private apiUrlPublicBase = 'http://localhost:8080/public';
  //INJECTANDO EL CLIENTE HTTP
  _httpClient = inject(HttpClient);

  getProfilePublicByUsername(username: string): Observable<GenericResponseDto<PublicProfileDto>> {
    return this._httpClient.get<GenericResponseDto<PublicProfileDto>>(
      `${this.apiUrlPublicBase}/profile/${username}`,
    );
  }
}
